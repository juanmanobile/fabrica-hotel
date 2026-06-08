/* ===== App + Tweaks ===== */
const { useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "Naranja Industrial",
  "heroLayout": "Centrado",
  "heroDark": 0.85,
  "roomsLayout": "Scroll horizontal",
  "reviewsLayout": "Marquee",
  "anim": "Elegante"
}/*EDITMODE-END*/;

const ANIM_PROFILES = {
  'Reducida': { distMul: 0.4, durMul: 0.7 },
  'Elegante': { distMul: 1, durMul: 1 },
  'Cinemática': { distMul: 1.7, durMul: 1.35 },
};

function applyPalette(name) {
  const p = window.PALETTES[name] || window.PALETTES['Naranja Industrial'];
  const root = document.documentElement.style;
  root.setProperty('--accent', p.accent);
  root.setProperty('--accent-hover', p.hover);
  root.setProperty('--accent-rgb', p.rgb);
  root.setProperty('--accent-tint', `rgba(${p.rgb}, 0.10)`);
  root.setProperty('--accent-tint-soft', `rgba(${p.rgb}, 0.06)`);
  root.setProperty('--accent-bd', `rgba(${p.rgb}, 0.40)`);
  root.setProperty('--accent-bd-soft', `rgba(${p.rgb}, 0.15)`);
  root.setProperty('--accent-glow', `rgba(${p.rgb}, 0.20)`);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // animation profile must be set before children render
  window.__fhAnim = ANIM_PROFILES[t.anim] || ANIM_PROFILES['Elegante'];

  useEffectApp(() => { applyPalette(t.palette); }, [t.palette]);

  // "Nosotros" / Historia link → land where the wheel text is already revealed
  useEffectApp(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href="#historia"]');
      if (!a) return;
      const sec = document.getElementById('historia');
      if (!sec) return;
      e.preventDefault();
      const target = sec.offsetTop + Math.max(0, sec.offsetHeight - window.innerHeight) * 0.92;
      window.scrollTo({ top: target, behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <main className="relative w-full" style={{ background: 'var(--bg)', overflowX: 'clip' }}>
      <Nav />
      <div key={t.anim}>
        <Hero t={t} />
        <Rooms t={t} />
        <Services />
        <Story />
        <Reviews t={t} />
        <Location />
        <Cta />
      </div>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Identidad visual" />
        <TweakSelect
          label="Paleta de color"
          value={t.palette}
          options={Object.keys(window.PALETTES)}
          onChange={(v) => setTweak('palette', v)}
        />

        <TweakSection label="Hero" />
        <TweakRadio
          label="Composición"
          value={t.heroLayout}
          options={['Centrado', 'Editorial', 'Minimal']}
          onChange={(v) => setTweak('heroLayout', v)}
        />
        <TweakSlider
          label="Oscurecer video"
          value={t.heroDark}
          min={0.25}
          max={0.85}
          step={0.05}
          onChange={(v) => setTweak('heroDark', v)}
        />

        <TweakSection label="Secciones" />
        <TweakSelect
          label="Habitaciones"
          value={t.roomsLayout}
          options={['Scroll horizontal', 'Grilla']}
          onChange={(v) => setTweak('roomsLayout', v)}
        />
        <TweakSelect
          label="Reseñas"
          value={t.reviewsLayout}
          options={['Marquee', 'Grilla estática']}
          onChange={(v) => setTweak('reviewsLayout', v)}
        />

        <TweakSection label="Movimiento" />
        <TweakRadio
          label="Animación"
          value={t.anim}
          options={['Reducida', 'Elegante', 'Cinemática']}
          onChange={(v) => setTweak('anim', v)}
        />
      </TweaksPanel>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
