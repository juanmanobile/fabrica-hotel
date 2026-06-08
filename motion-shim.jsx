/* ===== Lightweight motion shim (replaces motion/react) ===== */
/* Exposes window.motion.<tag> components supporting:
   initial, animate, whileInView, transition {duration, delay}, viewport {once, margin}
   Honors a global animation profile set on window.__fhAnim = { distMul, durMul } */

(function () {
  const R = window.React;

  function animProfile() {
    return window.__fhAnim || { distMul: 1, durMul: 1 };
  }

  function buildTransform(o, distMul) {
    let t = '';
    if (o.x !== undefined) t += `translateX(${o.x * distMul}px) `;
    if (o.y !== undefined) t += `translateY(${o.y * distMul}px) `;
    if (o.scale !== undefined) t += `scale(${o.scale}) `;
    return t.trim() || 'none';
  }

  function makeComponent(tag) {
    return function MotionComponent(props) {
      const {
        initial, animate, whileInView, transition = {}, viewport = {},
        style = {}, className, children, ...rest
      } = props;

      const ref = R.useRef(null);
      const [shown, setShown] = R.useState(false);
      const prof = animProfile();

      R.useEffect(() => {
        if (whileInView) {
          const el = ref.current;
          if (!el) return;
          const io = new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  setShown(true);
                  if (viewport.once !== false) io.disconnect();
                } else if (viewport.once === false) {
                  setShown(false);
                }
              });
            },
            { rootMargin: viewport.margin || '0px' }
          );
          io.observe(el);
          return () => io.disconnect();
        }
        // animate immediately on mount — rAF for smoothness, setTimeout as a
        // fallback so the reveal still fires if rAF is throttled (background tab/iframe)
        const raf = requestAnimationFrame(() => setShown(true));
        const t = setTimeout(() => setShown(true), 60);
        return () => { cancelAnimationFrame(raf); clearTimeout(t); };
      }, []);

      const from = initial || {};
      const to = whileInView || animate || {};
      const target = shown ? to : from;

      const dur = (transition.duration ?? 0.6) * prof.durMul;
      const delay = (transition.delay ?? 0) * prof.durMul;

      const motionStyle = {
        opacity: target.opacity !== undefined ? target.opacity : 1,
        transform: buildTransform(target, prof.distMul),
        transition:
          `opacity ${dur}s ease ${delay}s, ` +
          `transform ${dur}s cubic-bezier(.22,.61,.36,1) ${delay}s`,
      };

      return R.createElement(
        tag,
        { ref, className, style: { ...style, ...motionStyle }, 'data-fh-reveal': '', ...rest },
        children
      );
    };
  }

  const cache = {};
  window.motion = new Proxy(
    {},
    {
      get(_, tag) {
        if (!cache[tag]) cache[tag] = makeComponent(tag);
        return cache[tag];
      },
    }
  );
})();
