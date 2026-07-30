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

  const [showWA, setShowWA] = React.useState(false);
  React.useEffect(() => {
    const hero = document.getElementById('inicio');
    const onScroll = () => {
      const threshold = hero ? hero.offsetHeight - 100 : window.innerHeight;
      setShowWA(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

      <a
        href={`https://wa.me/${HOTEL.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className={`fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.35)] hover:scale-105 transition-all duration-300 ${showWA ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

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
