/* Sync it — home page.
   1. builds the repeated parts of the bar illustration (curtains, chandelier, flutes, etc.)
   2. intro: camera starts on the espresso pour and pulls back to the whole bar
   3. sky: the window and the room's lighting follow Al Khobar time, or a chosen moment
   4. coffee-rise transition, doors entrance, live facts */
(function () {
  'use strict';


  SYNC.extend({
    en: {
      hero_h1: 'Come for the coffee. <em>Stay for the show.</em>',
      hero_sub: 'An entertainment cafe in Al Khobar with live music nights, chess, fashion events and thrift, all under one chandelier.',
      hero_cta1: 'See the menu', hero_cta2: 'What’s on',
      fact1_l: 'Right now',
      ev_open: 'See the night', ev_gather: 'Music Gathering', ev_bjork: 'Björk Night', ev_now: 'Happening now',
      cd_d: 'days', cd_h: 'hrs', cd_m: 'min', cd_s: 'sec',
      pour_title: 'Step inside.',
      doors_eyebrow: 'Seven ways in', doors_title: 'Choose your <em>entrance</em>', doors_sub: 'Each door opens a different side of Sync it.',
      enter: 'Enter',
      num1: 'I', num2: 'II', num3: 'III', num4: 'IV', num5: 'V', num6: 'VI', num7: 'VII',
      d1: 'Hot and cold drinks, mojitos, bubble tea and desserts.',
      d2: 'Every Tuesday. Add your name to the Vibe Board.',
      d3: 'Performance nights on the Sync it stage, upcoming and past.',
      d4: 'Chess events, and a board to play against three characters.',
      d5: 'Mini Market, Fancy Nancy and a softer side of Sync it.',
      d6: 'Thrifted tops and a mystery thrifting corner.',
      d7: 'House guidelines and answers to practical questions.'
    },
    ar: {
      hero_h1: 'تعال للقهوة. <em>وابقَ للعرض.</em>',
      hero_sub: 'مقهى ترفيهي في الخبر: أمسيات موسيقية وشطرنج وفعاليات أزياء وثريفت، كلها تحت ثريا واحدة.',
      hero_cta1: 'شاهد القائمة', hero_cta2: 'الفعاليات',
      fact1_l: 'الآن',
      ev_open: 'شاهد الليلة', ev_gather: 'تجمّع الموسيقى', ev_bjork: 'ليلة بيورك', ev_now: 'يحدث الآن',
      cd_d: 'يوم', cd_h: 'ساعة', cd_m: 'دقيقة', cd_s: 'ثانية',
      pour_title: 'تفضّل بالدخول.',
      doors_eyebrow: 'سبعة أبواب', doors_title: 'اختر <em>بابك</em>', doors_sub: 'كل باب يفتح جانبًا مختلفًا من سينك إت.',
      enter: 'ادخل',
      num1: '١', num2: '٢', num3: '٣', num4: '٤', num5: '٥', num6: '٦', num7: '٧',
      d1: 'مشروبات ساخنة وباردة، موهيتو، بابل تي وحلويات.',
      d2: 'كل ثلاثاء. اكتب اسمك على لوحة الفايب.',
      d3: 'ليالي أداء على مسرح سينك إت، القادمة والسابقة.',
      d4: 'فعاليات شطرنج، ولوحة للعب ضد ثلاث شخصيات.',
      d5: 'ميني ماركت وفانسي نانسي وجانب أنعم من سينك إت.',
      d6: 'قطع ثريفت وركن ثريفت مفاجئ.',
      d7: 'قواعد المكان وإجابات للأسئلة العملية.'
    }
  });

  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var still = /still/.test(location.search) || location.hash === '#still';

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function easeIO(k) { return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
  function hex(h) { return [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16); }); }
  function mixc(a, b, f) { return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(lerp(a[i], b[i], f)); }).join(',') + ')'; }

  /* ---------------------------------------------------------------- build the illustration */
  function buildScene() {
    var sm = $('#sunmini');
    for (var i = 0; i < 12; i++) {
      var ray = el('path', { d: 'M0 -12.5L2.8 -7.2H-2.8Z', fill: 'currentColor', transform: 'rotate(' + i * 30 + ')' });
      sm.insertBefore(ray, sm.firstChild);
    }

    var g, x;
    // fluted wooden counter front
    g = $('#flutes');
    for (x = -1200; x < 2700; x += 28) {
      el('path', { d: 'M' + x + ' 878V1100', stroke: 'rgba(0,0,0,.3)', 'stroke-width': 2 }, g);
      el('path', { d: 'M' + (x + 3) + ' 878V1100', stroke: 'rgba(255,255,255,.05)', 'stroke-width': 2 }, g);
    }
    // machine buttons
    g = $('#btns');
    [470, 595, 720].forEach(function (gx) { for (var j = -2; j <= 2; j++) el('circle', { cx: gx + j * 13, cy: 468, r: 3.2 }, g); });
    // beans in the hoppers
    var r = rng(7); g = $('#beans');
    [838, 898].forEach(function (cx) {
      for (var b = 0; b < 30; b++) {
        el('ellipse', { cx: cx + (r() - .5) * 46, cy: 654 + r() * 46, rx: 3.2, ry: 2.2, fill: r() > .5 ? '#7a4a2a' : '#5d3519', transform: 'rotate(' + Math.round(r() * 180) + ' ' + cx + ' 670)' }, g);
      }
    });
    // white and blush flowers
    g = $('#roses');
    var bl = [[-12, -62, 12, '#fbf6ec'], [8, -74, 13, '#f3d6d8'], [-4, -50, 11, '#fffaf0'], [16, -56, 11, '#f7e4e0'], [-18, -76, 10, '#f3d6d8'], [2, -90, 9, '#fbf6ec']];
    bl.forEach(function (f) {
      el('path', { d: 'M1399 806Q' + (1399 + f[0] * .6) + ' ' + (806 + f[1] * .5) + ' ' + (1399 + f[0]) + ' ' + (806 + f[1]), fill: 'none', stroke: '#4f8a49', 'stroke-width': 2.4 }, g);
    });
    [[-24, -56], [22, -64], [8, -40]].forEach(function (l) { el('ellipse', { cx: 1399 + l[0], cy: 806 + l[1], rx: 10, ry: 4.4, fill: '#4f8a49', transform: 'rotate(' + (l[0] < 0 ? -35 : 35) + ' ' + (1399 + l[0]) + ' ' + (806 + l[1]) + ')' }, g); });
    bl.forEach(function (f) {
      var cx = 1399 + f[0], cy = 806 + f[1];
      for (var k = 0; k < 6; k++) el('ellipse', { cx: cx + Math.cos(k * 1.047) * f[2] * .55, cy: cy + Math.sin(k * 1.047) * f[2] * .55, rx: f[2] * .55, ry: f[2] * .45, fill: f[3], stroke: 'rgba(0,0,0,.12)', 'stroke-width': .6 }, g);
      el('circle', { cx: cx, cy: cy, r: f[2] * .28, fill: '#e9c06a' }, g);
    });
    // crochet bags: grapes, a sheep, a flower
    g = $('#crochet');
    function bag(bx, by, rot) {
      var b = el('g', { transform: 'translate(' + bx + ' ' + by + ') rotate(' + rot + ')' }, g);
      el('rect', { x: -16, y: -24, width: 32, height: 46, rx: 3, fill: 'rgba(255,255,255,.16)', stroke: 'rgba(255,255,255,.38)', 'stroke-width': 1 }, b);
      return b;
    }
    var b1 = bag(292, 718, -6);
    [[-6, -6], [0, -6], [6, -6], [-3, 0], [3, 0], [0, 6]].forEach(function (p) { el('circle', { cx: p[0], cy: p[1], r: 5, fill: '#7d4fa3' }, b1); });
    el('ellipse', { cx: 5, cy: -14, rx: 8, ry: 3.4, fill: '#5fa13a', transform: 'rotate(-20 5 -14)' }, b1);
    var b2 = bag(330, 720, 4);
    el('circle', { cx: 0, cy: 0, r: 11, fill: '#f3ead4' }, b2); el('ellipse', { cx: 0, cy: 2, rx: 6, ry: 5, fill: '#e9b3a0' }, b2);
    el('circle', { cx: -2.2, cy: 1, r: 1, fill: '#4a2a22' }, b2); el('circle', { cx: 2.2, cy: 1, r: 1, fill: '#4a2a22' }, b2);
    var b3 = bag(366, 722, -3);
    [[-6, -2], [6, -2], [0, -9], [0, 5]].forEach(function (p) { el('circle', { cx: p[0], cy: p[1], r: 6, fill: '#e9c23a' }, b3); });
    el('circle', { cx: 0, cy: -2, r: 4, fill: '#c9453a' }, b3);
    // anthurium plant
    g = $('#plant');
    el('path', { d: 'M166 780h48l-6-40h-36z', fill: '#b8603a' }, g);
    el('rect', { x: 164, y: 734, width: 52, height: 8, rx: 2, fill: '#9a4d2d' }, g);
    [[-62, 78], [-38, 108], [-14, 124], [12, 118], [36, 104], [60, 76]].forEach(function (L, idx) {
      var len = L[1];
      el('path', { d: 'M0 0C-18 ' + (-len * .3) + ' -16 ' + (-len * .8) + ' 0 ' + (-len) + 'C16 ' + (-len * .8) + ' 18 ' + (-len * .3) + ' 0 0Z', fill: idx % 2 ? '#2d6b3a' : '#1f5230', transform: 'translate(190 740) rotate(' + L[0] + ')' }, g);
    });
    [[158, 636, -14], [224, 650, 12]].forEach(function (f) {
      var fg = el('g', { transform: 'translate(' + f[0] + ' ' + f[1] + ') rotate(' + f[2] + ')' }, g);
      el('path', { d: 'M0 0C-18 -10 -16 -34 0 -30C16 -34 18 -10 0 0Z', fill: '#b4202a' }, fg);
      el('path', { d: 'M0 -4Q6 -22 2 -34', fill: 'none', stroke: '#e9c86a', 'stroke-width': 3, 'stroke-linecap': 'round' }, fg);
    });

    // red velvet curtain at the far left
    g = $('#curtains');
    el('rect', { x: -1200, y: -1200, width: 870, height: 1990, fill: '#8e1c1c' }, g);
    for (var cx = -1200; cx < -330; cx += 26) {
      el('rect', { x: cx, y: -1200, width: 13, height: 1990, fill: 'rgba(0,0,0,.24)' }, g);
      el('rect', { x: cx + 15, y: -1200, width: 5, height: 1990, fill: 'rgba(255,255,255,.07)' }, g);
    }

    // ceiling downlights
    g = $('#downlights');
    for (x = 0; x < 1700; x += 170) {
      el('ellipse', { cx: x + 40, cy: 30, rx: 12, ry: 3.4, fill: '#fff6d8' }, g);
      el('ellipse', { cx: x + 40, cy: 34, rx: 16, ry: 4, fill: '#fff6d8', opacity: .3 }, g);
    }

    // little figurines and teapots on the machine top
    g = $('#figs');
    var cols = ['#e9a0b0', '#7fb4d6', '#e9c06a', '#9cc27a', '#c9585a', '#b39ad6'];
    for (i = 0; i < 9; i++) {
      var fx0 = 548 + i * 22, fh = 14 + (i * 7 % 13);
      el('path', { d: 'M' + fx0 + ' 414h14v-' + (fh - 6) + 'q0 -8 -7 -8t-7 8z', fill: cols[i % 6] }, g);
      el('circle', { cx: fx0 + 7, cy: 414 - fh - 3, r: 4, fill: cols[(i + 2) % 6] }, g);
    }

    // chandelier
    g = $('#chandelier');
    el('path', { d: 'M800 -400V98', stroke: '#c9a24a', 'stroke-width': 3 }, g);
    el('rect', { x: 796, y: 96, width: 8, height: 206, fill: 'url(#gGold)' }, g);
    [[152, 52, 8], [208, 100, 11], [266, 66, 9]].forEach(function (rg) {
      el('ellipse', { cx: 800, cy: rg[0], rx: rg[1], ry: rg[2], fill: 'none', stroke: '#d2ad55', 'stroke-width': 3 }, g);
      el('circle', { cx: 800, cy: rg[0], r: 9, fill: 'url(#gGold)' }, g);
    });
    function crystal(cx, cy, len) {
      el('path', { d: 'M' + cx + ' ' + cy + 'V' + (cy + len), stroke: 'rgba(240,230,200,.7)', 'stroke-width': 1 }, g);
      el('path', { d: 'M' + cx + ' ' + (cy + len) + 'c-4 4-4 10 0 14c4-4 4-10 0-14z', fill: 'rgba(255,255,255,.82)', stroke: '#d8c48a', 'stroke-width': .6 }, g);
    }
    var rr = rng(11), n, th, px, py;
    for (n = 0; n <= 26; n++) { th = Math.PI * n / 26; px = 800 + 100 * Math.cos(th); py = 208 + 11 * Math.sin(th); crystal(px, py, 20 + rr() * 22); }
    for (n = 0; n <= 16; n++) { th = Math.PI * n / 16; px = 800 + 66 * Math.cos(th); py = 266 + 9 * Math.sin(th); crystal(px, py, 14 + rr() * 26); }
    for (n = 0; n <= 8; n++) {
      th = Math.PI * n / 8; px = 800 + 100 * Math.cos(th); py = 208 + 11 * Math.sin(th);
      el('path', { d: 'M800 198Q' + (800 + px) / 2 + ' 178 ' + px + ' ' + py, fill: 'none', stroke: '#d2ad55', 'stroke-width': 2 }, g);
      el('rect', { x: px - 2.5, y: py - 22, width: 5, height: 20, fill: '#f3ead4' }, g);
      el('ellipse', { cx: px, cy: py - 28, rx: 3.4, ry: 6.4, fill: '#ffd27a', 'class': 'flame' }, g);
    }
    crystal(800, 296, 26);
  }

  /* ---------------------------------------------------------------- camera + intro */
  var scene, cam, vig, hero, W = 0, H = 0, S0 = 1, SM = 1, AX = 0, AY = 0, curE = 1, introRAF = 0, skip = false;

  function layout() {
    W = scene.clientWidth || window.innerWidth; H = scene.clientHeight || 600;
    var mobile = window.innerWidth < 900, rtl = document.documentElement.dir === 'rtl';
    if (mobile) { S0 = W / 1100; SM = W / 176; AX = W / 2; AY = H / 2; }
    else { S0 = H / 1250; SM = H / 176; AX = W * (rtl ? .33 : .67); AY = H * .455; }
  }
  function frame(e) {
    curE = e;
    var S1 = SM, S = S1 * Math.pow(S0 / S1, e);
    var fx = lerp(595, 800, e), fy = lerp(704, 500, e), sx = lerp(W / 2, AX, e), sy = lerp(H / 2, AY, e);
    cam.setAttribute('transform', 'translate(' + (sx - fx * S) + ' ' + (sy - fy * S) + ') scale(' + S + ')');
    vig.style.opacity = lerp(1, .5, e);
  }
  function finishIntro() {
    cancelAnimationFrame(introRAF); frame(1);
    document.body.classList.remove('intro'); hero.classList.add('is-in');
  }
  function runIntro() {
    cancelAnimationFrame(introRAF); layout();
    skip = false;
    document.body.classList.add('intro'); hero.classList.remove('is-in');
    scene.classList.remove('run'); void scene.getBoundingClientRect(); scene.classList.add('run');
    $('#crema').style.opacity = '';
    var HOLD = 1700, DUR = 4800, t0 = performance.now();
    frame(0);
    function step(now) {
      var k = clamp((now - t0 - HOLD) / DUR, 0, 1), e = easeIO(k);
      frame(e);
      if (e > .45) document.body.classList.remove('intro');
      if (e > .7) hero.classList.add('is-in');
      if (k < 1 && !skip) introRAF = requestAnimationFrame(step); else finishIntro();
    }
    introRAF = requestAnimationFrame(step);
  }

  /* ---------------------------------------------------------------- sky and light */
  // Light from the door (off the right edge) changes with the hour: pink at dawn, cream by day,
  // orange at dusk, and the blue of the street neon at night. 'shift' leans the light patch on the counter.
  var KEYS = [
    { tint: '#f7d5d0', door: '#ffb392', doorA: .55, beamA: .30, shift: -420, awake: .6, glow: .35 },   // dawn
    { tint: '#ffffff', door: '#fff1c9', doorA: .8, beamA: .38, shift: -150, awake: 1, glow: 0 },       // day
    { tint: '#f0b08a', door: '#ff8040', doorA: .75, beamA: .34, shift: -520, awake: .6, glow: .7 },    // dusk
    { tint: '#aab6e0', door: '#6f94ff', doorA: .5, beamA: .12, shift: 0, awake: .6, glow: 1 }             // night
  ].map(function (k) {
    return { tint: hex(k.tint), door: hex(k.door), doorA: k.doorA, beamA: k.beamA, shift: k.shift, awake: k.awake, glow: k.glow };
  });
  var skyEls, mode = 'live', phi = 5, tw = 0;

  function sunTimes(n) {
    var rad = Math.PI / 180, lat = 26.28 * rad, lon = 50.21, g = 2 * Math.PI / 365 * (n.doy - 1);
    var decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    var eot = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    var cosH = (Math.sin(-0.833 * rad) - Math.sin(lat) * Math.sin(decl)) / (Math.cos(lat) * Math.cos(decl));
    var Hh = Math.acos(clamp(cosH, -1, 1)) / rad / 15, noon = 12 - (lon - 45) / 15 - eot / 60;
    return { sr: noon - Hh, ss: noon + Hh };
  }
  function livePhi() {
    var n = SYNC.now(), t = n.h + n.min / 60, s = sunTimes(n);
    var A = [[s.sr - 1.2, 3], [s.sr + .1, 4], [s.sr + 2, 5], [s.ss - 1.8, 5], [s.ss, 6], [s.ss + 1.3, 7]];
    if (t <= A[0][0]) return 3;
    for (var i = 1; i < A.length; i++) {
      if (t <= A[i][0]) return A[i - 1][1] + (A[i][1] - A[i - 1][1]) * (t - A[i - 1][0]) / (A[i][0] - A[i - 1][0]);
    }
    return 7;
  }
  function applyPhi(p) {
    var pn = ((p - 3) % 4 + 4) % 4 + 3, i = Math.floor(pn), f = smooth(pn - i);
    var a = KEYS[i % 4], b = KEYS[(i + 1) % 4];
    skyEls.tint.setAttribute('fill', mixc(a.tint, b.tint, f));
    var dc = mixc(a.door, b.door, f);
    skyEls.d.forEach(function (st) { st.setAttribute('stop-color', dc); });
    var sh = lerp(a.shift, b.shift, f);
    skyEls.beam.setAttribute('points', '1150,800 1750,800 ' + (1750 + sh) + ',1150 ' + (1150 + sh) + ',1150');
    skyEls.beam.setAttribute('fill', dc);
    skyEls.beam.style.opacity = lerp(a.beamA, b.beamA, f).toFixed(3);
    scene.style.setProperty('--door', lerp(a.doorA, b.doorA, f).toFixed(3));
    scene.style.setProperty('--glow', lerp(a.glow, b.glow, f).toFixed(3));
    scene.style.setProperty('--awake', lerp(a.awake, b.awake, f).toFixed(3));
  }
  function phaseName(p) {
    var pn = ((p - 3) % 4 + 4) % 4 + 3;
    return pn < 3.55 ? 'night' : pn < 4.5 ? 'dawn' : pn < 5.5 ? 'day' : pn < 6.5 ? 'dusk' : 'night';
  }
  function tweenTo(target) {
    cancelAnimationFrame(tw);
    var from = phi, to = target;
    [target - 4, target + 4].forEach(function (c) { if (Math.abs(c - from) < Math.abs(to - from)) to = c; });
    var t0 = performance.now(), dur = 1700;
    (function s(now) {
      var k = clamp((now - t0) / dur, 0, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      phi = from + (to - from) * e; applyPhi(phi);
      if (k < 1) tw = requestAnimationFrame(s); else { tw = 0; phi = target; skyLabel(); }
    })(t0);
  }
  function skyLabel() {
    var btn = $('#skyBtn'); if (!btn) return;
    var m = $('.sky__mode', btn);
    if (!m) { m = document.createElement('span'); m.className = 'sky__mode'; btn.appendChild(m); }
    var name = mode === 'live' ? phaseName(phi) : mode;
    m.textContent = '· ' + SYNC.t('sky_' + name);
    $$('#skyList button').forEach(function (b) { b.setAttribute('aria-checked', b.getAttribute('data-sky') === mode ? 'true' : 'false'); });
  }
  function setMode(m) {
    mode = m;
    tweenTo(m === 'live' ? livePhi() : { dawn: 4, day: 5, dusk: 6, night: 7 }[m]);
    skyLabel();
  }

  /* ---------------------------------------------------------------- live facts */
  // Countdown plates: Music Gathering (every Tuesday, 8:30 pm) and the next dated musical night. Both stay up until 2:30 am, then move on.
  var nextGather = SYNC.nextGather;
  function whenLabel(t) {
    var ar = SYNC.lang() === 'ar', k = new Date(t + 3 * 36e5);
    var date = new Intl.DateTimeFormat(ar ? 'ar-SA-u-ca-gregory' : 'en-GB', { timeZone: 'Asia/Riyadh', weekday: ar ? 'long' : 'short', day: 'numeric', month: ar ? 'long' : 'short' }).format(new Date(t));
    return date + ' · ' + SYNC.fmtTime(k.getUTCHours() * 60 + k.getUTCMinutes());
  }
  var PLATES = [
    { id: 'plateG', key: 'ev_gather', get: nextGather, name: function () { return SYNC.t('ev_gather'); } },
    { id: 'plateB', get: function () { var n = SYNC.nextNight(); return n ? n.t : 0; }, name: function () { var n = SYNC.nextNight(); return n ? n.title[SYNC.lang()] : ''; } }
  ];
  var UNITS = ['d', 'h', 'm', 's'];
  function renderPlates(rebuild) {
    PLATES.forEach(function (p) {
      var root = $('#' + p.id), t = p.get(), ms = t - Date.now();
      if (!t || Date.now() >= SYNC.endOf(t)) { root.hidden = true; root.removeAttribute('data-t'); return; }
      root.hidden = false;
      if (rebuild || root.getAttribute('data-t') !== String(t)) {
        root.setAttribute('data-t', t);
        root.setAttribute('aria-label', p.name() + ', ' + whenLabel(t));
        root.innerHTML = '<svg class="plate__bg" aria-hidden="true"><path class="pf"/><path class="pe"/><path class="pg"/><path class="pd"/></svg><div class="plate__head"><span class="plate__title">' + p.name() + '</span><span class="plate__when">' + whenLabel(t) + '</span></div>' +
          '<div class="cd">' + UNITS.map(function (u, i) {
            return (i ? '<span class="cd__sep" aria-hidden="true">◆</span>' : '') + '<span class="cd__u"><b class="cd__t" data-u="' + u + '" aria-hidden="true">00</b><i>' + SYNC.t('cd_' + u) + '</i></span>';
          }).join('') + '</div>' + '<span class="plate__go">' + SYNC.t('ev_open') + '</span>' + '<div class="plate__live">' + SYNC.t('ev_now') + '</div><span class="sr"></span>';
      }
      var live = ms <= 0; root.classList.toggle('is-live', live);
      var sr = $('.sr', root);
      if (live) { sr.textContent = SYNC.t('ev_now'); return; }
      var s = Math.floor(ms / 1000), v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
      $$('.cd__t', root).forEach(function (b) { b.textContent = SYNC.num(SYNC.pad(v[b.getAttribute('data-u')])); });
      var txt = SYNC.num(v.d) + ' ' + SYNC.t('cd_d') + ' ' + SYNC.num(v.h) + ' ' + SYNC.t('cd_h') + ' ' + SYNC.num(v.m) + ' ' + SYNC.t('cd_m');
      if (sr.textContent !== txt) sr.textContent = txt;
    });
  }
  /* flowing ribbon frames behind the countdown plates */
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches, lastF = 0;
  function strand(w, cy, t, k) {
    var X0 = 44, n = 40, i, u, e, x, y, d = '', amp = 13, ph = k * .85;
    for (i = 0; i <= n; i++) {
      u = i / n; e = Math.pow(Math.abs(u * 2 - 1), 3);
      x = X0 - 40 + u * (w + 80);
      y = cy + (amp * (1 + 1.6 * e)) * Math.sin(u * 6.2 + t * (.9 + k * .15) + ph) * (u < .5 ? 1 : 1);
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return d;
  }
  function drawRibbons(now) {
    if (!calm && now - lastF < 33) { requestAnimationFrame(drawRibbons); return; }
    lastF = now;
    $$('.plate').forEach(function (p) {
      var svg = $('.plate__bg', p); if (!svg || p.hidden) return;
      var w = p.offsetWidth, h = p.offsetHeight, tile = $('.cd__t', p); if (!w || !tile) return;
      var pr = p.getBoundingClientRect(), tr = tile.getBoundingClientRect();
      var cy = tr.top - pr.top + tr.height / 2;
      svg.setAttribute('width', w + 88); svg.setAttribute('height', h + 20);
      var ps = svg.querySelectorAll('path'), t = now / 1000;
      ps[0].setAttribute('d', strand(w, cy, t, 1));
      ps[1].setAttribute('d', strand(w, cy, t, 1));
      ps[2].setAttribute('d', strand(w, cy, t, 2));
      ps[3].setAttribute('d', strand(w, cy, t, 1.5));
    });
    if (!calm) requestAnimationFrame(drawRibbons);
  }
  document.addEventListener('syncit:lang', function () { if (calm) setTimeout(function () { drawRibbons(0); }, 60); });

  function facts() { $('#fact1').textContent = SYNC.statusText(SYNC.openState(SYNC.now())); }


  /* ---------------------------------------------------------------- boot */
  function boot() {
    scene = $('#scene'); cam = $('#cam'); vig = $('#vig'); hero = $('#hero');
    buildScene();
    skyEls = { tint: $('#tint'), d: [$('#d0'), $('#d1'), $('#d2')], beam: $('#beam') };
    phi = livePhi(); applyPhi(phi); skyLabel(); facts(); renderPlates(true); setInterval(function () { renderPlates(false); }, 1000);
    layout(); frame(1); requestAnimationFrame(drawRibbons);
    [['#plateG', 'music-gathering.html'], ['#plateB', 'musical-events.html']].forEach(function (l) {
      var pl = $(l[0]);
      pl.setAttribute('role', 'link'); pl.setAttribute('tabindex', '0'); pl.classList.add('is-link');
      var dest = function () { var n = l[0] === '#plateB' && SYNC.nextNight(); return n ? l[1] + '#' + n.id : l[1]; };
      pl.addEventListener('click', function () { SYNC.go(dest()); });
      pl.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); SYNC.go(dest()); } });
    });

    // sky menu
    var btn = $('#skyBtn'), list = $('#skyList');
    btn.addEventListener('click', function () { list.hidden = !list.hidden; btn.setAttribute('aria-expanded', list.hidden ? 'false' : 'true'); });
    $$('#skyList button').forEach(function (b) {
      b.addEventListener('click', function () { setMode(b.getAttribute('data-sky')); list.hidden = true; btn.setAttribute('aria-expanded', 'false'); });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.sky') && !list.hidden) { list.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });

    // clock ticks every 20s: keep the live sky and the facts current
    document.addEventListener('syncit:tick', function () {
      facts();
      if (mode === 'live' && !tw) { phi = livePhi(); applyPhi(phi); }
      skyLabel();
    });
    document.addEventListener('syncit:lang', function () { layout(); frame(curE); facts(); renderPlates(true); skyLabel(); });
    window.addEventListener('resize', function () { layout(); frame(curE); onScroll(); });

    // intro
    function replay() { window.scrollTo(0, 0); if (reduce) { finishIntro(); } else runIntro(); }
    $('#heroReplay').addEventListener('click', replay);
    var rb = $('#replayBtn'); if (rb) rb.addEventListener('click', replay);
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, function () { if (document.body.classList.contains('intro')) { skip = true; } }, { passive: true });
    });
    if (reduce || still) { $('#crema').style.opacity = '.95'; finishIntro(); } else runIntro();

    // coffee rises as you scroll through #pour
    var pour = $('#pour'), liquid = $('#liquid'), copy = $('#pourCopy');
    if (reduce) { pour.classList.add('pour--static'); copy.style.setProperty('--copy', 1); }
    var ESP = hex('#24130d'), MOSS = hex('#2a3b2c');
    function onScroll() {
      if (reduce) return;
      var r = pour.getBoundingClientRect(), total = r.height - window.innerHeight;
      var p = clamp(-r.top / total, 0, 1), rise = 1 - Math.pow(1 - clamp(p / .62, 0, 1), 3);
      liquid.style.transform = 'translateY(' + ((1 - rise) * (window.innerHeight + 90)).toFixed(1) + 'px)';
      var gp = clamp((p - .62) / .3, 0, 1);
      liquid.style.setProperty('--liq', mixc(ESP, MOSS, gp)); liquid.style.setProperty('--crema', (1 - gp).toFixed(3));
      copy.style.setProperty('--copy', clamp((p - .42) / .22, 0, 1).toFixed(3));
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // doors rise once when they come into view
    var doors = $('#doors-row');
    $$('.door', doors).forEach(function (d, i) { d.style.setProperty('--i', i); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es, ob) { es.forEach(function (e) { if (e.isIntersecting) { doors.classList.add('is-in'); ob.disconnect(); } }); }, { threshold: .2 }).observe(doors);
    } else doors.classList.add('is-in');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
