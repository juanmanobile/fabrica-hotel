/* ===== Secciones C: Location, Cta, Footer ===== */
const { useState, useMemo, useEffect } = React;
const Icon = window.Icon;

/* ===================== LOCATION ===================== */
function Location() {
  return (
    <section id="ubicacion" className="py-24 md:py-32 px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-3">Ubicación · Ruta Nacional 9</div>
        <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] leading-[1.1] text-black mb-3">
          En el centro exacto<br />entre dos capitales.
        </h2>
        <p className="text-[15px] text-black/55 leading-relaxed max-w-xl mx-auto">
          Sobre la principal arteria que conecta Buenos Aires con Córdoba, en el corazón del polo metalmecánico de Armstrong, Santa Fe.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="relative h-[420px] lg:h-[680px] rounded-2xl overflow-hidden border border-black/8"
        >
          <iframe
            src={HOTEL.mapsEmbed}
            title="Mapa Fábrica Hotel"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
            style={{ filter: 'grayscale(0.2) contrast(1.02)' }}
          />
          <div className="absolute top-5 left-5 bg-[#14110D]/85 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 z-10 pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" style={{ boxShadow: '0 0 0 4px var(--accent-glow)' }} />
            <div className="text-[12px] leading-tight">
              <div className="text-white font-medium">Fábrica Hotel</div>
              <div className="text-white/55 text-[10px] tracking-[0.1em] mt-0.5">ARMSTRONG, SF</div>
            </div>
          </div>
          <a
            href={HOTEL.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[10px] tracking-[0.2em] uppercase font-medium px-5 py-2.5 rounded-full inline-flex items-center gap-2 z-10 transition-colors"
          >
            Cómo llegar
            <Icon name="ArrowUpRight" size={11} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="flex flex-col gap-5"
        >
          <div className="p-6 rounded-2xl border border-black/8 bg-black/[0.025]">
            <div className="text-[9px] tracking-[0.3em] uppercase text-[var(--accent)] mb-2">Dirección</div>
            <div className="font-serif text-black text-lg mb-1">{HOTEL.address1}</div>
            <div className="text-[13px] text-black/50 leading-relaxed">{HOTEL.address2}</div>
          </div>

          <div className="p-6 rounded-2xl border border-black/8 bg-black/[0.025]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-black/50 mb-5">Sobre la RN9</div>
            <div className="relative">
              {STOPS.map((s, i) => (
                <div key={s.name} className="grid grid-cols-[24px_1fr_auto] items-center gap-4 py-3 relative">
                  <div className="relative z-10 flex justify-center">
                    {s.active ? (
                      <div className="w-3 h-3 rounded-full bg-[var(--accent)]" style={{ boxShadow: '0 0 0 4px var(--accent-glow)' }} />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-black/20 border border-black/30" />
                    )}
                    {i < STOPS.length - 1 && (
                      <div className="absolute top-1/2 left-1/2 w-px h-[150%] bg-black/12 -translate-x-1/2 z-0" />
                    )}
                  </div>
                  <div className={s.active ? 'font-serif text-black text-[15px] font-medium' : 'text-[14px] text-black/60'}>{s.name}</div>
                  <div className={'text-[11px] tabular-nums tracking-[0.08em] ' + (s.active ? 'text-[var(--accent)]' : 'text-black/40')}>{s.km}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-black/8 bg-black/[0.025]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-black/50 mb-5">A pocos minutos</div>
            <div className="flex flex-col">
              {POINTS.map((p, i) => (
                <div key={p.name} className={'flex items-center gap-4 py-2.5 ' + (i < POINTS.length - 1 ? 'border-b border-black/5' : '')}>
                  <span className="font-serif text-[var(--accent)] text-base font-medium min-w-[68px] tabular-nums">{p.time}</span>
                  <span className="text-[13px] text-black/70 leading-snug">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== CTA WHATSAPP ===================== */
const CTA_ROOMS = ['Consulta general', 'Single', 'Doble Twin', 'Doble Matrimonial', 'Triple', 'Familiar', 'Suite'];

function buildMessage(room) {
  if (room === 'Consulta general') return 'Hola, quisiera consultar disponibilidad en Fábrica Hotel. ¡Gracias!';
  return `Hola, quisiera reservar una habitación ${room} en Fábrica Hotel. ¿Me confirmás disponibilidad y tarifa? ¡Gracias!`;
}

function Cta() {
  const [selected, setSelected] = useState('Consulta general');
  const message = useMemo(() => buildMessage(selected), [selected]);
  const waUrl = `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const onSelect = (e) => {
      const name = e.detail;
      if (CTA_ROOMS.includes(name)) setSelected(name);
    };
    window.addEventListener('fh-select-room', onSelect);
    return () => window.removeEventListener('fh-select-room', onSelect);
  }, []);

  return (
    <section id="reserva" className="py-24 md:py-32 px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-4">Reservas directas</div>
        <h2 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] tracking-tight text-black mb-5">
          Tu descanso,<br />a un mensaje.
        </h2>
        <p className="text-[15px] text-black/60 leading-relaxed max-w-xl mx-auto mb-10">
          Sin intermediarios ni comisiones. Hablá directamente con nuestra recepción y asegurate la mejor tarifa disponible para tu estadía.
        </p>

        <div className="mb-8">
          <div className="text-[10px] tracking-[0.3em] uppercase text-black/45 mb-4">¿Qué habitación te interesa?</div>
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {CTA_ROOMS.map((r) => (
              <button
                key={r}
                onClick={() => setSelected(r)}
                className={
                  'text-[12px] tracking-wide whitespace-nowrap px-4 py-2 rounded-full transition-all ' +
                  (selected === r
                    ? 'bg-[var(--accent)] border border-[var(--accent)] text-white'
                    : 'border border-black/15 bg-black/[0.02] text-black/70 hover:border-[var(--accent-bd)] hover:text-black')
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5a] hover:-translate-y-1 text-white px-10 py-4 rounded-full text-[13px] font-medium tracking-[0.12em] uppercase transition-all"
          style={{ boxShadow: '0 12px 40px rgba(37, 211, 102, 0.3)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Reservar por WhatsApp
        </a>

        <div className="text-[10px] tracking-[0.25em] uppercase text-black/35 mt-5">Respuesta inmediata · Recepción 24 hs</div>

        <div className="mt-8 mx-auto max-w-md px-5 py-4 border border-dashed border-black/12 rounded-xl text-left">
          <div className="text-[9px] tracking-[0.3em] uppercase text-black/30 mb-2">Mensaje a enviar</div>
          <p className="text-[13px] text-black/55 leading-relaxed italic">{message}</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  const links = [
    { href: '#historia', label: 'Historia' },
    { href: '#habitaciones', label: 'Habitaciones' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#resenas', label: 'Reseñas' },
    { href: '#ubicacion', label: 'Ubicación' },
    { href: '#reserva', label: 'Reservar' },
  ];
  return (
    <footer className="pt-16 pb-10 px-6 md:px-10 border-t border-black/10 bg-black/[0.035]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-12 mb-12">
        <div>
          <div className="font-serif text-[var(--accent)] text-3xl font-medium leading-none tracking-tight">fábrica<br />hotel</div>
          <div className="text-[var(--accent)] text-[11px] tracking-[0.25em] mt-2">★ ★ ★ ★</div>
          <p className="font-serif italic text-black/55 text-[15px] leading-snug mt-4 max-w-[240px]">10 años fabricando descanso.</p>
          <div className="flex gap-2 mt-6">
            <a href={HOTEL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 border border-black/12 rounded-full flex items-center justify-center text-black/60 hover:text-[var(--accent)] hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all">
              <Icon name="Instagram" size={16} strokeWidth={1.5} />
            </a>
            <a href={HOTEL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 border border-black/12 rounded-full flex items-center justify-center text-black/60 hover:text-[var(--accent)] hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all">
              <Icon name="Facebook" size={16} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-black/35 mb-5">Contacto</div>
          <div className="text-[13px] text-black/85 font-medium mb-1">WhatsApp</div>
          <a href={`https://wa.me/${HOTEL.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block text-[13px] text-black/60 hover:text-[var(--accent)] mb-3 transition-colors">{HOTEL.whatsappDisplay}</a>
          <div className="text-[13px] text-black/85 font-medium mb-1">Teléfono fijo</div>
          <a href="tel:+543471462999" className="block text-[13px] text-black/60 hover:text-[var(--accent)] transition-colors">03471 462999</a>
          <a href="tel:+543471463329" className="block text-[13px] text-black/60 hover:text-[var(--accent)] mb-3 transition-colors">03471 463329</a>
          <div className="text-[13px] text-black/85 font-medium mb-1">Email</div>
          <a href={`mailto:${HOTEL.email}`} className="block text-[13px] text-black/60 hover:text-[var(--accent)] transition-colors">{HOTEL.email}</a>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-black/35 mb-5">Dirección</div>
          <p className="text-[13px] text-black/60 leading-relaxed mb-1">Juan B. Alberdi 1979</p>
          <p className="text-[13px] text-black/60 leading-relaxed mb-1">Armstrong (S2508)</p>
          <p className="text-[13px] text-black/60 leading-relaxed mb-3">Santa Fe · Argentina</p>
          <p className="text-[12px] text-black/40 leading-relaxed">Sobre Ruta Nacional 9</p>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-black/35 mb-5">Navegación</div>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block text-[13px] text-black/60 hover:text-[var(--accent)] mb-1.5 transition-colors">{l.label}</a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-black/5 flex justify-between items-center flex-wrap gap-4">
        <div className="text-[10px] tracking-[0.2em] uppercase text-black/25">© {new Date().getFullYear()} Fábrica Hotel · Todos los derechos reservados</div>
        <div className="font-serif italic text-black/30 text-sm">Armstrong, Santa Fe · Argentina</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Location, Cta, Footer });
