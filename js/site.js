/* Sync it — shared behaviour: language (EN/AR + RTL), header, full-screen nav, footer,
   Al Khobar clock and open/closed status. Every page includes this file. */
(function () {
  'use strict';

  // Pages that exist so far. Links to anything else show a "being built" toast.
  var BUILT = ['index.html', 'menu.html', 'music-gathering.html', 'musical-events.html', 'chess.html', 'girls-only.html', 'thrift.html', 'guidelines.html'];

  var isHome = document.body.classList.contains('home');
  var AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

  var D = {
    en: {
      hdr_menu: 'Open menu', hdr_close: 'Close', hdr_visit: 'Visit', lang_btn: 'ع', lang_aria: 'العربية',
      city: 'Al Khobar', sky_label: 'Change the sky', sky_live: 'Live sky', sky_dawn: 'Dawn', sky_day: 'Day',
      sky_dusk: 'Dusk', sky_night: 'Night', nav_label: 'All pages', toast_soon: 'This page is being built next.',
      n_home: 'Home', n_home_s: 'The bar',
      n_menu: 'Menu', n_menu_s: 'Drinks, desserts and our coffee',
      n_gather: 'Music Gathering', n_gather_s: 'Tuesdays and the Vibe Board',
      n_events: 'Musical Events', n_events_s: 'Upcoming and past nights',
      n_chess: 'Chess', n_chess_s: 'Events, and a board to play',
      girls_back: 'Back to the bar', n_girls: 'Girls Only', n_girls_s: 'Mini Market and Fancy Nancy',
      n_thrift: 'Thrift', n_thrift_s: 'Tops and mystery thrifting',
      n_faq: 'Guidelines & FAQ', n_faq_s: 'House rules and answers',
      f_about: 'An entertainment cafe in Al Khobar with a stage, a chess table and a thrift corner.',
      f_visit: 'Visit us', f_in: 'Inside Gosaibi Village',
      f_addr: 'King Fahd St, Al Yarmouk, Al Khobar 42548, Saudi Arabia', f_dir: 'Get directions',
      f_hours: 'Opening hours', f_sunthu: 'Sunday to Thursday', f_frisat: 'Friday and Saturday',
      f_sunthu_t: '9:00 am – 2:30 am', f_frisat_t: '2:00 pm – 2:30 am', f_today: 'Today',
      f_reach: 'Get in touch', f_follow: 'Follow us', f_explore: 'Explore',
      f_ig: 'Instagram', f_tt: 'TikTok', f_rights: '© 2026 Sync it. Al Khobar, Saudi Arabia.', f_replay: 'Replay the intro',
      open_now: 'Open now', closed: 'Closed', until: 'until {t}', opens_at: 'opens today at {t}'
    },
    ar: {
      hdr_menu: 'افتح القائمة', hdr_close: 'إغلاق', hdr_visit: 'زورنا', lang_btn: 'EN', lang_aria: 'English',
      city: 'الخبر', sky_label: 'غيّر السماء', sky_live: 'السماء الآن', sky_dawn: 'الفجر', sky_day: 'النهار',
      sky_dusk: 'الغروب', sky_night: 'الليل', nav_label: 'كل الصفحات', toast_soon: 'هذه الصفحة قيد التجهيز.',
      n_home: 'الرئيسية', n_home_s: 'البار',
      n_menu: 'القائمة', n_menu_s: 'مشروبات وحلويات وقهوتنا',
      n_gather: 'تجمّع الموسيقى', n_gather_s: 'كل ثلاثاء ولوحة الفايب',
      n_events: 'الأمسيات الموسيقية', n_events_s: 'الليالي القادمة والسابقة',
      n_chess: 'الشطرنج', n_chess_s: 'فعاليات ولوحة للعب',
      girls_back: 'العودة للبار', n_girls: 'للبنات فقط', n_girls_s: 'ميني ماركت وفانسي نانسي',
      n_thrift: 'الثريفت', n_thrift_s: 'قطع وثريفت مفاجئ',
      n_faq: 'القواعد والأسئلة', n_faq_s: 'قواعد المكان والإجابات',
      f_about: 'مقهى ترفيهي في الخبر فيه مسرح وطاولة شطرنج وركن ثريفت.',
      f_visit: 'زورونا', f_in: 'داخل قرية القصيبي',
      f_addr: 'طريق الملك فهد، حي اليرموك، الخبر 42548، المملكة العربية السعودية', f_dir: 'الاتجاهات',
      f_hours: 'ساعات العمل', f_sunthu: 'الأحد إلى الخميس', f_frisat: 'الجمعة والسبت',
      f_sunthu_t: '٩:٠٠ ص – ٢:٣٠ ص', f_frisat_t: '٢:٠٠ م – ٢:٣٠ ص', f_today: 'اليوم',
      f_reach: 'تواصل معنا', f_follow: 'تابعنا', f_explore: 'استكشف',
      f_ig: 'إنستغرام', f_tt: 'تيك توك', f_rights: '© ٢٠٢٦ سينك إت. الخبر، المملكة العربية السعودية.', f_replay: 'أعد المقدمة',
      open_now: 'مفتوح الآن', closed: 'مغلق الآن', until: 'حتى {t}', opens_at: 'يفتح اليوم {t}'
    }
  };

  var lang = 'en';
  try { lang = localStorage.getItem('syncit-lang') || ''; } catch (e) { lang = ''; }
  if (lang !== 'ar' && lang !== 'en') lang = /^ar/i.test(navigator.language || '') ? 'ar' : 'en';

  function t(key, vars) {
    var s = (D[lang] && D[lang][key]) || D.en[key] || key;
    if (vars) for (var k in vars) s = s.replace('{' + k + '}', vars[k]);
    return s;
  }
  function toAr(s) { return String(s).replace(/\d/g, function (d) { return AR_DIGITS[d]; }); }
  function num(n) { return lang === 'ar' ? toAr(n) : String(n); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function emit(name) { document.dispatchEvent(new CustomEvent(name)); }

  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (e) { e.textContent = t(e.getAttribute('data-i18n')); });
    root.querySelectorAll('[data-i18n-html]').forEach(function (e) { e.innerHTML = t(e.getAttribute('data-i18n-html')); });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (e) {
      e.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p[1]) e.setAttribute(p[0], t(p[1]));
      });
    });
  }

  function setLang(l, silent) {
    lang = l;
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('syncit-lang', l); } catch (e) { /* storage may be unavailable */ }
    apply();
    if (!silent) emit('syncit:lang');
    tick();
  }

  /* ---------- Al Khobar time ---------- */
  var DOW = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var fmtParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Riyadh', hour12: false, year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', weekday: 'short'
  });
  function now() {
    var o = {};
    fmtParts.formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
    var y = +o.year, m = +o.month, d = +o.day;
    return {
      y: y, m: m, d: d, h: (+o.hour) % 24, min: +o.minute, dow: DOW[o.weekday],
      doy: Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 864e5)
    };
  }
  /* ---- schedule: when a night is "over" ----
     A night stays live until 2:30 am (Riyadh) after it starts; then it is finished. */
  var CLOSE_MIN = 150, TZ = 3 * 36e5;
  function endOf(t) {
    var k = t + TZ, day = Math.floor(k / 864e5), tod = k - day * 864e5;
    return day * 864e5 + CLOSE_MIN * 6e4 + (tod >= CLOSE_MIN * 6e4 ? 864e5 : 0) - TZ;
  }
  /* Music Gathering: every Tuesday at 8:30 pm. After this week's ends (2:30 am Wednesday) it points at next Tuesday. */
  var GATHER = { h: 20, m: 30 };
  function nextGather() {
    var n = now(), k, s;
    for (k = -1; k <= 8; k++) {
      if (new Date(Date.UTC(n.y, n.m - 1, n.d + k)).getUTCDay() !== 2) continue;
      s = Date.UTC(n.y, n.m - 1, n.d + k, GATHER.h - 3, GATHER.m);
      if (endOf(s) > Date.now()) return s;
    }
  }
  /* Musical nights with a date. Add a line here and that night gets a countdown on its page and the home page;
     it moves to "Past nights" by itself at 2:30 am the morning after. id must match the id in events.js. */
  var NIGHTS = [
    { id: 'bjork', at: '2026-11-21T20:30:00+03:00', title: { en: 'Björk Night', ar: 'ليلة بيورك' } }
  ];
  function nextNight() {
    var best = null;
    NIGHTS.forEach(function (n) {
      var t = Date.parse(n.at);
      if (endOf(t) > Date.now() && (!best || t < best.t)) best = { id: n.id, t: t, title: n.title };
    });
    return best;
  }
  function fmtClock(n) { return num(pad(n.h) + ':' + pad(n.min)); }
  function fmtTime(mins) {
    var h = Math.floor(mins / 60) % 24, m = mins % 60, ap = h >= 12 ? 'pm' : 'am', h12 = h % 12 || 12;
    var s = h12 + ':' + pad(m);
    return lang === 'ar' ? toAr(s) + ' ' + (ap === 'am' ? 'ص' : 'م') : s + ' ' + ap;
  }

  // Sun–Thu 9:00 to 2:30 next morning. Fri–Sat 14:00 to 2:30 next morning.
  var SCHED = [
    { o: 540, c: 1590 }, { o: 540, c: 1590 }, { o: 540, c: 1590 }, { o: 540, c: 1590 }, { o: 540, c: 1590 },
    { o: 840, c: 1590 }, { o: 840, c: 1590 }
  ];
  function openState(n) {
    n = n || now();
    var m = n.h * 60 + n.min, prev = SCHED[(n.dow + 6) % 7], cur = SCHED[n.dow];
    if (m < prev.c - 1440) return { open: true, until: prev.c - 1440 };
    if (m >= cur.o) return { open: true, until: cur.c % 1440 };
    return { open: false, opens: cur.o };
  }
  function statusText(s) {
    return s.open ? t('open_now') + ' · ' + t('until', { t: fmtTime(s.until) }) : t('closed') + ' · ' + t('opens_at', { t: fmtTime(s.opens) });
  }

  /* ---------- Templates ---------- */
  var ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
  var PAGES = [
    ['index.html', 'home', '#f4e2a8'], ['menu.html', 'menu', '#d98b5f'], ['music-gathering.html', 'gather', '#e5594d'], ['musical-events.html', 'events', '#e0708a'],
    ['chess.html', 'chess', '#8fcf9f'], ['girls-only.html', 'girls', '#f27fa8'], ['thrift.html', 'thrift', '#e0a928'], ['guidelines.html', 'faq', '#e6cb82']
  ];
  var here = (location.pathname.split('/').pop() || 'index.html');

  function headerHTML() {
    var skyOpts = ['live', 'dawn', 'day', 'dusk', 'night'].map(function (k) {
      return '<li role="none"><button type="button" role="menuitemradio" aria-checked="false" data-sky="' + k + '"><span data-i18n="sky_' + k + '"></span></button></li>';
    }).join('');
    var right = isHome
      ? '<div class="sky"><button class="sky__btn" id="skyBtn" type="button" aria-haspopup="menu" aria-expanded="false" data-i18n-attr="aria-label:sky_label"><i class="sky__dot"></i><span class="sky__city" data-i18n="city"></span><span id="clockTxt">--:--</span></button>' +
        '<ul class="sky__list" id="skyList" role="menu" hidden>' + skyOpts + '</ul></div>'
      : '<span class="clock"><span data-i18n="city"></span> <span id="clockTxt">--:--</span></span>';
    var links = PAGES.map(function (p) {
      return '<li><a href="' + p[0] + '" style="--c:' + p[2] + '"' + (p[0] === here ? ' aria-current="page"' : '') + '><span data-i18n="n_' + p[1] + '"></span></a></li>';
    }).join('');
    return '<header class="hdr" id="hdr">' +
      '<button class="hdr__burger" id="navOpen" type="button" aria-controls="nav" aria-expanded="false" data-i18n-attr="aria-label:hdr_menu"><span></span><span></span><span></span></button>' +
      '<a class="brand" href="index.html" aria-label="Sync it"><img class="brand__logo" src="assets/logo.jpg" alt="" width="40" height="40"><span class="brand__script">Sync it</span><span class="brand__ar" lang="ar">سينك إت</span></a>' +
      '<div class="hdr__right">' + right +
      '<button class="lang" id="langBtn" type="button" data-i18n-attr="aria-label:lang_aria"><span data-i18n="lang_btn"></span></button>' +
      '<a class="btn btn--red hdr__visit" href="#visit" data-i18n="hdr_visit"></a></div></header>' +
      '<div class="nav" id="nav" role="dialog" aria-modal="true" data-i18n-attr="aria-label:nav_label">' +
      '<button class="nav__close" id="navClose" type="button" data-i18n-attr="aria-label:hdr_close">✕</button>' +
      '<ul class="nav__list">' + links + '</ul></div>';
  }

  function footerHTML() {
    var links = PAGES.map(function (p) { return '<li><a href="' + p[0] + '" data-i18n="n_' + p[1] + '"></a></li>'; }).join('');
    return '<footer class="ftr" id="visit">' +
      '<div class="ftr__inner">' +
      '<div class="ftr__brand"><img class="ftr__logo" src="assets/logo.jpg" alt="" width="104" height="104"><a class="brand" href="index.html" aria-label="Sync it"><span class="brand__script">Sync it</span></a><span class="ar" lang="ar">سينك إت</span><p data-i18n="f_about"></p></div>' +
      '<div><h3 data-i18n="f_visit"></h3><address><strong data-i18n="f_in"></strong><br><span data-i18n="f_addr"></span></address>' +
      '<a class="ftr__link" href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x3e49e9effb7dc8ad:0x7fd42262eb31b169" target="_blank" rel="noopener"><span data-i18n="f_dir"></span>' + ARROW + '</a></div>' +
      '<div><h3 data-i18n="f_hours"></h3><div class="status" id="status" data-open="true"><i></i><span id="statusTxt"></span></div>' +
      '<div class="hours"><div id="hSunThu"><b data-i18n="f_sunthu"></b><span data-i18n="f_sunthu_t"></span></div><div id="hFriSat"><b data-i18n="f_frisat"></b><span data-i18n="f_frisat_t"></span></div></div></div>' +
      '<div><h3 data-i18n="f_reach"></h3><ul>' +
      '<li><a href="tel:+966550719069" dir="ltr">+966 55 071 9069</a></li>' +
      '<li><a href="mailto:connect@syncit.sa" dir="ltr">connect@syncit.sa</a></li>' +
      '<li><a href="https://www.instagram.com/sync.1t/" target="_blank" rel="noopener"><span data-i18n="f_ig"></span> · <span dir="ltr">@sync.1t</span></a></li>' +
      '<li><a href="https://www.tiktok.com/@syncit5" target="_blank" rel="noopener"><span data-i18n="f_tt"></span> · <span dir="ltr">@syncit5</span></a></li></ul>' +
      '<h3 style="margin-top:28px" data-i18n="f_explore"></h3><ul>' + links + '</ul></div>' +
      '</div>' +
      '<div class="ftr__bar"><span data-i18n="f_rights"></span>' +
      (isHome ? '<button type="button" id="replayBtn" data-i18n="f_replay"></button>' : '') + '</div>' +
      '<div class="ftr__mark" aria-hidden="true">Sync it</div></footer>';
  }

  /* ---------- Behaviour ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }

  function tick() {
    var n = now(), c = document.getElementById('clockTxt');
    if (c) c.textContent = fmtClock(n);
    var s = openState(n), st = document.getElementById('status');
    if (st) {
      st.setAttribute('data-open', s.open ? 'true' : 'false');
      document.getElementById('statusTxt').textContent = statusText(s);
      var today = n.dow <= 4 ? 'hSunThu' : 'hFriSat';
      ['hSunThu', 'hFriSat'].forEach(function (id) {
        var row = document.getElementById(id); if (!row) return;
        row.classList.toggle('is-today', id === today);
        var old = row.querySelector('em'); if (old) old.remove();
        if (id === today) { var em = document.createElement('em'); em.textContent = t('f_today'); row.querySelector('b').appendChild(em); }
      });
    }
    emit('syncit:tick');
  }

  /* Page transitions. Going to Music Gathering: bars rise like an equalizer, then drop away on the next page. */
  var TRANS = { 'music-gathering.html': 'music', 'musical-events.html': 'events', 'chess.html': 'chess', 'girls-only.html': 'girls', 'thrift.html': 'thrift', 'guidelines.html': 'faq' };
  var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function bars() {
    var m = document.getElementById('mtr');
    if (!m) {
      m = document.createElement('div'); m.id = 'mtr'; m.className = 'mtr'; m.setAttribute('aria-hidden', 'true');
      var h = '', n = 22, cols = ['#a52320', '#8e1c1c', '#6e1416'];
      for (var i = 0; i < n; i++) h += '<i style="--d:' + Math.round(120 + 110 * Math.sin(i * .7)) + 'ms;--b:' + cols[i % 3] + '"></i>';
      m.innerHTML = h; document.body.appendChild(m);
    }
    return m;
  }
  /* Going to Musical Events: a stage curtain closes, then parts on the next page. */
  function paper() {
    var m = document.getElementById('ptr');
    if (!m) {
      m = document.createElement('div'); m.id = 'ptr'; m.className = 'ptr'; m.setAttribute('aria-hidden', 'true');
      m.innerHTML = '<i></i><i></i>'; document.body.appendChild(m);
    }
    return m;
  }
  /* Going to Chess: a green disc with a gold rim opens from the centre and a knight appears; on the next page it closes again. */
  function board() {
    var m = document.getElementById('ctr');
    if (!m) {
      m = document.createElement('div'); m.id = 'ctr'; m.className = 'ctr'; m.setAttribute('aria-hidden', 'true');
      var d = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight)) + 60;
      m.innerHTML = '<div class="ctr__disc" style="width:' + d + 'px;height:' + d + 'px"></div>' +
        '<svg class="ctr__n" viewBox="0 0 100 100"><path d="M26 79 H74 V88 H26 Z M31 79 C31 62 34 52 43 44 C37 45 31 49 25 54 L20 49 C22 41 28 36 36 30 L37 17 L46 23 C52 18 62 19 68 27 C77 38 75 62 70 79 Z"/><circle cx="47" cy="33" r="2.8"/></svg>';
      document.body.appendChild(m);
    }
    return m;
  }
  /* Going to Girls Only: a frilly pink disc opens, a bow pops and sparkles twinkle; the next page lights up pink. */
  function girlsWash() {
    var m = document.getElementById('gtr');
    if (!m) {
      m = document.createElement('div'); m.id = 'gtr'; m.className = 'gtr'; m.setAttribute('aria-hidden', 'true');
      var d = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight)) + 80, spots = [[26, 30, '#fbe39a'], [72, 26, '#ffffff'], [18, 64, '#bcd4ee'], [80, 66, '#fbe39a'], [38, 78, '#ffffff'], [62, 20, '#f27fa8']], h = '';
      spots.forEach(function (p, i) { h += '<svg viewBox="0 0 40 40" class="gtr__st" style="left:{x}%;top:{y}%;--i:{i}"><path d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2Z" fill="{c}" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/></svg>'.replace('{x}', p[0]).replace('{y}', p[1]).replace('{i}', i).replace('{c}', p[2]); });
      m.innerHTML = '<div class="gtr__disc" style="width:' + d + 'px;height:' + d + 'px"></div><svg viewBox="0 0 200 140" class="gtr__bow"><path d="M92 76 L58 134 L82 125 L91 138 L108 86 Z" fill="#e3447d" stroke="#b32a5e" stroke-width="4" stroke-linejoin="round"/><path d="M108 76 L142 134 L118 125 L109 138 L92 86 Z" fill="#e3447d" stroke="#b32a5e" stroke-width="4" stroke-linejoin="round"/><path d="M100 72 C70 8 8 12 14 62 C20 108 72 104 100 72 Z" fill="#f27fa8" stroke="#b32a5e" stroke-width="4" stroke-linejoin="round"/><path d="M100 72 C130 8 192 12 186 62 C180 108 128 104 100 72 Z" fill="#f27fa8" stroke="#b32a5e" stroke-width="4" stroke-linejoin="round"/><path d="M34 40 C52 28 70 32 82 48" fill="none" stroke="#ffd0e1" stroke-width="6" stroke-linecap="round"/><path d="M166 40 C148 28 130 32 118 48" fill="none" stroke="#ffd0e1" stroke-width="6" stroke-linecap="round"/><ellipse cx="100" cy="72" rx="15" ry="17" fill="#e3447d" stroke="#b32a5e" stroke-width="4"/></svg>' + h; document.body.appendChild(m);
    }
    return m;
  }
  /* Going to Thrift: a rail of hanging garments sweeps across the screen, then carries on out the other side. */
  function railWipe() {
    var m = document.getElementById('ttr');
    if (!m) {
      m = document.createElement('div'); m.id = 'ttr'; m.className = 'ttr'; m.setAttribute('aria-hidden', 'true');
      var w = 130, n = Math.ceil(window.innerWidth / (w - 14)) + 2, cols = ['#d9a73a', '#2f4a36', '#f1e6cb', '#b5532a', '#e87fa6', '#6b7f4a'], h = '';
      for (var i = 0; i < n; i++) h += '<i style="--c:' + cols[i % cols.length] + ';--s:' + (i % 2 ? '-' : '') + (1.2 + (i % 3) * .5) + 'deg;--j:' + (i * 55 % 240) + 'ms"></i>';
      m.style.setProperty('--w', (n * (w - 14) + 14) + 'px'); m.innerHTML = '<b></b><div class="ttr__row">' + h + '</div>'; document.body.appendChild(m);
    }
    return m;
  }
  /* Going to Guidelines & FAQ: a cream ticket slides up, stamped ADMIT ONE, then lifts away. */
  function stub() {
    var m = document.getElementById('qtr');
    if (!m) {
      m = document.createElement('div'); m.id = 'qtr'; m.className = 'qtr'; m.setAttribute('aria-hidden', 'true');
      m.innerHTML = '<div class="qtr__p"><span>ADMIT ONE</span></div>'; document.body.appendChild(m);
    }
    return m;
  }
  var LAYER = { music: ['mtr', bars, 900], events: ['ptr', paper, 850], chess: ['ctr', board, 1250], girls: ['gtr', girlsWash, 1250], thrift: ['ttr', railWipe, 1000], faq: ['qtr', stub, 950] };
  /* Girls mode: set when Girls Only is opened, kept across pages until "Back to the bar". */
  var MODE_KEY = 'syncit:mode';
  function getMode() { try { return sessionStorage.getItem(MODE_KEY) || localStorage.getItem(MODE_KEY) || ''; } catch (e) { return document.documentElement.getAttribute('data-mode') || ''; } }
  function storeMode(m) { try { if (m) sessionStorage.setItem(MODE_KEY, m); else sessionStorage.removeItem(MODE_KEY); } catch (e) {} try { if (m) localStorage.setItem(MODE_KEY, m); else localStorage.removeItem(MODE_KEY); } catch (e) {} }
  var BOWMINI = '<svg viewBox="0 0 200 140" aria-hidden="true"><path d="M92 76 L58 134 L82 125 L91 138 L108 86 Z M108 76 L142 134 L118 125 L109 138 L92 86 Z" fill="#fff"/><path d="M100 72 C70 8 8 12 14 62 C20 108 72 104 100 72 Z M100 72 C130 8 192 12 186 62 C180 108 128 104 100 72 Z" fill="#fff"/><ellipse cx="100" cy="72" rx="15" ry="17" fill="#ffd0e1"/></svg>';
  function chip() {
    var c = document.getElementById('gchip');
    if (!c) {
      c = document.createElement('button'); c.id = 'gchip'; c.type = 'button'; c.className = 'gchip';
      c.innerHTML = BOWMINI + '<span data-i18n="girls_back"></span>'; document.body.appendChild(c);
      c.addEventListener('click', leaveGirls); apply(c);
    }
    return c;
  }
  function girlsFonts() { if (document.getElementById('gfonts')) return; var l = document.createElement('link'); l.id = 'gfonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Quicksand:wght@400..700&family=Pacifico&family=Baloo+Bhaijaan+2:wght@400..800&family=Tajawal:wght@400;500;700&display=swap'; document.head.appendChild(l); }
  function leaveGirls() {
    storeMode('');
    var root = document.documentElement;
    if (/girls-only\.html$/.test(location.pathname)) { location.href = 'index.html'; return; }
    root.classList.add('mode-fade'); root.removeAttribute('data-mode');
    setTimeout(function () { root.classList.remove('mode-fade'); }, 900);
  }
  function go(href) {
    var file = href.split('#')[0].split('/').pop();
    if (!TRANS[file] || calm) { location.href = href; return; }
    var L = LAYER[TRANS[file]];
    try { sessionStorage.setItem('syncit:tr', TRANS[file]); } catch (e) {}
    if (TRANS[file] === 'girls') { storeMode('girls'); girlsFonts(); }
    var m = L[1](); void m.offsetWidth; m.classList.add('is-on');
    setTimeout(function () { location.href = href; }, L[2]);
  }
  function arrive() {
    var kind = ''; try { kind = sessionStorage.getItem('syncit:tr') || ''; sessionStorage.removeItem('syncit:tr'); } catch (e) {}
    if (!kind || calm || !LAYER[kind]) { document.documentElement.classList.remove('tr-cover'); return; }
    var base = LAYER[kind][0], m = LAYER[kind][1](); m.className = base + ' is-hold'; void m.offsetWidth;
    document.documentElement.classList.remove('tr-cover');
    requestAnimationFrame(function () { requestAnimationFrame(function () { m.className = base + ' is-out'; setTimeout(function () { m.className = base; }, 1600); }); });
  }

  function init() {
    var hm = document.getElementById('site-header'), fm = document.getElementById('site-footer');
    if (hm) hm.innerHTML = headerHTML();
    if (fm) fm.innerHTML = footerHTML();
    setLang(lang, true);

    var hdr = document.getElementById('hdr'), nav = document.getElementById('nav');
    var openBtn = document.getElementById('navOpen');
    function setNav(on) {
      document.body.classList.toggle('nav-open', on);
      if (on) nav.setAttribute('data-open', ''); else nav.removeAttribute('data-open');
      openBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) document.getElementById('navClose').focus(); else openBtn.focus();
    }
    openBtn.addEventListener('click', function () { setNav(!nav.hasAttribute('data-open')); });
    document.getElementById('navClose').addEventListener('click', function () { setNav(false); });
    (function () {
      var nv = document.getElementById('nav'), cur = nv.querySelector('a[aria-current="page"]');
      function tint(a) { var c = a ? a.style.getPropertyValue('--c') : (cur ? cur.style.getPropertyValue('--c') : ''); if (c) nv.style.setProperty('--vibe', c.trim()); }
      Array.prototype.forEach.call(nv.querySelectorAll('.nav__list a'), function (a) {
        ['mouseenter', 'focus'].forEach(function (ev) { a.addEventListener(ev, function () { tint(a); }); });
        ['mouseleave', 'blur'].forEach(function (ev) { a.addEventListener(ev, function () { tint(null); }); });
      });
      tint(null);
    })();
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { if (nav.hasAttribute('data-open')) setNav(false); var l = document.getElementById('skyList'); if (l && !l.hidden) { l.hidden = true; document.getElementById('skyBtn').setAttribute('aria-expanded', 'false'); } }
    });
    document.getElementById('langBtn').addEventListener('click', function () { setLang(lang === 'ar' ? 'en' : 'ar'); });

    function onScroll() { hdr.classList.toggle('is-solid', window.scrollY > 60); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // Pages that don't exist yet: say so instead of showing a broken page.
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (/^(https?:|mailto:|tel:|#)/.test(href)) return;
      var file = href.split('#')[0].split('/').pop();
      if (file && BUILT.indexOf(file) === -1) { e.preventDefault(); setNav(false); toast(t('toast_soon')); return; }
      if (file && TRANS[file] && !e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0 && !a.target) { e.preventDefault(); setNav(false); go(href); }
    });
    chip(); arrive();
    window.addEventListener('pageshow', function (e) { if (e.persisted) { var m = document.getElementById('mtr'); if (m) m.className = 'mtr'; var p = document.getElementById('ptr'); if (p) p.className = 'ptr'; var q = document.getElementById('ctr'); if (q) q.className = 'ctr'; var g = document.getElementById('gtr'); if (g) g.className = 'gtr'; var r = document.getElementById('ttr'); if (r) r.className = 'ttr'; var u = document.getElementById('qtr'); if (u) u.className = 'qtr'; } });

    tick(); setInterval(tick, 20000);
  }

  window.SYNC = {
    t: t, num: num, toAr: toAr, pad: pad, now: now, endOf: endOf, nextGather: nextGather, nextNight: nextNight, NIGHTS: NIGHTS, GATHER: GATHER, fmtTime: fmtTime, openState: openState, statusText: statusText,
    lang: function () { return lang; }, setLang: setLang, apply: apply, toast: toast, ARROW: ARROW,
    go: function (h) { go(h); },
    extend: function (d) { for (var l in d) D[l] = Object.assign(D[l] || {}, d[l]); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
