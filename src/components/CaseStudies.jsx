import { useState } from 'react';

// ─── Case Study Data ──────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    id: 'breadjam',
    title: 'Bread & Jam',
    tagline: 'Git-style collaborative music platform with a stem marketplace',
    tags: ['Music Tech', 'WebRTC', 'Marketplace', 'Audio DSP'],
    status: 'MVP in development · 2 beta users',
    tabs: {
      problem: {
        content: `Musicians lose ideas constantly. A melody surfaces at 2am — there's no instrument nearby, no collaborator online, and no platform built for the way music actually gets made: iteratively, socially, and in fragments.

SoundCloud, Instagram, and YouTube are generic content feeds. None of them let a musician say "here's my loop — build on it" and then turn that collaboration into income.

Producers, meanwhile, spend hours trawling platforms for stems with no way to search by BPM, time signature, or instrument. Discovery is broken on both sides. Musicians have no visibility into their market value — they're guessing at prices with no data.`,
      },
      approach: {
        content: `I built BranchJam as a git-style collaborative music platform — the core insight being that music collaboration maps almost perfectly to version control. A musician posts a stem. Another branches off it. A third branches from the second. Each branch is a creative decision, and the whole tree is buyable.

Key product decisions:
→ Twitter-style branching so musicians add loops as branches rather than overwriting each other
→ Asynchronous-first model so global collaboration doesn't require timezone alignment
→ Contributor consent system so no track gets sold without every collaborator's approval
→ Bidding marketplace where producers make offers on packages of stems, with revenue split automatically across contributors

The standout technical feature: a hum-to-instrument converter. Musicians hum a melody into their phone — the system detects pitch frame-by-frame and renders it as a synth WAV. Idea captured. No instrument needed.`,
      },
      stack: {
        content: `Audio / DSP
→ Custom audio_analysis.py — BPM detection (±3 BPM tolerance validation), SVG waveform generation, pitch-to-synth conversion (sine / square / saw), in-place WAV trimming

Realtime
→ Flask-SocketIO with full-mesh WebRTC — SDP/ICE relay, Google STUN, Opus codec at 10ms frames planned for minimal latency

Backend
→ Python / Flask, SQLite, blueprint architecture (auth / social / projects / marketplace / jam)

Frontend
→ Jinja2 + vanilla JS, step sequencer grid editor (8–64 steps, 6 audio clip slots, per-clip volume and trim)`,
      },
      outcome: {
        content: `Core platform built: branching track system, contributor consent flows, marketplace with counter-offer negotiation, live jam rooms via WebRTC, step sequencer, hum-to-instrument converter. Bidding, prompt search, and time-alignment in progress.

What the architecture proves: git-style branching applied to music collaboration is a genuinely new model for how stems get made and sold.

What I learned: Contributor consent is the hardest product problem in collaborative music — not the audio tech. Getting multiple musicians to agree on a sale requires a negotiation system, not a button. The counter-offer flow (any contributor can counter, producer accepts the highest counter) is closer to a micro-auction than a marketplace — and that's exactly right for creative work.`,
      },
    },
    demo: {
      label: 'AI Jam Advisor',
      description: 'Describe your current loop stack and Claude suggests what to add next — like a producer listening in the room.',
      inputs: [
        { id: 'loops', label: 'What loops are in your jam so far?', placeholder: 'e.g. 808 bass at 90 BPM, lo-fi piano chord loop', type: 'text' },
        { id: 'genre', label: 'Genre / vibe', placeholder: 'e.g. lo-fi hip hop, dark R&B, afrobeats', type: 'text' },
        { id: 'goal', label: 'Where do you want this to go?', placeholder: 'e.g. needs more energy, feels empty on top, ready to sell', type: 'text' },
      ],
      systemPrompt: `You are a music producer with deep knowledge of arrangement, sound design, and the stem marketplace. You listen to a musician's current loop stack and give sharp, specific advice on what to add next to make the track more complete — and more sellable to producers. Be direct and specific: name instruments, frequency ranges, BPM suggestions, and why each addition serves the track. Keep your response to 3–4 punchy recommendations. No fluff.`,
      buildPrompt: (v) => `Current jam stack: ${v.loops}\nGenre / vibe: ${v.genre}\nGoal: ${v.goal}\n\nWhat should I add next to make this track stronger and more attractive to producers?`,
      outputLabel: 'Producer advice',
    },
  },
  {
    id: 'gait',
    title: 'Gait Analysis System',
    tagline: 'Clinical-grade movement analysis running entirely in the browser — no backend, no hardware',
    tags: ['Computer Vision', 'MediaPipe', 'Health AI', 'React + TypeScript'],
    status: 'Product in development · Pre-clinical validation',
    tabs: {
      problem: {
        content: `Knowing something is wrong with how you move is easy. Knowing what to do about it is hard.

Clinical gait analysis — the kind that gives you real biomechanical data — requires a motion capture lab, a trained physiotherapist, and hundreds of pounds per session. For runners with recurring knee pain, patients discharged from physio, or coaches trying to reduce injury risk in their athletes, that barrier is simply too high.

The result: most people either guess at the cause of their movement problems, or wait until the injury is serious enough to justify the cost. There's a vast clinical middle ground — screening, tracking, self-management — that expensive lab infrastructure can't serve at scale.`,
      },
      approach: {
        content: `I built a browser-native gait analysis tool that runs a full clinical-grade assessment using nothing but a webcam. No wearables, no markers, no backend — all ML inference runs on-device via MediaPipe's GPU-accelerated pose model.

The key product decision was the 4-pass protocol: front, rear, left side, right side. A single-angle assessment misses most clinically significant pathologies. Front-plane captures hip drop and scissor gait. Sagittal captures dorsiflexion angle and foot strike pattern. Rear-plane captures heel whip and overpronation.

Together they produce a weighted 0–100 gait score with priority-ranked findings — the same structure a physiotherapist would use, delivered in under two minutes. The second key decision: Claude generates a personalised rehab and training plan from the raw scores. The system detects. Claude interprets and prescribes.`,
      },
      stack: {
        content: `Computer Vision / ML
→ MediaPipe Tasks Vision — 33-point body pose estimation, GPU-accelerated, fully client-side
→ 5-frame temporal smoothing to reduce landmark jitter
→ Step event detection via heel Y-position local maxima
→ Automatic pass classification via hip X/Z motion deltas (no button press mid-stride)

Biomechanics Engine
→ Custom metric extraction: cadence, symmetry score, arch type, foot strike classification, dorsiflexion angle, hip drop, heel whip, scissor gait, overpronation, leg length discrepancy

Frontend
→ React 19 + TypeScript + Vite, Zustand for state, Recharts (step timeline, symmetry radar, gait score gauge), Tailwind CSS, Web Speech API for audio cues during recording`,
      },
      outcome: {
        content: `Fully functional browser application — no installation, no server, no hardware beyond a standard webcam. Complete 4-pass protocol with real-time pose overlay, live metric computation, and a scored clinical report with ranked recommendations.

What it proves technically: production-grade on-device ML is now viable in a browser. What it proves as a product: the £500 physio gait assessment has a credible £0 alternative for screening and self-management.

What I learned: The hardest problem wasn't the ML — MediaPipe handles that. It was pass classification: automatically detecting which direction the user is walking from landmark geometry alone, without asking them to press a button mid-stride. Hip X/Z motion deltas turned out to be the right signal. That kind of problem — where UX constraints drive the technical solution — is where the interesting work lives.`,
      },
    },
    demo: {
      label: 'Rehab Plan Generator',
      description: 'Enter your gait scores and Claude generates a personalised 4-week rehab and training plan.',
      inputs: [
        { id: 'score', label: 'Overall gait score (0–100)', placeholder: 'e.g. 71', type: 'text' },
        { id: 'findings', label: 'Key findings from your report', placeholder: 'e.g. overpronation, mild hip drop left side, midfoot strike', type: 'text' },
        {
          id: 'goal', label: 'Your goal', placeholder: '', type: 'select',
          options: ['Pain reduction / injury prevention', 'Running performance improvement', 'General movement quality', 'Return to sport after injury'],
        },
      ],
      systemPrompt: `You are a sports physiotherapist and strength & conditioning coach with expertise in gait rehabilitation. Given a patient's gait analysis scores and findings, you generate a specific, structured 4-week rehab and training plan. Be precise: name the exact exercises, sets, reps, and progression. Explain in one sentence why each exercise addresses the specific finding. Keep it actionable — no generic advice. Format as Week 1–2 and Week 3–4 blocks.`,
      buildPrompt: (v) => `Gait score: ${v.score}/100\nKey findings: ${v.findings}\nGoal: ${v.goal}\n\nGenerate a personalised 4-week rehab and training plan.`,
      outputLabel: 'Your personalised plan',
    },
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  section: {
    marginTop: '80px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '60px',
  },
  heading: {
    margin: 0,
    fontSize: '26px',
    fontWeight: 700,
    color: '#ccd6f6',
    whiteSpace: 'nowrap',
    fontFamily: "'Inter', sans-serif",
  },
  headingNumber: {
    color: '#f0c674',
    fontFamily: 'monospace',
    fontSize: '20px',
    marginRight: '10px',
  },
  divider: {
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    flex: 1,
  },
  card: {
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    background: 'var(--card-bg)',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  cardHeader: {
    padding: '28px 32px 22px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '14px',
  },
  tag: {
    fontSize: '11px',
    fontWeight: 500,
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.07)',
    color: '#8899bb',
    letterSpacing: '0.02em',
  },
  cardTitle: {
    margin: '0 0 4px',
    fontSize: '22px',
    fontWeight: 600,
    color: '#ccd6f6',
    fontFamily: "'Inter', sans-serif",
  },
  cardTagline: {
    margin: '0 0 10px',
    fontSize: '13px',
    color: '#667799',
  },
  statusBadge: {
    fontSize: '12px',
    color: '#4ade80',
    fontWeight: 500,
  },
  tabsWrapper: {
    padding: '22px 32px 0',
  },
  tabRow: {
    display: 'flex',
    gap: '0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    marginBottom: '20px',
  },
  tab: (active) => ({
    paddingBottom: '12px',
    paddingRight: '20px',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    borderBottom: active ? '2px solid #ccd6f6' : '2px solid transparent',
    color: active ? '#ccd6f6' : '#556677',
    transition: 'color 0.15s',
    fontFamily: "'Inter', sans-serif",
  }),
  tabContent: {
    fontSize: '13px',
    color: '#8899bb',
    lineHeight: 1.75,
    whiteSpace: 'pre-line',
    minHeight: '160px',
    padding: '0 0 4px',
  },
  demoToggleArea: {
    padding: '16px 32px 28px',
  },
  demoToggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#ccd6f6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    fontFamily: "'Inter', sans-serif",
  },
  demoBox: {
    marginTop: '20px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(0,0,0,0.25)',
    padding: '22px',
  },
  demoPulseRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '14px',
  },
  demoPulse: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#4ade80',
    animation: 'pulse 2s infinite',
  },
  demoTitle: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#8899bb',
  },
  demoDesc: {
    fontSize: '12px',
    color: '#556677',
    marginBottom: '18px',
  },
  inputGroup: {
    marginBottom: '14px',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 500,
    color: '#667799',
    marginBottom: '6px',
    letterSpacing: '0.02em',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    padding: '8px 12px',
    fontSize: '13px',
    color: '#ccd6f6',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
  },
  runBtn: (disabled) => ({
    marginTop: '16px',
    width: '100%',
    borderRadius: '8px',
    background: disabled ? 'rgba(37,99,235,0.4)' : '#2563eb',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    padding: '10px 16px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.15s',
    fontFamily: "'Inter', sans-serif",
  }),
  errorText: {
    marginTop: '8px',
    fontSize: '12px',
    color: '#f87171',
  },
  outputLabel: {
    fontSize: '11px',
    fontWeight: 500,
    color: '#556677',
    marginBottom: '8px',
    letterSpacing: '0.02em',
  },
  outputBox: {
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(255,255,255,0.03)',
    padding: '14px',
    fontSize: '13px',
    color: '#aabbcc',
    whiteSpace: 'pre-wrap',
    lineHeight: 1.7,
  },
};

// ─── Demo Component ───────────────────────────────────────────────────────────

function LiveDemo({ demo }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(demo.inputs.map((i) => [i.id, i.options?.[0] ?? '']))
  );
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    const empty = demo.inputs.filter((i) => i.type !== 'select' && !values[i.id]?.trim());
    if (empty.length > 0) {
      setError(`Please fill in: ${empty.map((i) => i.label).join(', ')}`);
      return;
    }
    setError('');
    setLoading(true);
    setOutput('');
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey ?? '',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: demo.systemPrompt,
          messages: [{ role: 'user', content: demo.buildPrompt(values) }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b) => b.text ?? '').join('') ?? '';
      setOutput(text || 'No response received.');
    } catch {
      setError('Failed to reach Claude. Check your VITE_ANTHROPIC_API_KEY in .env.local.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.demoBox}>
      <div style={s.demoPulseRow}>
        <span style={s.demoPulse} />
        <span style={s.demoTitle}>Live demo — {demo.label}</span>
      </div>
      <p style={s.demoDesc}>{demo.description}</p>

      <div>
        {demo.inputs.map((input) => (
          <div key={input.id} style={s.inputGroup}>
            <label style={s.label}>{input.label}</label>
            {input.type === 'select' ? (
              <select
                value={values[input.id]}
                onChange={(e) => setValues((v) => ({ ...v, [input.id]: e.target.value }))}
                style={s.input}
              >
                {input.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type="text"
                value={values[input.id]}
                onChange={(e) => setValues((v) => ({ ...v, [input.id]: e.target.value }))}
                placeholder={input.placeholder}
                style={s.input}
              />
            )}
          </div>
        ))}
      </div>

      {error && <p style={s.errorText}>{error}</p>}

      <button onClick={handleRun} disabled={loading} style={s.runBtn(loading)}>
        {loading ? 'Thinking...' : `Run — ${demo.label}`}
      </button>

      {output && (
        <div style={{ marginTop: '16px' }}>
          <p style={s.outputLabel}>{demo.outputLabel}</p>
          <div style={s.outputBox}>{output}</div>
        </div>
      )}
    </div>
  );
}

// ─── Single Case Study Card ───────────────────────────────────────────────────

const TABS = [
  { id: 'problem', label: 'The Problem' },
  { id: 'approach', label: 'My Approach' },
  { id: 'stack', label: 'Stack' },
  { id: 'outcome', label: 'Outcome' },
];

function CaseStudyCard({ study }) {
  const [activeTab, setActiveTab] = useState('problem');
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div style={s.card}>
      {/* Header */}
      <div style={s.cardHeader}>
        <div style={s.tagRow}>
          {study.tags.map((tag) => (
            <span key={tag} style={s.tag}>{tag}</span>
          ))}
        </div>
        <h3 style={s.cardTitle}>{study.title}</h3>
        <p style={s.cardTagline}>{study.tagline}</p>
        <span style={s.statusBadge}>{study.status}</span>
      </div>

      {/* Tabs */}
      <div style={s.tabsWrapper}>
        <div style={s.tabRow}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={s.tab(activeTab === tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={s.tabContent}>
          {study.tabs[activeTab].content}
        </div>
      </div>

      {/* Demo toggle */}
      <div style={s.demoToggleArea}>
        <button onClick={() => setDemoOpen((o) => !o)} style={s.demoToggleBtn}>
          <span style={{ transition: 'transform 0.2s', transform: demoOpen ? 'rotate(90deg)' : 'none', display: 'inline-block' }}>▶</span>
          {demoOpen ? 'Close demo' : `Try live demo — ${study.demo.label}`}
        </button>
        {demoOpen && <LiveDemo demo={study.demo} />}
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function CaseStudies() {
  return (
    <section id="case-studies" style={s.section}>
      <div style={s.header}>
        <h2 style={s.heading}>
          <span style={s.headingNumber}>03.</span>
          Case Studies
        </h2>
        <div style={s.divider} />
      </div>

      <p style={{ color: '#667799', fontSize: '14px', lineHeight: 1.7, maxWidth: '540px', marginBottom: '40px', marginTop: '-32px' }}>
        Products I've designed and built end-to-end — each with a live AI demo embedded below.
        Real problems, real architecture decisions, real outcomes.
      </p>

      <div>
        {CASE_STUDIES.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
