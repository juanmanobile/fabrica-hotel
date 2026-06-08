/* ===== Inline lucide-style icons ===== */
/* <Icon name="Coffee" size={20} strokeWidth={1.5} className="..." /> */

(function () {
  const R = window.React;

  const PATHS = {
    ArrowDown: ['M12 5v14', 'm19 12-7 7-7-7'],
    ArrowLeft: ['m12 19-7-7 7-7', 'M19 12H5'],
    ArrowRight: ['M5 12h14', 'm12 5 7 7-7 7'],
    MoveRight: ['M18 8l4 4-4 4', 'M2 12h20'],
    ArrowUpRight: ['M7 7h10v10', 'M7 17 17 7'],
    Coffee: ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'],
    Car: ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M9 17h6'],
    Waves: ['M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1', 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1'],
    Bath: ['M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.7 3 4 3.7 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2', 'M10 5 8 7', 'M2 12h20', 'M7 19v2', 'M17 19v2'],
    Dumbbell: ['M14.4 14.4 9.6 9.6', 'M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z', 'm21.5 21.5-1.4-1.4', 'M3.9 3.9 2.5 2.5', 'M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z'],
    Clock: ['M12 6v6l4 2'],
    Trees: ['M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z', 'M7 16v6', 'M13 19v3', 'M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5'],
    Baby: ['M9 12h.01', 'M15 12h.01', 'M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5', 'M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5S14.5 8 13 8'],
    Wifi: ['M5 13a10 10 0 0 1 14 0', 'M8.5 16.5a5 5 0 0 1 7 0', 'M2 8.8a15 15 0 0 1 20 0', 'M12 20h.01'],
    Receipt: ['M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', 'M8 7h8', 'M8 11h8', 'M8 15h5'],
    Briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M2 9h20v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z'],
    FileText: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v5h5', 'M9 13h6', 'M9 17h6'],
    CheckCircle: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'm9 11 3 3L22 4'],
    Users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
    Lock: ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
    Instagram: ['M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', 'M17.5 6.5h.01'],
    Facebook: ['M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'],
    Phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z'],
    Mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2', 'm22 7-10 6L2 7'],
    MapPin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
    Menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
    X: ['M18 6 6 18', 'm6 6 12 12'],
  };

  const RECTS = {
    Briefcase: null,
    Instagram: { x: 2, y: 2, w: 20, h: 20, rx: 5 },
    Lock: null,
  };
  const CIRCLES = {
    Car: [{ cx: 7, cy: 17, r: 2 }, { cx: 17, cy: 17, r: 2 }],
    Clock: [{ cx: 12, cy: 12, r: 10 }],
    Bike: [{ cx: 5.5, cy: 17.5, r: 3.5 }, { cx: 18.5, cy: 17.5, r: 3.5 }, { cx: 15, cy: 5, r: 1 }],
  };
  // Bike needs an extra path
  PATHS.Bike = ['M12 17.5V14l-3-3 4-3 2 3h2'];

  function Icon(props) {
    const { name, size = 24, strokeWidth = 2, className, style, ...rest } = props;
    const paths = PATHS[name] || [];
    const circles = CIRCLES[name] || [];
    const rect = RECTS[name];

    const children = [];
    if (rect) {
      children.push(
        R.createElement('rect', {
          key: 'r', x: rect.x, y: rect.y, width: rect.w, height: rect.h, rx: rect.rx,
        })
      );
    }
    paths.forEach((d, i) => children.push(R.createElement('path', { key: 'p' + i, d })));
    circles.forEach((c, i) =>
      children.push(R.createElement('circle', { key: 'c' + i, cx: c.cx, cy: c.cy, r: c.r }))
    );

    return R.createElement(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className,
        style,
        ...rest,
      },
      children
    );
  }

  window.Icon = Icon;
})();
