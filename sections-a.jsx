/* ===== Secciones A: Nav, Hero, Rooms ===== */
const { useState, useEffect, useRef } = React;
const Icon = window.Icon;

// Enlace directo a WhatsApp del hotel con mensaje pre-escrito
function waLink(room) {
  const msg = room
    ? `Hola, quisiera reservar una habitación ${room} en Fábrica Hotel. ¿Me confirmás disponibilidad y tarifa? ¡Gracias!`
    : 'Hola, quisiera consultar disponibilidad en Fábrica Hotel. ¡Gracias!';
  return `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(msg)}`;
}

const NAV_LINKS = [
  { href: '#habitaciones', label: 'Habitaciones' },
  { href: '#servicios', label: 'Amenities' },
  { href: '#historia', label: 'Nosotros' },
  { href: '#ubicacion', label: 'Ubicación' },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoCls = 'text-[var(--accent)]';
  const linkCls = scrolled ? 'text-black/65' : 'text-white/75';
  const burgerCls = scrolled ? 'text-[#1A1613]' : 'text-white';
  return (
    <nav
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ' +
        (scrolled
          ? 'bg-[#FBF9F6]/90 backdrop-blur-lg border-b border-black/8 py-3'
          : 'bg-gradient-to-b from-black/40 to-transparent py-6')
      }
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        <a href="#inicio" className="leading-none">
          <div className={'font-serif text-xl md:text-2xl tracking-tight ' + logoCls}>fábrica hotel</div>
          <div className="text-[var(--accent)] text-[10px] tracking-[0.25em] mt-1">★ ★ ★ ★</div>
        </a>

        <div className="hidden md:flex items-center gap-9 lg:gap-12">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={'text-[11px] tracking-[0.2em] uppercase hover:text-[var(--accent)] transition-colors ' + linkCls}
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[11px] font-medium tracking-[0.2em] uppercase px-6 py-2.5 rounded-full transition-colors"
          >
            Reservar
          </a>
        </div>

        <button
          className={'md:hidden w-10 h-10 flex items-center justify-center ' + burgerCls}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
        >
          <Icon name={open ? 'X' : 'Menu'} size={20} strokeWidth={1.5} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#14110D]/95 backdrop-blur-lg border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[13px] tracking-[0.15em] uppercase text-white/90"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="bg-[var(--accent)] text-white text-center text-[12px] font-medium tracking-[0.2em] uppercase px-6 py-3 rounded-full mt-1"
          >
            Reservar
          </a>
        </div>
      )}
    </nav>
  );
}

/* ===================== HERO ===================== */
function Hero({ t }) {
  const layout = t.heroLayout || 'Centrado';
  const dark = t.heroDark ?? 0.45;
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    let tries = 0;
    const tryPlay = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    tryPlay();
    ['loadeddata', 'canplay', 'canplaythrough'].forEach((ev) =>
      v.addEventListener(ev, tryPlay)
    );
    // retry a few times in case autoplay is initially blocked
    const iv = setInterval(() => {
      if (v.paused && tries < 12) { tryPlay(); tries++; }
      else clearInterval(iv);
    }, 400);
    const onVis = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(iv);
      document.removeEventListener('visibilitychange', onVis);
      ['loadeddata', 'canplay', 'canplaythrough'].forEach((ev) =>
        v.removeEventListener(ev, tryPlay)
      );
    };
  }, []);
  const isLeft = layout === 'Editorial';
  const isMinimal = layout === 'Minimal';

  const overlay =
    `linear-gradient(to bottom, rgba(20,17,13,${dark}) 0%, rgba(20,17,13,${dark * 0.5}) 35%, ` +
    `rgba(20,17,13,${dark}) 80%, rgba(20,17,13,0.95) 100%), ` +
    `radial-gradient(ellipse at 50% 55%, rgba(var(--accent-rgb),0.10) 0%, transparent 60%)`;

  const titleSize = isMinimal
    ? 'text-[clamp(2.6rem,6.5vw,4.6rem)]'
    : 'text-[clamp(3.5rem,9vw,6.5rem)]';

  const align = isLeft ? 'items-start text-left' : 'items-center text-center';
  const eyebrowJustify = isLeft ? 'justify-start' : 'justify-center';
  const ctaJustify = isLeft ? 'justify-start' : 'justify-center';
  const contentMax = isLeft ? 'max-w-3xl mr-auto' : '';

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[720px] overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover bg-[#0d0b08]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ transform: 'scale(1.16)', transformOrigin: '40% 40%' }}
      >
        <source src="assets/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" style={{ background: overlay }} />

      <div
        className={
          'relative z-10 h-full flex flex-col justify-center px-6 md:px-14 ' + align
        }
      >
        <div className={contentMax}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={
              'text-[11px] tracking-[0.4em] uppercase text-white/55 mb-8 flex items-center gap-3 ' +
              eyebrowJustify
            }
          >
            <span className="w-8 h-px bg-white/25" />
            Armstrong · Santa Fe · RN 9
            {!isLeft && <span className="w-8 h-px bg-white/25" />}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={'font-serif text-white leading-[1.0] tracking-tight mb-5 ' + titleSize}
          >
            {isLeft ? (
              <>fábrica<br /><em className="italic text-white">hotel</em></>
            ) : (
              <>fábrica<br />hotel</>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className={'text-[var(--accent)] text-sm tracking-[0.3em] mb-6 ' + (isLeft ? '' : '')}
          >
            ★ ★ ★ ★
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="font-serif italic text-white/80 text-[clamp(1rem,1.8vw,1.35rem)] mb-12"
          >
            10 años fabricando descanso
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className={'flex items-center gap-4 flex-wrap ' + ctaJustify}
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 text-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 rounded-full transition-all"
            >
              Reservar
            </a>
            <a
              href="#resenas"
              className="group inline-flex items-center gap-2 text-white/85 hover:text-[var(--accent)] text-xs tracking-[0.2em] uppercase px-6 py-4 transition-colors"
            >
              Reseñas
              <Icon name="ArrowDown" size={12} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 md:left-10 text-[10px] tracking-[0.25em] uppercase text-white/40 z-10">
        EST. 2016
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.35em] uppercase text-white/35">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent scroll-line-anim" />
      </div>
    </section>
  );
}

/* ===================== ROOMS ===================== */
// Encuadres para simular varias fotos por habitación (reemplazar por r.gallery real luego)
const SLIDE_FRAMES = ['50% 22%', '50% 52%', '50% 82%'];

function RoomCardContent({ r, i, total, cardActive = false, ready = false }) {
  // galería real si existe; si no, 3 encuadres de la misma foto
  const slides = (r.gallery && r.gallery.length)
    ? r.gallery.map((src) => ({ src, pos: r.pos || '50% 50%' }))
    : SLIDE_FRAMES.map((pos) => ({ src: r.img, pos }));

  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil/tablet (<1024px) y mantenerlo actualizado al rotar/redimensionar
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update); };
  }, []);

  // Solo escritorio ≥1024px usa hover
  const enableHover = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(min-width: 1024px)').matches;
  };

  // Autoplay: en móvil solo la tarjeta centrada Y con la sección detenida en vista (ready);
  // en escritorio al pasar el cursor
  const playing = isMobile ? (cardActive && ready) : hover;
  useEffect(() => {
    if (!playing || slides.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 1600);
    return () => clearInterval(id);
  }, [playing, slides.length]);

  // Reinicia a la primera al detenerse (salir el cursor en escritorio / scrollear en móvil)
  useEffect(() => { if (!playing) setActive(0); }, [playing]);

  return (
    <div
      className="h-full flex flex-col bg-white"
      onMouseEnter={() => { if (enableHover()) setHover(true); }}
      onMouseLeave={() => setHover(false)}
    >
      {/* Imagen: carrusel automático al hover */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 flex h-full transition-transform duration-[800ms]"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${active * (100 / slides.length)}%)`,
            transitionTimingFunction: 'cubic-bezier(.5,.05,.2,1)',
          }}
        >
          {slides.map((s, si) => (
            <div key={si} className="relative h-full overflow-hidden" style={{ width: `${100 / slides.length}%` }}>
              <div
                className="absolute inset-0 bg-cover"
                style={{
                  backgroundImage: `url(${s.src})`,
                  backgroundPosition: s.pos,
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(20,17,13,0.92) 0%, rgba(20,17,13,0.35) 32%, rgba(20,17,13,0.05) 55%, rgba(20,17,13,0.30) 100%)',
          }}
        />

        <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
          <span className="font-serif text-white/70 text-sm tracking-wider">
            {String(i + 1).padStart(2, '0')} / 0{total}
          </span>
          <span className="text-[10px] tracking-[0.16em] uppercase text-white/85 px-3 py-1.5 border border-white/25 rounded-full bg-black/30 backdrop-blur">
            {r.meta}
          </span>
        </div>

        {/* indicadores de slide */}
        <div
          className="absolute bottom-[88px] left-6 z-20 flex gap-1.5 transition-opacity duration-300"
          style={{ opacity: (hover || (isMobile && cardActive && ready)) ? 1 : 0 }}
        >
          {slides.map((_, si) => (
            <button
              key={si}
              onClick={(e) => { e.preventDefault(); setActive(si); }}
              aria-label={`Imagen ${si + 1}`}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: si === active ? 22 : 8,
                background: si === active ? 'var(--accent)' : 'rgba(255,255,255,0.55)',
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
          <div className="text-[10px] tracking-[0.22em] uppercase text-[var(--accent)] mb-1.5">{r.spec}</div>
          <h3 className="font-serif text-white text-[2.1rem] leading-[1.0]">{r.name}</h3>
        </div>
      </div>

      {/* Recuadro: descripción */}
      <div className="flex-shrink-0 flex flex-col h-[262px] p-5 sm:p-6 border-t border-black/10 bg-white">
        <p className="text-[13px] text-black/70 leading-[1.65] mb-4 line-clamp-5">{r.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {r.tags.map((tag) => (
            <span key={tag} className="whitespace-nowrap text-[10px] text-black/65 border border-black/15 px-2.5 py-1 rounded-full bg-black/[0.03]">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={waLink(r.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto self-start inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white bg-[var(--accent)] px-5 py-3 border border-[var(--accent)] hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] rounded-full transition-all group/cta"
        >
          Consultar disponibilidad
          <Icon name="MoveRight" size={12} className="group-hover/cta:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

const CARD_WIDTH = 520;
const GAP = 20;

function RoomsHeader({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-6 md:px-10 mb-12 flex items-end justify-between gap-8 flex-wrap"
    >
      <div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-3">
          Alojamiento · 23 habitaciones
        </div>
        <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] leading-[1.05] text-[#1A1613] max-w-xl">
          Cada viaje<br />pide su espacio.
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

function Rooms({ t }) {
  const grid = (t.roomsLayout || 'Scroll horizontal') === 'Grilla';
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false); // autoplay listo: sección en vista + scroll detenido

  useEffect(() => {
    if (grid) return;
    const el = scrollRef.current;
    if (!el) return;
    let idleTimer = null;
    const sectionInView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      return r.top < vh * 0.8 && r.bottom > vh * 0.2;
    };
    const computeActive = () => {
      const max = el.scrollWidth - el.clientWidth;
      const pct = max > 0 ? el.scrollLeft / max : 0;
      setProgress(pct);
      setCurrent(Math.min(ROOMS.length, Math.round(pct * (ROOMS.length - 1)) + 1));
      const track = el.firstElementChild;
      if (track) {
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0, bestDist = Infinity;
        Array.from(track.children).forEach((child, idx) => {
          const c = child.offsetLeft + child.offsetWidth / 2;
          const dist = Math.abs(c - center);
          if (dist < bestDist) { bestDist = dist; best = idx; }
        });
        setActiveIndex(best);
      }
    };
    const onScroll = () => {
      computeActive();
      setReady(false); // cualquier scroll (vertical u horizontal) frena el autoplay
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { setReady(sectionInView()); }, 1100);
    };
    el.addEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [grid]);

  useEffect(() => {
    if (grid) return;
    const el = scrollRef.current;
    if (!el) return;
    let down = false, sx = 0, sl = 0;
    const onDown = (e) => { down = true; sx = e.pageX; sl = el.scrollLeft; el.classList.add('fh-cursor-grabbing'); };
    const onUp = () => { down = false; el.classList.remove('fh-cursor-grabbing'); };
    const onMove = (e) => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - sx) * 1.4; };
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, [grid]);

  const scrollBy = (dir) => scrollRef.current?.scrollBy({ left: dir * (CARD_WIDTH + GAP), behavior: 'smooth' });

  if (grid) {
    return (
      <section id="habitaciones" className="py-24 md:py-32">
        <RoomsHeader />
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROOMS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="relative h-[600px] lg:h-[700px] rounded-2xl overflow-hidden group transition-transform duration-500 ease-out hover:-translate-y-1 lg:hover:-translate-y-2 lg:hover:scale-[1.045] lg:hover:z-20"
            >
              <RoomCardContent r={r} i={i} total={ROOMS.length} cardActive={true} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="habitaciones" className="py-24 md:py-32 overflow-hidden">
      <RoomsHeader>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            disabled={progress <= 0.01}
            className="w-11 h-11 rounded-full border border-black/20 hover:border-[var(--accent)] hover:bg-[var(--accent-tint)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            aria-label="Anterior"
          >
            <Icon name="ArrowLeft" size={14} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={progress >= 0.99}
            className="w-11 h-11 rounded-full border border-black/20 hover:border-[var(--accent)] hover:bg-[var(--accent-tint)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            aria-label="Siguiente"
          >
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </RoomsHeader>

      <div
        ref={scrollRef}
        className="no-scrollbar overflow-x-auto px-10 pt-6 pb-8 fh-cursor-grab"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex gap-5 w-max">
          {ROOMS.map((r, i) => (
            <div
              key={r.name}
              className="relative w-[80vw] sm:w-[460px] h-[580px] sm:h-[680px] rounded-2xl overflow-hidden flex-shrink-0 group transition-transform duration-500 ease-out hover:-translate-y-1 lg:hover:-translate-y-2 lg:hover:scale-[1.045] lg:hover:z-20"
              style={{ scrollSnapAlign: 'center' }}
            >
              <RoomCardContent r={r} i={i} total={ROOMS.length} cardActive={i === activeIndex} ready={ready} />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-6 flex items-center gap-4">
        <span className="text-[11px] tracking-[0.2em] uppercase text-black/45 tabular-nums">
          {String(current).padStart(2, '0')} / 0{ROOMS.length}
        </span>
        <div className="flex-1 h-px bg-black/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[var(--accent)] transition-all duration-300"
            style={{ width: `${Math.max(16, progress * 84 + 16)}%` }}
          />
        </div>
        <span className="text-[11px] tracking-[0.2em] uppercase text-black/45 hidden md:inline">Deslizá →</span>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Rooms });
