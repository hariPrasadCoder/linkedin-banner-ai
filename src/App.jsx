import { useState, useRef } from 'react';
import { generateBanner } from './api';
import './index.css';

const STYLES = [
  { id: 'Minimal',  icon: '◻️', label: 'Minimal'  },
  { id: 'Bold',     icon: '⚡', label: 'Bold'     },
  { id: 'Tech',     icon: '🔷', label: 'Tech'     },
  { id: 'Nature',   icon: '🌿', label: 'Nature'   },
  { id: 'Creative', icon: '🎨', label: 'Creative' },
];

const LUMA_KEY_DEFAULT = import.meta.env.VITE_LUMA_KEY || '';

export default function App() {
  const [name, setName]         = useState('');
  const [role, setRole]         = useState('');
  const [tagline, setTagline]   = useState('');
  const [industry, setIndustry] = useState('');
  const [about, setAbout]       = useState('');
  const [keywords, setKeywords] = useState('');
  const [style, setStyle]       = useState('Minimal');
  const [lumaKey, setLumaKey]   = useState(LUMA_KEY_DEFAULT);
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');

  const toolRef = useRef(null);

  const onGenerate = async () => {
    if (!role && !industry) { setError('Please enter at least your role or industry.'); return; }
    if (!lumaKey)           { setError('Please enter your Luma API key.'); return; }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const url = await generateBanner(lumaKey, { name, role, tagline, industry, about, keywords, style });
      setResult(url);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDownload = async () => {
    try {
      const res = await fetch(result);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'linkedin-banner.png';
      a.click();
    } catch {
      window.open(result, '_blank');
    }
  };

  const scrollToTool = () =>
    toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, textarea:focus { border-color: #5b4fd8 !important; box-shadow: 0 0 0 3px rgba(91,79,216,0.1); outline: none; }
        button:not(:disabled):hover { opacity: 0.88; }
        a:hover { text-decoration: underline; }
        @media (max-width: 680px) {
          .style-row  { grid-template-columns: repeat(3, 1fr) !important; }
          .how-grid   { grid-template-columns: 1fr !important; }
          .input-row  { grid-template-columns: 1fr !important; }
          .card       { padding: 24px !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.navLogo}>LinkedIn Banner Generator</span>
      </nav>

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section style={s.hero}>
          <h1 style={s.heroHeadline}>LinkedIn Banner Generator</h1>
          <p style={s.heroSub}>
            Tell us who you are. Uni-1 generates a stunning banner that makes your profile impossible to scroll past.
          </p>
          <button style={s.btnPrimary} onClick={scrollToTool}>
            Create my banner
          </button>
        </section>

        {/* Tool */}
        <section ref={toolRef} style={s.toolSection}>
          <div className="card" style={s.card}>

            {/* About you */}
            <div>
              <p style={s.sectionLabel}>About you</p>
              <div className="input-row" style={s.inputRow}>
                <div style={s.inputGroup}>
                  <label style={s.label}>Name <span style={s.optional}>(optional)</span></label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Hari Prasad" style={s.input} />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Role / Title</label>
                  <input type="text" value={role} onChange={e => setRole(e.target.value)}
                    placeholder="Founder, Product Designer…" style={s.input} />
                </div>
              </div>
              <div style={{ ...s.inputGroup, marginTop: 12 }}>
                <label style={s.label}>Tagline <span style={s.optional}>(the bold statement displayed on your banner)</span></label>
                <input type="text" value={tagline} onChange={e => setTagline(e.target.value)}
                  placeholder="Building AI tools that actually work" style={s.input} />
              </div>
              <div className="input-row" style={{ ...s.inputRow, marginTop: 12 }}>
                <div style={s.inputGroup}>
                  <label style={s.label}>Industry</label>
                  <input type="text" value={industry} onChange={e => setIndustry(e.target.value)}
                    placeholder="AI, Fintech, Healthcare…" style={s.input} />
                </div>
                <div style={s.inputGroup}>
                  <label style={s.label}>Keywords / Vibe <span style={s.optional}>(optional)</span></label>
                  <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)}
                    placeholder="bold, minimal, futuristic…" style={s.input} />
                </div>
              </div>
              <div style={{ ...s.inputGroup, marginTop: 12 }}>
                <label style={s.label}>About me <span style={s.optional}>(optional — the more detail, the better the prompt)</span></label>
                <textarea
                  value={about}
                  onChange={e => setAbout(e.target.value)}
                  placeholder="e.g. I'm a founder building AI tools for healthcare. I care about simplicity and human-centred design. My work sits at the intersection of tech and empathy."
                  style={{ ...s.input, height: 90, resize: 'vertical', lineHeight: 1.55 }}
                />
              </div>
            </div>

            {/* Style */}
            <div>
              <p style={s.sectionLabel}>Style</p>
              <div className="style-row" style={s.styleRow}>
                {STYLES.map(st => (
                  <button
                    key={st.id}
                    style={{ ...s.styleTile, ...(style === st.id ? s.styleTileActive : {}) }}
                    onClick={() => setStyle(st.id)}
                  >
                    <span style={s.styleIcon}>{st.icon}</span>
                    <span style={s.styleLabel}>{st.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Luma key */}
            <div style={s.inputGroup}>
              <label style={s.label}>Luma API Key</label>
              <input
                type="password"
                value={lumaKey}
                onChange={e => setLumaKey(e.target.value)}
                placeholder="luma-api-..."
                style={s.input}
              />
              <span style={s.helperText}>
                Get yours at{' '}
                <a href="https://platform.lumalabs.ai/" target="_blank" rel="noreferrer" style={s.link}>
                  platform.lumalabs.ai
                </a>
              </span>
            </div>

            {/* Generate */}
            <button
              style={{ ...s.btnPrimary, width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              onClick={onGenerate}
              disabled={loading}
            >
              {loading
                ? <span style={{ display: 'inline-flex', alignItems: 'center' }}><Spinner />Uni-1 is working…</span>
                : 'Generate banner'}
            </button>

            {error && <p style={s.errorText}>{error}</p>}

            {/* Result */}
            {result && (
              <div style={s.resultSection}>
                <div style={s.bannerWrapper}>
                  <img src={result} alt="LinkedIn Banner" style={s.bannerImg} />
                  <div style={s.bannerLabel}>LinkedIn Banner · 3:1</div>
                </div>
                <button style={{ ...s.btnPrimary, alignSelf: 'center', padding: '10px 28px', fontSize: 14 }} onClick={onDownload}>
                  Download banner
                </button>
                <p style={s.poweredBy}>
                  Powered by Luma Uni-1 ·{' '}
                  <a href="https://lumalabs.ai/uni-1" target="_blank" rel="noreferrer" style={s.link}>
                    lumalabs.ai/uni-1
                  </a>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* How it works */}
        <section style={s.howSection}>
          <h2 style={s.sectionHeading}>How it works</h2>
          <div className="how-grid" style={s.howGrid}>
            {[
              { icon: '✍️', title: 'Describe yourself',   desc: 'Enter your role, industry, and the vibe you want. No photo needed.' },
              { icon: '🎨', title: 'Pick a style',        desc: 'Five visual directions — from clean minimal to bold and technical.' },
              { icon: '✨', title: 'Uni-1 generates it',  desc: 'A cinematic 3:1 banner crafted for your LinkedIn profile in seconds.' },
            ].map(item => (
              <div key={item.title} style={s.howCard}>
                <span style={s.howIcon}>{item.icon}</span>
                <h3 style={s.howTitle}>{item.title}</h3>
                <p style={s.howDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={s.footer}>
        <p style={s.footerText}>
          Built by Hari Prasad · Powered by{' '}
          <a href="https://lumalabs.ai/uni-1" target="_blank" rel="noreferrer" style={s.footerLink}>
            Luma Uni-1
          </a>
        </p>
      </footer>
    </>
  );
}

function Spinner() {
  return (
    <span style={{
      display: 'inline-block',
      width: 15, height: 15,
      border: '2px solid rgba(255,255,255,0.35)',
      borderTopColor: '#fff',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      marginRight: 8,
      flexShrink: 0,
    }} />
  );
}

const s = {
  nav: {
    display: 'flex', alignItems: 'center',
    padding: '0 40px', height: 60,
    background: '#f5f4f1', borderBottom: '1px solid #e0ddd8',
    position: 'sticky', top: 0, zIndex: 100,
  },
  navLogo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 20, color: '#111', letterSpacing: '-0.3px',
  },

  hero: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', padding: '96px 24px 72px',
  },
  heroHeadline: {
    fontSize: 'clamp(38px, 6vw, 68px)',
    lineHeight: 1.08, letterSpacing: '-1.5px',
    color: '#111', maxWidth: 640, marginBottom: 20,
  },
  heroSub: {
    fontSize: 18, lineHeight: 1.65, color: '#555',
    maxWidth: 500, marginBottom: 36,
  },

  toolSection: {
    display: 'flex', justifyContent: 'center',
    padding: '0 24px 96px',
  },
  card: {
    background: '#fff', border: '1px solid #e0ddd8',
    borderRadius: 12, padding: '40px',
    width: '100%', maxWidth: 680,
    display: 'flex', flexDirection: 'column', gap: 28,
  },

  sectionLabel: {
    fontSize: 13, fontWeight: 600, color: '#888',
    textTransform: 'uppercase', letterSpacing: '0.6px',
    marginBottom: 12,
  },

  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 14, fontWeight: 500, color: '#111' },
  optional: { fontWeight: 400, color: '#aaa', fontSize: 13 },
  input: {
    padding: '10px 14px',
    border: '1px solid #e0ddd8', borderRadius: 8,
    fontSize: 14, fontFamily: "'DM Sans', sans-serif",
    color: '#111', background: '#fff',
    outline: 'none', width: '100%',
    transition: 'border-color 0.15s',
  },
  helperText: { fontSize: 12, color: '#999' },
  link: { color: '#5b4fd8', textDecoration: 'none' },

  styleRow: {
    display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10,
  },
  styleTile: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
    padding: '14px 8px', background: '#fff',
    border: '1px solid #e0ddd8', borderRadius: 10,
    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.12s, background 0.12s',
  },
  styleTileActive: { border: '2px solid #5b4fd8', background: '#f5f3ff' },
  styleIcon: { fontSize: 20, lineHeight: 1 },
  styleLabel: { fontSize: 12, fontWeight: 500, color: '#333' },

  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: '#5b4fd8', color: '#fff',
    border: 'none', borderRadius: 8,
    padding: '13px 28px', fontSize: 15, fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer', transition: 'opacity 0.15s',
    letterSpacing: '0.1px',
  },

  errorText: { color: '#c0392b', fontSize: 14, marginTop: -8 },

  resultSection: {
    display: 'flex', flexDirection: 'column', gap: 16,
    paddingTop: 16, borderTop: '1px solid #e0ddd8',
  },
  bannerWrapper: {
    borderRadius: 10, overflow: 'hidden',
    border: '1px solid #e0ddd8',
    position: 'relative',
  },
  bannerImg: { width: '100%', display: 'block' },
  bannerLabel: {
    position: 'absolute', bottom: 10, right: 12,
    fontSize: 11, color: 'rgba(255,255,255,0.7)',
    background: 'rgba(0,0,0,0.35)',
    padding: '3px 8px', borderRadius: 4,
    backdropFilter: 'blur(4px)',
  },
  poweredBy: { fontSize: 12, color: '#bbb', textAlign: 'center' },

  howSection: {
    padding: '80px 24px 96px', background: '#fff',
    textAlign: 'center', borderTop: '1px solid #e0ddd8',
  },
  sectionHeading: {
    fontSize: 'clamp(28px, 4vw, 40px)',
    marginBottom: 40, color: '#111', letterSpacing: '-0.5px',
  },
  howGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20, maxWidth: 860, margin: '0 auto',
  },
  howCard: {
    background: '#f5f4f1', border: '1px solid #e0ddd8',
    borderRadius: 12, padding: '32px 24px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 12, textAlign: 'center',
  },
  howIcon: { fontSize: 32 },
  howTitle: { fontSize: 18, color: '#111', letterSpacing: '-0.2px' },
  howDesc: { fontSize: 14, color: '#666', lineHeight: 1.65 },

  footer: { background: '#111', padding: '28px 40px', textAlign: 'center' },
  footerText: { color: '#fff', fontSize: 14 },
  footerLink: { color: '#a899ff', textDecoration: 'none' },
};
