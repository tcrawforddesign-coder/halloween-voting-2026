// Hero scene: friendly ghosts with curling tails drifting across a full moon,
// clouds, bats, a spooky treeline and rolling fog. Drawn on one canvas behind the hero.
(function () {
  const canvas = document.querySelector('.hero-canvas');
  const art = document.querySelector('.hero-art');
  if (!canvas || !art) return;
  const ctx = canvas.getContext('2d');
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;
  const rand = (a, b) => a + Math.random() * (b - a);

  let ground = 0, W = 0, H = 0, u = 1, mx = 0, my = 0, mr = 0, land, fog = [], clouds = [], visible = true;
  const ghosts = [
    { off: 0, sp: .042, y: -.35, h: 150, a: .95, tw: 1, ph: 0 },
    { off: .45, sp: .033, y: -.95, h: 100, a: .8, tw: 1.2, ph: 2.1 },
    { off: .85, sp: .052, y: .55, h: 122, a: .88, tw: .9, ph: 4.2 }
  ];
  const bats = Array.from({ length: 4 }, (_, i) => ({ off: i / 4, sp: rand(.03, .05), y: rand(.08, .45), amp: rand(.02, .05), s: rand(.6, 1.1), fl: rand(9, 14), ph: rand(0, TAU) }));

  // Soft haze: blobs kept inside the sprite, then blurred together so no puff shows a rim or edge.
  // Tiling sprites wrap horizontally so they repeat seamlessly.
  function softSprite(w, h, n, color, yMin, yMax, tile) {
    const pad = Math.round(h * .12);
    const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h; const t = tmp.getContext('2d');
    for (let i = 0; i < n; i++) {
      const r = rand(h * .12, h * .28);
      const y = Math.min(h - r - pad, Math.max(r + pad, rand(h * yMin, h * yMax)));
      const x = tile ? rand(0, w) : rand(r + pad, w - r - pad);
      for (const ox of tile ? [-w, 0, w] : [0]) {
        const g = t.createRadialGradient(x + ox, y, 0, x + ox, y, r);
        const a = parseFloat(color.match(/[\d.]+\)$/)[0]);
        const col = k => color.replace(/[\d.]+\)$/, (a * k).toFixed(3) + ')');
        g.addColorStop(0, col(1)); g.addColorStop(.35, col(.8)); g.addColorStop(.65, col(.35)); g.addColorStop(.85, col(.1)); g.addColorStop(1, col(0));
        t.fillStyle = g; t.fillRect(x + ox - r, y - r, r * 2, r * 2);
      }
    }
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const c = cv.getContext('2d');
    c.filter = `blur(${Math.round(h * .05)}px)`;
    for (const ox of tile ? [-w, 0, w] : [0]) c.drawImage(tmp, ox, 0);
    c.filter = 'none';
    return cv;
  }
  function tree(c, x, y, len, ang, w, depth) {
    if (depth === 0 || len < 2) return;
    const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    c.lineWidth = w; c.beginPath(); c.moveTo(x, y);
    c.quadraticCurveTo((x + x2) / 2 + rand(-len, len) * .2, (y + y2) / 2, x2, y2); c.stroke();
    const n = depth > 3 ? 2 : rand(1, 3) | 0;
    for (let i = 0; i < n + 1; i++) tree(c, x2, y2, len * rand(.6, .78), ang + rand(-.75, .75), w * .66, depth - 1);
  }

  function resize() {
    const cr = canvas.getBoundingClientRect(), ar = art.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cr.width; H = cr.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // the moon sits in the middle of the art column
    mx = ar.left - cr.left + ar.width / 2; my = ar.top - cr.top + ar.height * .42;
    mr = Math.min(ar.width, ar.height) * .34; u = mr / 175;
    ground = Math.min(H, ar.bottom - cr.top + 30 * u);
    // hills and trees, drawn once
    land = document.createElement('canvas'); land.width = W * dpr; land.height = H * dpr;
    const c = land.getContext('2d'); c.scale(dpr, dpr);
    // Rolling hills as smooth functions, so every tree can be planted exactly on the ground line
    const backHill = x => ground - 48 * u + Math.sin(x / W * 5.2 + .6) * 16 * u + Math.sin(x / W * 11.3 + 1.7) * 6 * u;
    const frontHill = x => ground + 2 * u + Math.sin(x / W * 3.4 + 2.2) * 12 * u + Math.sin(x / W * 8.1) * 4 * u;
    const fillHill = (fn, top, stops) => {
      const g = c.createLinearGradient(0, top, 0, H);
      stops.forEach(([o, col]) => g.addColorStop(o, col));
      c.fillStyle = g; c.beginPath(); c.moveTo(0, H);
      for (let x = 0; x <= W + 8; x += 8) c.lineTo(x, fn(x));
      c.lineTo(W, H); c.closePath(); c.fill();
    };
    fillHill(backHill, ground - 80 * u, [[0, '#1a1029'], [.5, '#160e24'], [1, 'rgba(20,14,31,0)']]);
    c.strokeStyle = '#0d0815'; c.lineCap = 'round';
    const left = ar.left - cr.left - 60 * u;
    for (let i = 0; i < 9; i++) {
      const x = rand(left, W), base = backHill(x) + 6 * u;   // trunk starts just inside the hill
      tree(c, x, base, rand(46, 76) * u, -Math.PI / 2 + rand(-.15, .15), rand(2, 3.5) * u, 6);
    }
    fillHill(frontHill, ground - 20 * u, [[0, '#0d0815'], [.45, '#130d1e'], [1, 'rgba(20,14,31,0)']]);
    const bx = Math.min(W - 30 * u, mx + mr * 1.9);
    tree(c, bx, frontHill(bx) + 10 * u, 160 * u, -Math.PI / 2 - .2, 9 * u, 8);
    fog = [softSprite(900, 260, 44, 'rgba(215,205,240,.13)', .3, .7, true), softSprite(900, 260, 40, 'rgba(215,205,240,.17)', .3, .7, true)];
    clouds = [0, 1, 2, 3].map(i => ({ img: softSprite(520, 180, 16, i % 2 ? 'rgba(80,60,120,.38)' : 'rgba(120,100,160,.3)', .35, .65, false), x: rand(0, 1), dy: rand(-1.2, .4), sp: rand(.006, .014), s: rand(.7, 1.2) }));
    if (REDUCE) draw(6);
  }

  function drawMoon() {
    const g = ctx.createRadialGradient(mx, my, mr * .8, mx, my, mr * 3.4);
    g.addColorStop(0, 'rgba(255,226,160,.32)'); g.addColorStop(.35, 'rgba(170,120,255,.14)'); g.addColorStop(1, 'rgba(170,120,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mx, my, mr * 3.4, 0, TAU); ctx.fill();
    const m = ctx.createRadialGradient(mx - mr * .3, my - mr * .3, mr * .1, mx, my, mr);
    m.addColorStop(0, '#fff8e2'); m.addColorStop(.65, '#f2dca8'); m.addColorStop(1, '#d6b679');
    ctx.fillStyle = m; ctx.beginPath(); ctx.arc(mx, my, mr, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(186,154,104,.35)';
    [[-.3, -.2, .16], [.28, .25, .22], [.32, -.32, .1], [-.1, .42, .12], [-.45, .2, .08]].forEach(([a, b, s]) => { ctx.beginPath(); ctx.arc(mx + a * mr, my + b * mr, s * mr, 0, TAU); ctx.fill(); });
  }
  function drawCloud(cl, t, front) {
    const w = 520 * cl.s * u * 2, h = 180 * cl.s * u * 2;
    const x = ((cl.x + t * cl.sp) % 1.4 - .2) * W;
    ctx.drawImage(cl.img, x - w / 2, my + mr * cl.dy + (front ? mr * .4 : 0), w, h);
  }
  function drawBat(x, y, s, flap, a) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    const k = Math.sin(flap); ctx.fillStyle = '#0a0710';
    for (const d of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(0, -2);
      ctx.quadraticCurveTo(d * 14, -10 - k * 10, d * 30, -4 - k * 18);
      ctx.quadraticCurveTo(d * 25, -k * 8, d * 22, 4 - k * 6);
      ctx.quadraticCurveTo(d * 17, 1 - k * 4, d * 13, 6 - k * 3);
      ctx.quadraticCurveTo(d * 9, 3, d * 5, 7); ctx.lineTo(0, 4); ctx.fill();
    }
    ctx.beginPath(); ctx.ellipse(0, 2, 4, 7, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(0, -5, 4, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-3, -7); ctx.lineTo(-2.5, -12); ctx.lineTo(0, -8); ctx.lineTo(2.5, -12); ctx.lineTo(3, -7); ctx.fill();
    ctx.restore();
  }
  // round head, body narrowing into one curling tail that fades away
  function drawGhost(x, y, h, t, alpha, tilt) {
    const w = h * .7, sw = Math.sin(t * 1.6) * .09, sw2 = Math.sin(t * 1.6 + 1.3) * .12;
    ctx.save(); ctx.translate(x, y); ctx.rotate(tilt); ctx.globalAlpha = alpha;
    const halo = ctx.createRadialGradient(0, -h * .1, 0, 0, -h * .1, h * .95);
    halo.addColorStop(0, 'rgba(206,224,250,.16)'); halo.addColorStop(.45, 'rgba(206,224,250,.07)'); halo.addColorStop(.75, 'rgba(206,224,250,.02)'); halo.addColorStop(1, 'rgba(206,224,250,0)');
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(0, -h * .1, h * .95, 0, TAU); ctx.fill();
    ctx.scale(w, h);
    const body = new Path2D();
    body.moveTo(-.42, .02);
    body.bezierCurveTo(-.47, -.32, -.28, -.56, 0, -.56);
    body.bezierCurveTo(.28, -.56, .47, -.32, .42, .02);
    body.bezierCurveTo(.41, .24, .34 + sw, .38, .24 + sw * 1.6, .52);
    body.bezierCurveTo(.14 + sw2 * 2, .66, .32 + sw2 * 2.4, .78, .46 + sw * 2.2, .86);
    body.quadraticCurveTo(.24 + sw2 * 2, .84, .1 + sw2 * 1.8, .7);
    body.quadraticCurveTo(-.02 + sw * 1.4, .56, -.2, .4);
    body.bezierCurveTo(-.36, .27, -.42, .17, -.42, .02);
    body.closePath();
    const g = ctx.createLinearGradient(0, -.56, 0, .86);
    g.addColorStop(0, 'rgba(255,255,255,.92)'); g.addColorStop(.42, 'rgba(238,245,255,.76)');
    g.addColorStop(.72, 'rgba(206,224,250,.34)'); g.addColorStop(1, 'rgba(180,202,236,0)');
    ctx.shadowColor = 'rgba(220,230,255,.6)'; ctx.shadowBlur = h * .12;
    ctx.fillStyle = g; ctx.fill(body); ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(12,12,20,.82)';
    ctx.beginPath(); ctx.ellipse(-.142, -.24, .053, .105, .06, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(.142, -.24, .053, .105, -.06, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(12,12,20,.5)';
    ctx.beginPath(); ctx.ellipse(0, -.01, .042, .072 + Math.sin(t * 2) * .01, 0, 0, TAU); ctx.fill();
    ctx.restore();
  }
  function fogBand(tex, y, h, offset, alpha) {
    const tw = h * tex.width / tex.height, off = ((offset * W) % tw + tw) % tw;
    ctx.globalAlpha = alpha;
    for (let x = -off; x < W; x += tw) ctx.drawImage(tex, x, y, tw, h);
    ctx.globalAlpha = 1;
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    drawMoon();
    clouds.slice(0, 2).forEach(cl => drawCloud(cl, t, false));
    for (const g of ghosts) {
      const k = ((t * g.sp + g.off) % 1.3) - .15;
      const x = W * (1.05 - k), y = my + mr * g.y + Math.sin(t * .9 + g.ph) * mr * .2;
      drawGhost(x, y, g.h * u, t * g.tw + g.ph, g.a, -.32 + Math.cos(t * .9 + g.ph) * .1);
    }
    clouds.slice(2).forEach(cl => drawCloud(cl, t, true));
    for (const b of bats) {
      const p = ((t * b.sp + b.off) % 1.25) - .1;
      drawBat(W * (1.05 - p), H * b.y + Math.sin(t * 1.3 + b.ph) * H * b.amp, b.s * u * 1.6, t * b.fl + b.ph, Math.sin(t * 1.3 + b.ph) * .15);
    }
    ctx.drawImage(land, 0, 0, W, H);
    fogBand(fog[0], ground - 170 * u, 260 * u, t * .014, .95);
    fogBand(fog[1], ground - 100 * u, 280 * u, t * .03, 1);
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas); ro.observe(art);
  addEventListener('load', resize);
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(canvas);
  if (!REDUCE) {
    let t = 0, last = 0;
    const loop = now => {
      const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
      if (visible && W) { t += dt; draw(t); }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
})();
