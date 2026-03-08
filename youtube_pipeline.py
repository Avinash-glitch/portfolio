import argparse
import base64
import json
import time
import re
import subprocess
import sys
from urllib.parse import quote_plus
from pathlib import Path

import feedparser
import requests

try:
    # MoviePy v1 style
    from moviepy.editor import AudioFileClip, ImageClip, concatenate_videoclips
except ModuleNotFoundError:
    # MoviePy v2 style
    from moviepy import AudioFileClip, ImageClip, concatenate_videoclips


DEFAULT_TOPIC = "Iphone 17 vs Samsung galaxy s26"
DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
DEFAULT_SD_URL = "http://127.0.0.1:7860/sdapi/v1/txt2img"


def get_research(topic: str, max_articles: int = 5) -> str:
    query = topic.replace(" ", "+")
    url = f"https://news.google.com/rss/search?q={query}"
    feed = feedparser.parse(url)

    if getattr(feed, "bozo", False):
        raise RuntimeError(f"RSS parse failed: {getattr(feed, 'bozo_exception', 'unknown error')}")

    entries = feed.entries[:max_articles]
    if not entries:
        raise RuntimeError("No RSS entries found for topic.")

    article_lines = []
    for entry in entries:
        title = getattr(entry, "title", "").strip()
        summary = getattr(entry, "summary", "").strip()
        article_lines.append(f"{title} {summary}".strip())
    return "\n".join(article_lines)


def post_json(url: str, payload: dict, timeout: int = 120) -> dict:
    response = requests.post(url, json=payload, timeout=timeout)
    response.raise_for_status()
    return response.json()


def extract_first_json_object(text: str) -> dict | None:
    text = text.strip()
    if not text:
        return None
    fenced = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, flags=re.DOTALL)
    candidate = fenced.group(1) if fenced else text

    # Try balanced-brace scanning so we can parse JSON even with prefixed/suffixed text.
    starts = [i for i, ch in enumerate(candidate) if ch == "{"]
    for start in starts:
        depth = 0
        in_string = False
        escaped = False
        for idx in range(start, len(candidate)):
            ch = candidate[idx]
            if in_string:
                if escaped:
                    escaped = False
                elif ch == "\\":
                    escaped = True
                elif ch == '"':
                    in_string = False
                continue
            if ch == '"':
                in_string = True
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    raw = candidate[start : idx + 1]
                    try:
                        parsed = json.loads(raw)
                        if isinstance(parsed, dict):
                            return parsed
                    except json.JSONDecodeError:
                        break
    return None


def generate_script_package(
    topic: str,
    research: str,
    ollama_url: str,
    model: str,
    seconds: int,
) -> tuple[str, list[str]]:
    target_words = max(15, int(seconds * 2.5))
    prompt = f"""
Create a {seconds}-second YouTube short.
Return ONLY valid JSON in this exact shape:
{{
  "spoken_text": "single narration paragraph",
  "scenes": [
    {{"description": "visual description for image 1"}},
    {{"description": "visual description for image 2"}}
  ]
}}

Rules:
- spoken_text must be natural voiceover text under {target_words} words.
- scenes should be 1 image every ~2 seconds.
- scenes[].description must describe what should be shown visually.
- no markdown, no extra keys, no explanation.

Topic:
{topic}

Use this research:
{research}

Structure:
1) Hook
2) Explanation
3) Interesting insight
4) Ending
""".strip()

    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
    }
    data = post_json(ollama_url, payload, timeout=180)
    raw = data.get("response", "").strip()
    if not raw:
        raise RuntimeError("Ollama returned an empty script.")

    parsed = extract_first_json_object(raw)
    if parsed:
        spoken_text = str(parsed.get("spoken_text", "")).strip()
        scenes = parsed.get("scenes", [])
        scene_descriptions = []
        if isinstance(scenes, list):
            for scene in scenes:
                if isinstance(scene, dict):
                    desc = str(scene.get("description", "")).strip()
                    if desc:
                        scene_descriptions.append(desc)

        if spoken_text:
            return spoken_text, scene_descriptions

    # Retry once with stricter formatting instructions if parsing failed.
    strict_prompt = (
        f"{prompt}\n\n"
        "IMPORTANT: Return JSON only. Start with '{' and end with '}'. No prose before or after."
    )
    strict_data = post_json(
        ollama_url,
        {"model": model, "prompt": strict_prompt, "stream": False},
        timeout=180,
    )
    strict_raw = strict_data.get("response", "").strip()
    parsed = extract_first_json_object(strict_raw)
    if parsed:
        spoken_text = str(parsed.get("spoken_text", "")).strip()
        scenes = parsed.get("scenes", [])
        scene_descriptions = []
        if isinstance(scenes, list):
            for scene in scenes:
                if isinstance(scene, dict):
                    desc = str(scene.get("description", "")).strip()
                    if desc:
                        scene_descriptions.append(desc)
        if spoken_text:
            return spoken_text, scene_descriptions

    # Final fallback for non-JSON model outputs.
    return strict_raw or raw, []


def generate_image_sdapi(prompt: str, sd_url: str, output_image: Path, width: int, height: int, steps: int) -> None:
    payload = {
        "prompt": prompt,
        "steps": steps,
        "width": width,
        "height": height,
    }
    data = post_json(sd_url, payload, timeout=300)
    images = data.get("images", [])
    if not images:
        raise RuntimeError("Stable Diffusion API returned no images.")
    output_image.write_bytes(base64.b64decode(images[0]))


def generate_image_pollinations(prompt: str, output_image: Path, width: int, height: int) -> None:
    trimmed = " ".join(prompt.split())[:220]
    encoded = quote_plus(trimmed)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width={width}&height={height}&nologo=true"

    last_err = None
    for attempt in range(1, 4):
        try:
            response = requests.get(url, timeout=180)
            response.raise_for_status()
            output_image.write_bytes(response.content)
            return
        except requests.RequestException as exc:
            last_err = exc
            if attempt < 3:
                time.sleep(2 * attempt)

    # Fallback image if provider is flaky.
    fallback = f"https://picsum.photos/seed/{quote_plus(trimmed)}/{width}/{height}"
    try:
        response = requests.get(fallback, timeout=60)
        response.raise_for_status()
        output_image.write_bytes(response.content)
        return
    except requests.RequestException:
        raise RuntimeError(f"Image generation failed (pollinations + fallback): {last_err}") from last_err


def generate_image(
    provider: str,
    prompt: str,
    sd_url: str,
    output_image: Path,
    width: int,
    height: int,
    steps: int,
) -> None:
    if provider == "sdapi":
        generate_image_sdapi(prompt, sd_url, output_image, width, height, steps)
        return
    if provider == "pollinations":
        generate_image_pollinations(prompt, output_image, width, height)
        return
    raise RuntimeError(f"Unknown image provider: {provider}")


def split_script_into_scene_texts(script: str, chunk_seconds: float) -> list[str]:
    # Approximate speech pace for chunking text into visual scenes.
    words_per_second = 2.5
    words_per_chunk = max(4, int(chunk_seconds * words_per_second))
    words = script.split()
    if not words:
        return ["abstract cinematic background"]

    chunks = []
    for i in range(0, len(words), words_per_chunk):
        part = " ".join(words[i : i + words_per_chunk]).strip()
        if part:
            chunks.append(part)
    return chunks


def to_scene_prompt(scene_text: str, style: str) -> str:
    cleaned = re.sub(r"[*_#`]", "", scene_text).strip()
    return f"{cleaned}, {style}".strip(", ")


def generate_voice(text: str, piper_bin: str, piper_model: str, output_voice: Path) -> None:
    command = [
        piper_bin,
        "--model",
        piper_model,
        "--output_file",
        str(output_voice),
    ]
    try:
        process = subprocess.Popen(command, stdin=subprocess.PIPE, text=True)
    except FileNotFoundError as exc:
        raise RuntimeError(
            f"Piper executable not found: {piper_bin}. Set --piper-bin to the full path of piper.exe."
        ) from exc
    _, stderr = process.communicate(text)
    if process.returncode != 0:
        raise RuntimeError(
            (
                f"Piper failed with code {process.returncode}. {stderr or ''}\n"
                "Check that --piper-model points to a valid .onnx model and its matching .onnx.json config file exists."
            ).strip()
        )


def set_clip_duration(image_clip: ImageClip, duration: float) -> ImageClip:
    if hasattr(image_clip, "with_duration"):
        return image_clip.with_duration(duration)
    return image_clip.set_duration(duration)


def set_clip_audio(image_clip: ImageClip, audio_clip: AudioFileClip) -> ImageClip:
    if hasattr(image_clip, "with_audio"):
        return image_clip.with_audio(audio_clip)
    return image_clip.set_audio(audio_clip)


def list_scene_images(scene_images_dir: Path) -> list[Path]:
    supported = {".png", ".jpg", ".jpeg", ".webp"}
    images = [p for p in sorted(scene_images_dir.iterdir()) if p.suffix.lower() in supported and p.is_file()]
    if not images:
        raise RuntimeError(f"No scene images found in {scene_images_dir}. Add .png/.jpg/.jpeg/.webp files.")
    return images


def create_video(image_files: list[Path], voice_file: Path, output_video: Path, fps: int = 24) -> None:
    audio_clip = AudioFileClip(str(voice_file))
    per_scene = audio_clip.duration / len(image_files)
    clips = []
    for image_file in image_files:
        clip = ImageClip(str(image_file))
        clips.append(set_clip_duration(clip, per_scene))

    if len(clips) == 1:
        video = clips[0]
    else:
        video = concatenate_videoclips(clips, method="compose")

    video = set_clip_audio(video, audio_clip)
    video.write_videofile(str(output_video), fps=fps, codec="libx264", audio_codec="aac")


def render_talking_head(
    talking_head_cmd: str,
    character_image: Path,
    voice_file: Path,
    output_video: Path,
) -> None:
    cmd = talking_head_cmd.format(
        image=str(character_image),
        audio=str(voice_file),
        output=str(output_video),
    )
    result = subprocess.run(cmd, shell=True, text=True, capture_output=True)
    if result.returncode != 0:
        raise RuntimeError(
            (
                f"Talking-head command failed with code {result.returncode}.\n"
                f"Command: {cmd}\n"
                f"STDOUT:\n{result.stdout}\n"
                f"STDERR:\n{result.stderr}"
            ).strip()
        )
    if not output_video.exists():
        raise RuntimeError(
            f"Talking-head command completed but output file was not created: {output_video}"
        )


def check_service(url: str, name: str) -> None:
    try:
        response = requests.get(url, timeout=5)
        if response.status_code >= 400:
            raise RuntimeError(f"{name} is reachable but returned {response.status_code} at {url}.")
    except requests.RequestException as exc:
        raise RuntimeError(f"{name} is not reachable at {url}: {exc}") from exc


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Free end-to-end YouTube automation test pipeline.")
    parser.add_argument("--topic", default=DEFAULT_TOPIC, help="Topic to research and script.")
    parser.add_argument("--ollama-url", default=DEFAULT_OLLAMA_URL, help="Ollama generate endpoint URL.")
    parser.add_argument("--model", default="llama3", help="Ollama model name.")
    parser.add_argument("--sd-url", default=DEFAULT_SD_URL, help="Automatic1111 txt2img endpoint URL.")
    parser.add_argument(
        "--image-provider",
        choices=["pollinations", "sdapi"],
        default="pollinations",
        help="Image generation backend. Use 'pollinations' (no local SD) or 'sdapi' (Automatic1111).",
    )
    parser.add_argument(
        "--image-prompt",
        default="futuristic AI productivity tools workspace, cinematic lighting",
        help="Prompt for image generation.",
    )
    parser.add_argument("--piper-model", default="en_US-lessac-medium.onnx", help="Piper model filename/path.")
    parser.add_argument("--piper-bin", default="piper", help="Piper executable path, e.g. C:\\tools\\piper\\piper.exe")
    parser.add_argument("--image-file", default="scene.png", help="Output image file.")
    parser.add_argument(
        "--scene-images-dir",
        default="",
        help="Optional directory of scene images. If set, images are stitched as multiple scenes.",
    )
    parser.add_argument("--voice-file", default="voice.wav", help="Output voice file.")
    parser.add_argument("--video-file", default="video.mp4", help="Output video file.")
    parser.add_argument("--width", type=int, default=1024, help="Output image width.")
    parser.add_argument("--height", type=int, default=576, help="Output image height.")
    parser.add_argument("--steps", type=int, default=20, help="Stable Diffusion inference steps.")
    parser.add_argument(
        "--auto-scene-every",
        type=float,
        default=2.0,
        help="If > 0, auto-generate one image every N seconds from script text (e.g. 2).",
    )
    parser.add_argument(
        "--scene-style",
        default="cinematic lighting, highly detailed, youtube b-roll style, 16:9",
        help="Style suffix added to each auto scene prompt.",
    )
    parser.add_argument(
        "--scene-output-dir",
        default="generated_scenes",
        help="Directory where auto-generated scene images are saved.",
    )
    parser.add_argument("--seconds", type=int, default=60, help="Target narration length in seconds (e.g. 10).")
    parser.add_argument("--skip-checks", action="store_true", help="Skip service reachability checks.")
    parser.add_argument(
        "--use-existing-image",
        action="store_true",
        help="Skip Stable Diffusion and use --image-file as an existing local image.",
    )
    parser.add_argument(
        "--character-image",
        default="",
        help="Character image for talking-head mode.",
    )
    parser.add_argument(
        "--talking-head-cmd",
        default="",
        help=(
            "Optional command template to render talking-head video. "
            "Use placeholders: {image}, {audio}, {output}. "
            "Example: python inference.py --face \"{image}\" --audio \"{audio}\" --outfile \"{output}\""
        ),
    )
    return parser


def run_pipeline(args: argparse.Namespace) -> None:
    image_file = Path(args.image_file)
    scene_images_dir = Path(args.scene_images_dir) if args.scene_images_dir else None
    scene_output_dir = Path(args.scene_output_dir)
    character_image = Path(args.character_image) if args.character_image else None
    voice_file = Path(args.voice_file)
    video_file = Path(args.video_file)
    scene_images: list[Path] = []
    talking_head_mode = bool(args.talking_head_cmd)
    auto_scene_mode = args.auto_scene_every > 0

    if not args.skip_checks:
        print("Checking services...")
        check_service("http://127.0.0.1:11434/api/tags", "Ollama")
        needs_generated_images = (not args.use_existing_image or auto_scene_mode) and not talking_head_mode
        if needs_generated_images and args.image_provider == "sdapi":
            check_service("http://127.0.0.1:7860/", "Automatic1111")

    print("STEP 1: Researching topic...")
    research = get_research(args.topic)
    print("Research collected.")

    print("STEP 2: Generating script...")
    script, scene_descriptions = generate_script_package(
        args.topic, research, args.ollama_url, args.model, args.seconds
    )
    max_words = max(15, int(args.seconds * 2.8))
    words = script.split()
    if len(words) > max_words:
        script = " ".join(words[:max_words])
    print("\nSCRIPT:\n")
    print(script)

    if talking_head_mode:
        if not character_image:
            raise RuntimeError("Talking-head mode requires --character-image.")
        if not character_image.exists():
            raise RuntimeError(f"Character image not found: {character_image}")
        print(f"\nSTEP 3: Talking-head mode using character image: {character_image}")
    elif auto_scene_mode:
        print(f"\nSTEP 3: Auto-generating scene images every {args.auto_scene_every} seconds...")
        scene_texts = scene_descriptions or split_script_into_scene_texts(script, args.auto_scene_every)
        scene_output_dir.mkdir(parents=True, exist_ok=True)
        scene_images = []
        total = len(scene_texts)
        for idx, scene_text in enumerate(scene_texts, start=1):
            prompt = to_scene_prompt(scene_text, args.scene_style)
            out = scene_output_dir / f"scene_{idx:03d}.png"
            print(f"  - Scene {idx}/{total}: {scene_text[:80]}...")
            generate_image(args.image_provider, prompt, args.sd_url, out, args.width, args.height, args.steps)
            scene_images.append(out)
        print(f"Generated {len(scene_images)} scene images in: {scene_output_dir}")
    elif args.use_existing_image:
        if scene_images_dir:
            if not scene_images_dir.exists():
                raise RuntimeError(f"Scene image directory not found: {scene_images_dir}")
            scene_images = list_scene_images(scene_images_dir)
            print(f"\nSTEP 3: Using {len(scene_images)} existing scene images from: {scene_images_dir}")
        else:
            if not image_file.exists():
                raise RuntimeError(
                    f"--use-existing-image was set, but file not found: {image_file}"
                )
            scene_images = [image_file]
            print(f"\nSTEP 3: Using existing image: {image_file}")
    else:
        print("\nSTEP 3: Generating image...")
        generate_image(
            args.image_provider,
            args.image_prompt,
            args.sd_url,
            image_file,
            args.width,
            args.height,
            args.steps,
        )
        scene_images = [image_file]
        print(f"Image created: {image_file}")

    print("STEP 4: Generating voice...")
    generate_voice(script, args.piper_bin, args.piper_model, voice_file)
    print(f"Voice created: {voice_file}")

    print("STEP 5: Building video...")
    if talking_head_mode:
        render_talking_head(args.talking_head_cmd, character_image, voice_file, video_file)
    else:
        create_video(scene_images, voice_file, video_file)
    print(f"Video created: {video_file}")


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        run_pipeline(args)
        return 0
    except Exception as exc:
        print(f"Pipeline failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
