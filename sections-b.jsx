/* ===== Secciones B: Services, Story, Reviews ===== */
const { useRef, useEffect } = React;
const Icon = window.Icon;

/* ===================== SERVICES ===================== */
function Services() {
  const featured = [
    { icon: 'Coffee', title: 'Desayuno Buffet', img: 'assets/comedor.jpeg', pos: '50% 60%', desc: 'El punto más elogiado por nuestros huéspedes. Insumos frescos, porciones abundantes y huevos revueltos a pedido para garantizar temperatura. Una manera correcta de empezar el día.' },
    { icon: 'Car', title: 'Cochera Cubierta', img: 'assets/cochera.jpeg', pos: '50% 55%', desc: 'Estacionamiento privado techado, gratuito y sin reserva previa. Tu vehículo seguro dentro del predio cerrado mientras descansás. Fundamental si viajás por la RN9 cargado de equipaje o equipos.' },
  ];

  return (
    <section id="servicios" className="py-24 md:py-32 px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-3">Servicios · Todo incluido</div>
        <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] leading-[1.1] text-black mb-3">
          Pensado para<br />que no te falte nada.
        </h2>
        <p className="text-[15px] text-black/55 leading-relaxed">
          Sin sorpresas al hacer check-out. Los servicios que más importan están incluidos en tu estadía.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5 mb-5">
        {featured.map((f) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-cover group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${f.img})`, backgroundPosition: f.pos }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#14110D]/20 via-[#14110D]/35 to-[#14110D]/96" />
            <div className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/20 bg-black/25 backdrop-blur flex items-center justify-center text-white">
              <Icon name={f.icon} size={18} strokeWidth={1.5} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
              <span className="inline-block whitespace-nowrap text-[10px] tracking-[0.22em] uppercase text-[var(--accent)] border border-[var(--accent-bd)] bg-[var(--accent-tint)] px-3 py-1 rounded-full mb-4">
                Destacado · Incluido
              </span>
              <h3 className="font-serif text-white text-3xl leading-tight mb-2">{f.title}</h3>
              <p className="text-[14px] text-white/75 leading-relaxed max-w-[92%]">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 border border-black/5 rounded-2xl overflow-hidden"
      >
        {AMENITIES.map((a) => (
          <div key={a.name} className="bg-white hover:bg-[#F2EEE8] transition-colors p-7">
            <Icon name={a.icon} size={22} strokeWidth={1.3} className="text-black/85 mb-5" />
            <h4 className="font-serif text-black text-base mb-1.5">{a.name}</h4>
            <p className="text-[12px] text-black/50 leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mt-12 p-8 md:p-10 rounded-2xl border border-[var(--accent-bd-soft)] grid md:grid-cols-[1fr_2fr] gap-10 items-center"
        style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.07) 0%, rgba(255,255,255,0.02) 100%)' }}
      >
        <div className="md:border-r md:border-black/10 md:pr-10">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-3">Para empresas</div>
          <h3 className="font-serif text-black text-2xl leading-tight mb-3">Ventajas corporativas.</h3>
          <p className="text-[13px] text-black/55 leading-relaxed">
            Pensado para el sector agroindustrial, ejecutivos en gira y comitivas internacionales que llegan al polo metalmecánico de Armstrong.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {CORPORATE.map((c) => (
            <div key={c.title} className="flex gap-3 items-start">
              <Icon name={c.icon} size={20} strokeWidth={1.5} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[13px] text-black font-medium mb-1">{c.title}</div>
                <p className="text-[11.5px] text-black/50 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ===================== STORY ===================== */
function Story() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  itemsRef.current = [];
  const addItem = (el) => { if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el); };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = null;
    const update = () => {
      raf = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      let progress = total > 0 ? (-rect.top) / total : 0;
      progress = Math.max(0, Math.min(1, progress));
      const items = itemsRef.current;
      items.forEach((el, idx) => {
        const start = idx * 0.135;
        const span = 0.32;
        let lp = (progress - start) / span;
        lp = Math.max(0, Math.min(1, lp));
        const e = 1 - Math.pow(1 - lp, 3); // easeOutCubic
        const rot = (1 - e) * 82;          // 82deg -> 0  (wheel turning up)
        const ty = (1 - e) * 64;           // rises from below
        el.style.opacity = String(Math.max(0, Math.min(1, e * 1.05)));
        el.style.transform = 'translateY(' + ty.toFixed(1) + 'px) rotateX(' + rot.toFixed(1) + 'deg)';
      });
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const itemStyle = {
    transformOrigin: '50% 100%',
    transformStyle: 'preserve-3d',
    willChange: 'transform, opacity',
    opacity: 0,
    backfaceVisibility: 'hidden',
  };

  const scrim =
    'linear-gradient(to right, rgba(20,17,13,0.95) 0%, rgba(20,17,13,0.86) 36%, rgba(20,17,13,0.5) 70%, rgba(20,17,13,0.32) 100%), ' +
    'linear-gradient(to bottom, rgba(20,17,13,0.55) 0%, rgba(20,17,13,0.15) 30%, rgba(20,17,13,0.15) 65%, rgba(20,17,13,0.6) 100%)';

  return (
    <section id="historia" ref={sectionRef} className="relative" style={{ height: '165vh' }} data-screen-label="Historia">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url(assets/historia-lobby.jpeg)', backgroundPosition: '60% 32%' }}
        />
        <div className="absolute inset-0" style={{ background: scrim }} />

        <div
          className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center pt-8 md:pt-0"
          style={{ perspective: '1100px' }}
        >
          <div className="max-w-2xl">
            <div ref={addItem} style={itemStyle} className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[var(--accent)] mb-3 md:mb-6">
              Nuestra historia
            </div>

            <h2 ref={addItem} style={itemStyle} className="font-serif text-[clamp(1.9rem,7vw,4.4rem)] leading-[1.04] text-white tracking-tight mb-4 md:mb-8">
              Diez años<br /><em className="italic text-[var(--accent)]">fabricando</em> descanso.
            </h2>

            <p ref={addItem} style={itemStyle} className="text-[13.5px] md:text-[17px] leading-[1.6] md:leading-[1.8] text-white/80 max-w-xl mb-5 md:mb-10">
              En el corazón de Armstrong, un edificio de hormigón crudo y acero se transformó en refugio. Cada textura y cada línea limpia es un tributo a los galpones y las líneas de ensamblaje que forjaron la riqueza de esta tierra.
              <span className="block mt-2.5 md:mt-4 text-white/80">
                El cronista local Delmo Daró registró durante décadas la transformación de Armstrong: de pueblo agrícola a polo metalmecánico exportador. Fábrica Hotel es, en parte, hijo de esas crónicas.
              </span>
            </p>

            <blockquote ref={addItem} style={itemStyle} className="pl-5 md:pl-7 border-l-2 border-[var(--accent)] mb-5 md:mb-12 max-w-xl">
              <p className="font-serif italic text-white text-[clamp(1.2rem,4.5vw,2.05rem)] leading-[1.3] tracking-tight">
                Una era de trabajo y progreso empezó a dibujar el horizonte del pueblo.
              </p>
              <cite className="not-italic block mt-3 md:mt-5 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/55">
                — Delmo Daró, cronista de Armstrong
              </cite>
            </blockquote>

            <div ref={addItem} style={itemStyle} className="flex gap-7 sm:gap-14">
              {[
                { num: '10+', label: 'Años de\ntrayectoria' },
                { num: '23', label: 'Habitaciones\nboutique' },
                { num: '9.1', label: 'Calificación\npromedio' },
              ].map((st) => (
                <div key={st.num}>
                  <div className="font-serif text-[var(--accent)] text-[2rem] md:text-[2.6rem] font-medium leading-none">{st.num}</div>
                  <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/55 mt-2 md:mt-3 whitespace-pre-line leading-snug">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.35em] uppercase text-white/40">2016 — hoy</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent scroll-line-anim" />
        </div>
      </div>
    </section>
  );
}

/* ===================== REVIEWS ===================== */
function ReviewCard({ r }) {
  return (
    <div className="w-[340px] flex-shrink-0 p-6 border border-black/8 rounded-xl liquid-glass">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0" style={{ background: r.color }}>
          {r.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-black font-medium leading-tight">{r.name}</div>
          <div className="text-[9.5px] text-black/45 tracking-[0.15em] uppercase mt-1">{r.tipo}</div>
        </div>
        <div className="font-serif text-[var(--accent)] text-base font-medium">{r.score.toFixed(1)}</div>
      </div>
      <p className="text-[13px] text-black/70 leading-[1.7] italic">
        <span className="font-serif text-[var(--accent)] text-[1.4rem] leading-[0] align-[-0.4rem] mr-1">“</span>
        {r.text}
      </p>
    </div>
  );
}

function Reviews({ t }) {
  const grid = (t.reviewsLayout || 'Marquee') === 'Grilla estática';
  const all = [...REVIEWS_TOP, ...REVIEWS_BOTTOM];

  return (
    <section id="resenas" className="py-24 md:py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-12 px-6"
      >
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-3">Lo que dicen los huéspedes</div>
        <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] leading-[1.1] text-black">
          La reputación<br />no se improvisa.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center px-6 mb-16"
      >
        <div className="relative inline-block">
          <span className="font-serif text-[var(--accent)] text-[7rem] font-normal leading-none">9.1</span>
          <span className="absolute bottom-4 -right-12 text-[15px] text-black/30 tracking-wider">/ 10</span>
        </div>
        <div className="font-serif italic text-black/75 text-xl mt-2">Fantástico</div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-black/55 mt-3">Basado en +741 opiniones verificadas</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6 mt-12 text-left">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] tracking-[0.18em] uppercase text-black/50">{c.label}</span>
                <span className="font-serif text-black text-base font-medium">{c.score.toFixed(1)}</span>
              </div>
              <div className="h-0.5 bg-black/10 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${c.score * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {grid ? (
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {all.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="w-full"
            >
              <div className="w-full p-6 border border-black/8 rounded-xl liquid-glass h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0" style={{ background: r.color }}>{r.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-black font-medium leading-tight">{r.name}</div>
                    <div className="text-[9.5px] text-black/45 tracking-[0.15em] uppercase mt-1">{r.tipo}</div>
                  </div>
                  <div className="font-serif text-[var(--accent)] text-base font-medium">{r.score.toFixed(1)}</div>
                </div>
                <p className="text-[13px] text-black/70 leading-[1.7] italic">
                  <span className="font-serif text-[var(--accent)] text-[1.4rem] leading-[0] align-[-0.4rem] mr-1">“</span>
                  {r.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-32 bg-gradient-to-r from-[#FBF9F6] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-32 bg-gradient-to-l from-[#FBF9F6] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden py-2 marquee-pause">
            <div className="flex gap-5 w-max marquee-r">
              {[...REVIEWS_TOP, ...REVIEWS_TOP].map((r, i) => <ReviewCard key={'t' + i} r={r} />)}
            </div>
          </div>
          <div className="overflow-hidden py-2 mt-5 marquee-pause">
            <div className="flex gap-5 w-max marquee-l">
              {[...REVIEWS_BOTTOM, ...REVIEWS_BOTTOM].map((r, i) => <ReviewCard key={'b' + i} r={r} />)}
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-12 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/55">
          Opiniones verificadas en <span className="text-black/75 font-medium">Booking</span> <span className="text-[var(--accent)]">·</span> <span className="text-black/75 font-medium">Google</span> <span className="text-[var(--accent)]">·</span> <span className="text-black/75 font-medium">HotelVIP</span>
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { Services, Story, Reviews });
