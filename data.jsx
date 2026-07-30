/* ===== Shared data for Fábrica Hotel ===== */

const ROOMS = [
  {
    name: 'Single',
    spec: 'Para quien viaja solo',
    meta: '1 persona',
    desc: 'Pensada para el viajero solitario: representante, transportista o turista en ruta. Funcionalidad pura, descanso garantizado, sin sobrar metros.',
    tags: ['Minibar', 'Escritorio', 'AC', 'TV', 'WiFi'],
    img: 'assets/room-single.jpeg',
    gallery: ['assets/room-single.jpeg', 'assets/bano-1.jpeg', 'assets/bano-2.jpeg'],
    pos: '50% 60%',
  },
  {
    name: 'Doble Twin',
    spec: 'Dos camas separadas',
    meta: '2 personas',
    desc: 'Ideal para colegas en viaje de trabajo o amigos en tránsito. Dos camas individuales independientes con todo el confort de una doble.',
    tags: ['Minibar', 'Caja fuerte', 'AC individual', 'TV', 'WiFi'],
    img: 'assets/room-doble-single.jpeg',
    gallery: ['assets/room-doble-single.jpeg', 'assets/bano-1.jpeg', 'assets/bano-2.jpeg'],
    pos: '50% 55%',
  },
  {
    name: 'Doble Matrimonial',
    spec: 'Cama doble · Parejas',
    meta: '2 personas',
    desc: 'El descanso compartido en su versión más cómoda. Cama matrimonial amplia, vistas al jardín o piscina, y la insonorización que aísla todo lo demás.',
    tags: ['Minibar', 'Caja fuerte', 'AC individual', 'TV', 'WiFi'],
    img: 'assets/room-matrimonial.jpeg',
    gallery: ['assets/room-matrimonial.jpeg', 'assets/bano-1.jpeg', 'assets/bano-2.jpeg'],
    pos: '50% 55%',
  },
  {
    name: 'Triple',
    spec: 'Tres camas individuales',
    meta: '3 personas',
    desc: 'Para pequeños grupos de trabajo o familias compactas. Tres camas individuales con vistas panorámicas al jardín y la piscina.',
    tags: ['Minibar', '3 camas', 'AC individual', 'TV', 'WiFi'],
    img: 'assets/room-triple.jpeg',
    gallery: ['assets/room-triple.jpeg', 'assets/bano-1.jpeg', 'assets/bano-2.jpeg'],
    pos: '50% 60%',
  },
  {
    name: 'Familiar',
    spec: 'Dos ambientes conectados',
    meta: '4 personas',
    desc: 'Dos habitaciones unidas por una puerta interna: amplitud y privacidad para cada grupo sin resignar cercanía. Pensada para familias que recorren la RN9.',
    tags: ['Dos ambientes', 'Cama extra', 'Minibar', 'AC', 'WiFi'],
    img: 'assets/familiar-1.jpeg',
    gallery: ['assets/familiar-1.jpeg', 'assets/familiar-2.jpeg', 'assets/bano-2.jpeg'],
    pos: '50% 55%',
  },
  {
    name: 'Suite',
    spec: 'Hidromasaje · King Size',
    meta: '2 personas · King',
    desc: 'Hidromasaje privado, zona de estar independiente y cama King. Una de las dos suites suma una barra desayunadora con banquetas, ideal para estadías prolongadas.',
    tags: ['Hidromasaje', 'Zona de estar', 'King Size', 'Barra desayunadora', 'WiFi'],
    img: 'assets/room-suite.jpeg',
    gallery: ['assets/room-suite.jpeg', 'assets/suite-estar.jpeg', 'assets/suite-bar.jpeg', 'assets/suite-bano.jpeg'],
    pos: '50% 55%',
  },
];

const AMENITIES = [
  { icon: 'Waves', name: 'Piscina', desc: 'Piscina al aire libre. El oasis que rompe con la ruta tras una larga jornada.' },
  { icon: 'Dumbbell', name: 'Gimnasio', desc: 'Equipamiento completo de cardio y fuerza. Tu rutina no se interrumpe.' },
  { icon: 'Bath', name: 'Hidromasaje', desc: 'Bañeras de hidromasaje para la recuperación tras la ruta o la jornada.' },
  { icon: 'Bike', name: 'Bicicletas', desc: 'Flota gratuita para explorar el centro de Armstrong, a menos de 2 km.' },
  { icon: 'Clock', name: 'Recepción 24 hs', desc: 'Atención ininterrumpida. Check-in desde 14 hs hasta medianoche.' },
  { icon: 'Trees', name: 'Espacio verde', desc: 'Predio parquizado con amplios jardines para descansar y relajarse al aire libre.' },
  { icon: 'Users', name: 'SUM', desc: 'Salón de Usos Múltiples disponible para eventos, reuniones y celebraciones.' },
  { icon: 'Wifi', name: 'WiFi de alta velocidad', desc: 'Conectividad estable en todo el predio. Videollamadas sin cortes.' },
];

const CORPORATE = [
  { icon: 'Receipt', title: 'Exención de IVA', desc: 'Para huéspedes extranjeros no residentes. Trámite gestionado por el hotel.' },
  { icon: 'Briefcase', title: 'Sala de reuniones', desc: 'Último piso, tecnología audiovisual. Cierres y presentaciones.' },
  { icon: 'FileText', title: 'Factura a empresa', desc: 'Convenios anuales disponibles. Facturación electrónica al instante.' },
  { icon: 'CheckCircle', title: 'Check-in flexible', desc: 'Desde 14 hs hasta medianoche, sin recargos por llegada tarde.' },
  { icon: 'Users', title: 'Comitivas y grupos', desc: 'Reservas múltiples para delegaciones que visitan las fábricas.' },
  { icon: 'Lock', title: 'Caja fuerte en cada cuarto', desc: 'Documentación, equipos y valores siempre seguros.' },
];

const CATEGORIES = [
  { label: 'Personal', score: 9.7 },
  { label: 'Limpieza', score: 9.5 },
  { label: 'Confort', score: 9.3 },
  { label: 'Calidad/Precio', score: 9.3 },
  { label: 'Ubicación', score: 9.1 },
  { label: 'Instalaciones', score: 9.0 },
  { label: 'WiFi', score: 8.8 },
];

const REVIEWS_TOP = [
  { name: 'Luna', tipo: 'Familia · BsAs → Córdoba', score: 9.4, color: '#E8601A', initials: 'Lu', text: 'Llegamos de madrugada con los chicos dormidos en el auto. El recibimiento fue impecable, la habitación lista, y a la mañana siguiente el desayuno fue otra cosa. Una joya en la ruta.' },
  { name: 'Troiano', tipo: 'Negocios · Agroindustria', score: 9.6, color: '#4A90A4', initials: 'Tr', text: 'Vengo seguido a Armstrong por las fábricas. La sala de reuniones de arriba es perfecta, el WiFi banca videollamadas sin cortes y la cochera cubre la camioneta de la empresa. Lo elijo siempre.' },
  { name: 'Analía', tipo: 'Viajera sola · Comercial', score: 9.3, color: '#7B5EA7', initials: 'An', text: 'Lo que más me sorprendió fueron los enchufes: hay en todas las paredes. Para alguien que viaja con laptop, cámara y celular, ese detalle vale oro. El nivel de diseño no lo esperaba en Armstrong.' },
  { name: 'Gabriel', tipo: 'Grupo de amigos · Evento', score: 9.5, color: '#3A7A5A', initials: 'Ga', text: 'Fuimos durante un evento agro grande. El hotel tenía todo organizado, el personal anticipaba cada cosa. La pileta después de una jornada larga fue el cierre ideal. Volvemos el año que viene seguro.' },
  { name: 'María', tipo: 'Pareja · Escapada de finde', score: 9.2, color: '#8B6914', initials: 'Ma', text: 'La estética del lugar nos sorprendió. Es ese diseño que no esperás en una localidad del interior. La habitación amplísima, todo impecable. El desayuno: excelente.' },
];

const REVIEWS_BOTTOM = [
  { name: 'Ramírez', tipo: 'Viajero frecuente · Ruta', score: 9.0, color: '#A04040', initials: 'Ra', text: 'Mi único punto negativo: la estadía se hizo demasiado corta. Antes de poder disfrutar bien la piscina y el gimnasio, ya era hora de seguir viaje. La próxima me quedo dos noches.' },
  { name: 'Bautista', tipo: 'Turista · Tránsito', score: 9.3, color: '#5B7BA8', initials: 'Ba', text: 'Pagás más que un motel común, pero entendés el porqué apenas entrás. La cochera cubierta, el desayuno, la piscina: el valor de todo lo que incluye justifica la diferencia.' },
  { name: 'Julio', tipo: 'Familia · Vacaciones', score: 9.4, color: '#6B4A8A', initials: 'Ju', text: 'Tres días con dos chicos. El club infantil fue clave: pudimos disfrutar la pileta tranquilos sabiendo que estaban entretenidos. El personal es lo mejor del lugar, sin dudas.' },
  { name: 'Lezcano', tipo: 'Negocios · Ingeniero', score: 9.5, color: '#2E6B5C', initials: 'Le', text: 'Llegué tarde después de un día largo en la planta. Check-in fluido a las 23, la cochera me esperaba, y una ducha con buena presión que parece tonta pero hace una diferencia enorme.' },
  { name: 'Ayelén', tipo: 'Pareja · Aniversario', score: 9.7, color: '#9C5631', initials: 'Ay', text: 'Reservamos la suite con hidromasaje para festejar. Atención al detalle desde el momento del check-in. Es un boutique en medio de la ruta. Difícil de creer hasta que lo vivís.' },
];

const STOPS = [
  { name: 'Buenos Aires', km: '400 km', active: false },
  { name: 'Rosario', km: '90 km', active: false },
  { name: 'Fábrica Hotel', km: '— Armstrong', active: true },
  { name: 'Córdoba', km: '300 km', active: false },
];

const POINTS = [
  { time: '5 min', name: 'Polo metalmecánico de Armstrong' },
  { time: '2 km', name: 'Centro cívico de Armstrong' },
  { time: '2 min', name: 'Terminal de ómnibus local' },
  { time: 'Acceso', name: 'Directo desde RN9, sin desvíos' },
];

/* ===== Contact / brand constants ===== */
const HOTEL = {
  whatsapp: '5493471688858',
  whatsappDisplay: '+54 9 3471 68-8858',
  email: 'fabricahotel@gmail.com',
  instagram: 'https://instagram.com/fabricahotel',
  facebook: 'https://facebook.com/fabricahotel',
  address1: 'Juan B. Alberdi 1979',
  address2: 'Armstrong (S2508), Santa Fe · Argentina',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-32.7737114,-61.6057301',
  mapsEmbed: 'https://maps.google.com/maps?q=-32.7737114,-61.6057301&z=16&output=embed',
};

/* ===== Color palettes for the Tweaks panel =====
   Each: accent, accentHover, rgb (for glows). Background stays the warm dark. */
const PALETTES = {
  'Naranja Industrial': { accent: '#E8601A', hover: '#F07030', rgb: '232, 96, 26' },
  'Acero Frío':         { accent: '#5B92B0', hover: '#74A9C6', rgb: '91, 146, 176' },
  'Bronce Cálido':      { accent: '#C8923B', hover: '#DDA94E', rgb: '200, 146, 59' },
  'Terracota':          { accent: '#C8553D', hover: '#DB6A52', rgb: '200, 85, 61' },
};

Object.assign(window, {
  ROOMS, AMENITIES, CORPORATE, CATEGORIES,
  REVIEWS_TOP, REVIEWS_BOTTOM, STOPS, POINTS,
  HOTEL, PALETTES,
});

