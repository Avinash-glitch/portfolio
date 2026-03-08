# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## YouTube Pipeline (Python)

This repo now includes `youtube_pipeline.py` for an automated test pipeline:

`Topic -> Research -> Script -> Image -> Voice -> Video`

### Install Python deps

```bash
pip install -r requirements-youtube-pipeline.txt
```

### External tools required

- Ollama running on `http://127.0.0.1:11434`
- Automatic1111 running on `http://127.0.0.1:7860`
- `piper` available in PATH
- `ffmpeg` available in PATH

### Run

```bash
python youtube_pipeline.py
```

### Useful options

```bash
python youtube_pipeline.py --topic "latest AI agents" --model llama3.1
```
