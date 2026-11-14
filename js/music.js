/* Sync it — Music Gathering page: countdown records, hero wave, team video, photo viewer, virtual vibe board. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';

  SYNC.extend({
    en: {
      cd_d: 'days', cd_h: 'hrs', cd_m: 'min', cd_s: 'sec',
      mg_h1a: 'Music', mg_h1b: 'Gathering', mg_when: 'Every Tuesday · 8:30 pm', mg_tag: 'One stage. One vibe.', mg_tix: 'Get tickets', mg_name: 'Write your name',
      mg_next: 'Next gathering', mg_live: 'On stage now',
      mg_ab_h: 'Our Tuesday tradition',
      mg_p1: 'Music Gathering is our Tuesday tradition at Syncit, a night when our community gets to make the music.',
      mg_p2: 'Write your name on the Vibe Board and share something with us. You can sing karaoke, perform a song you’ve prepared, or bring your instrument and play. You’re equally welcome to settle in with a coffee and enjoy everyone’s performances.',
      mg_p3: 'Syncit is a place where people feel comfortable sharing their talents and finding others who love the same things. Music Gathering gives that a place in our week: familiar faces, new voices, and a different sound every Tuesday.',
      mg_p4: 'Come with a song, an instrument, a friend, or simply the curiosity to listen.',
      mg_w1: 'Sing karaoke', mg_w2: 'Perform a song you prepared', mg_w3: 'Bring your instrument', mg_w4: 'Settle in and listen',
      mg_v_h: 'From the Sync it music team', mg_v_p: 'Hear how a Tuesday works, in their words.', mg_v_n: 'Captions are in English.', mg_play: 'Play the video',
      mg_ph_h: 'From past Tuesdays',
      mg_b_h: 'The Vibe Board', mg_b_p: 'At the cafe, you write your name on the Vibe Board. Pin yours here: add your name, pick a face and say what you will do.',
      mg_b_real: 'The real board, by the stage', mg_b_empty: 'The board is empty. Be the first to pin a name.',
      mg_f_name: 'Your name', mg_f_ph: 'Type your name', mg_f_do: 'I will', mg_f_face: 'Pick a face', mg_f_pin: 'Pin to the board', mg_f_clear: 'Clear the board',
      mg_f_note: 'Saved on this device only. To perform, write your name on the board at the cafe.',
      mg_do1: 'Sing', mg_do2: 'Play', mg_do3: 'Listen', mg_rm: 'Remove',
      mg_t_s: 'See you Tuesday', mg_t_p: 'Come with a song, an instrument, a friend or just curiosity.'
    },
    ar: {
      cd_d: 'يوم', cd_h: 'ساعة', cd_m: 'دقيقة', cd_s: 'ثانية',
      mg_h1a: 'تجمّع', mg_h1b: 'الموسيقى', mg_when: 'كل ثلاثاء · ٨:٣٠ مساءً', mg_tag: 'منصة واحدة. أجواء واحدة.', mg_tix: 'احجز تذكرتك', mg_name: 'اكتب اسمك',
      mg_next: 'التجمّع القادم', mg_live: 'على المسرح الآن',
      mg_ab_h: 'تقليدنا يوم الثلاثاء',
      mg_p1: 'تجمّع الموسيقى هو تقليدنا كل ثلاثاء في سينك إت، ليلة يصنع فيها مجتمعنا الموسيقى بنفسه.',
      mg_p2: 'اكتب اسمك على لوحة الأجواء وشاركنا شيئاً منك. يمكنك أن تغنّي كاريوكي، أو تقدّم أغنية جهّزتها، أو تحضر آلتك وتعزف. وأنت أيضاً مرحّب بك لتجلس مع قهوتك وتستمتع بعروض الجميع.',
      mg_p3: 'سينك إت مكان يشعر فيه الناس بالراحة وهم يشاركون مواهبهم ويتعرّفون على من يحبّون الأشياء نفسها. ويمنح تجمّع الموسيقى هذا مكاناً في أسبوعنا: وجوه مألوفة وأصوات جديدة وصوت مختلف كل ثلاثاء.',
      mg_p4: 'تعالَ بأغنية أو آلة موسيقية أو صديق، أو بفضول الاستماع فقط.',
      mg_w1: 'غنِّ كاريوكي', mg_w2: 'قدّم أغنية جهّزتها', mg_w3: 'أحضر آلتك الموسيقية', mg_w4: 'اجلس واستمع',
      mg_v_h: 'من فريق سينك إت للموسيقى', mg_v_p: 'اسمع كيف تسير ليلة الثلاثاء بكلماتهم.', mg_v_n: 'الترجمة المكتوبة بالإنجليزية.', mg_play: 'شغّل الفيديو',
      mg_ph_h: 'من ثلاثاءات سابقة',
      mg_b_h: 'لوحة الأجواء', mg_b_p: 'في المقهى تكتب اسمك على لوحة الأجواء. ثبّت اسمك هنا: أضف اسمك واختر وجهاً وقل ما ستفعله.',
      mg_b_real: 'اللوحة الحقيقية، بجانب المسرح', mg_b_empty: 'اللوحة فارغة. كن أول من يثبّت اسمه.',
      mg_f_name: 'اسمك', mg_f_ph: 'اكتب اسمك', mg_f_do: 'سأقوم بـ', mg_f_face: 'اختر وجهاً', mg_f_pin: 'ثبّت على اللوحة', mg_f_clear: 'امسح اللوحة',
      mg_f_note: 'يُحفظ على هذا الجهاز فقط. للمشاركة في الأداء اكتب اسمك على اللوحة في المقهى.',
      mg_do1: 'غناء', mg_do2: 'عزف', mg_do3: 'استماع', mg_rm: 'إزالة',
      mg_t_s: 'نراكم الثلاثاء', mg_t_p: 'تعالَ بأغنية أو آلة أو صديق أو بفضول فقط.'
    }
  });
  var t = SYNC.t;

  /* ---------- countdown ---------- */
  var UNITS = ['d', 'h', 'm', 's'], nextGather = SYNC.nextGather;
  function whenLabel(tt) {
    var ar = SYNC.lang() === 'ar', k = new Date(tt + 3 * 36e5);
    var date = new Intl.DateTimeFormat(ar ? 'ar-SA-u-ca-gregory' : 'en-GB', { timeZone: 'Asia/Riyadh', weekday: ar ? 'long' : 'long', day: 'numeric', month: ar ? 'long' : 'long' }).format(new Date(tt));
    return date + ' · ' + SYNC.fmtTime(k.getUTCHours() * 60 + k.getUTCMinutes());
  }
  var row = $('#cdRow');
  function buildDiscs() {
    row.innerHTML = UNITS.map(function (u) {
      return '<div class="disc"><div class="disc__rec"><div class="disc__vinyl"></div><div class="disc__label" data-u="' + u + '">00</div></div><i data-i18n="cd_' + u + '"></i></div>';
    }).join('');
    SYNC.apply(row);
  }
  function tick() {
    var tt = nextGather(), ms = tt - Date.now(), live = ms <= 0;
    $('#countdown').classList.toggle('is-live', live);
    $('#cdLive').hidden = !live;
    $('#cdWhen').textContent = whenLabel(tt);
    if (live) return;
    var s = Math.floor(ms / 1000), v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
    $$('.disc__label', row).forEach(function (l) { l.textContent = SYNC.num(SYNC.pad(v[l.getAttribute('data-u')])); });
  }
  buildDiscs(); tick(); setInterval(tick, 1000);
  document.addEventListener('syncit:lang', function () { buildDiscs(); tick(); });

  /* ---------- hero wave ---------- */
  var hero = $('#top'), vid = $('#mgVid'), wave = $('#mgWave'), wp = $$('path', wave);
  function waveFrame(now) {
    var tt = now / 1000;
    wp.forEach(function (p, k) {
      var d = '', x, y, a = [16, 11, 22][k];
      for (x = 0; x <= 1000; x += 20) {
        var env = .55 + .45 * Math.sin(x * .004 + tt * .6 + k);
        y = 66 + a * env * Math.sin(x * (.016 + k * .006) + tt * (1.4 + k * .5) + k * 2) + 8 * Math.sin(x * .05 - tt * 2 + k);
        d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1);
      }
      p.setAttribute('d', d);
    });
  }
  if (reduce) { waveFrame(0); vid.pause(); vid.removeAttribute('autoplay'); }
  else {
    var on = true, last = 0;
    var loop = function (now) { if (!on) return; if (now - last > 33) { last = now; waveFrame(now); } requestAnimationFrame(loop); };
    new IntersectionObserver(function (e) { var was = on; on = e[0].isIntersecting; if (on && !was) requestAnimationFrame(loop); }).observe(hero);
    requestAnimationFrame(loop);
  }

  /* ---------- team video ---------- */
  var tv = $('#mgTeam'), box = $('#mgVidBox');
  $('#mgPlay').addEventListener('click', function () { tv.controls = true; tv.play(); });
  tv.addEventListener('play', function () { box.classList.add('is-playing'); });
  tv.addEventListener('ended', function () { box.classList.remove('is-playing'); tv.controls = false; });
  tv.addEventListener('pause', function () { if (tv.ended) return; });

  /* ---------- photo viewer ---------- */
  var lb = $('#mgLb');
  $$('.mg-ph').forEach(function (b) { b.addEventListener('click', function () { $('#mgLbImg').src = b.getAttribute('data-src'); lb.showModal(); }); });
  $('#mgLbX').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  /* ---------- virtual vibe board ---------- */
  var SKIN = ['#f0cdb6', '#d9a07c', '#a86b4a', '#7a4a32', '#e8b99a', '#c88b66'];
  // 12 alternative-scene characters: dyed and shaved hair, piercings, liner, mullets, fades, a bowl cut
  var CHARS = [
    // five girls
    { sx: 'g', st: 'long', sk: 5, h: '#6b2a1e', tp: '#2b6a75', liner: 1 },
    { sx: 'g', st: 'buns', sk: 1, h: '#17120f', tp: '#a52320', liner: 1 },
    { sx: 'g', st: 'puffs', sk: 2, h: '#1f1411', tp: '#5b6a2b', hoops: 1 },
    { sx: 'g', st: 'braid', sk: 4, h: '#3a241c', tp: '#ecc4c0', studs: 1 },
    { sx: 'g', st: 'bob', sk: 0, h: '#d9d9e0', brow: '#6b6b75', tp: '#17120f', glasses: 1, liner: 1 },
    // five guys
    { sx: 'b', st: 'mop', sk: 0, h: '#5a3a22', tp: '#2b6a75', studs: 1 },
    { sx: 'b', st: 'twists', sk: 3, h: '#17120f', tp: '#a52320', studs: 1 },
    { sx: 'b', st: 'quiff', sk: 5, h: '#2a1a12', tp: '#e8d9b4', studs: 1 },
    { sx: 'b', st: 'beanie', sk: 4, h: '#a52320', tp: '#272869' },
    { sx: 'b', st: 'curtains', sk: 2, h: '#2a1a12', tp: '#c8963c', glasses: 1 }
  ];
  function face(i) {
    var c = CHARS[i] || CHARS[0], sk = SKIN[c.sk], h = c.h, boy = c.sx === 'b', amb = c.sx === 'a', back = '', front = '';
    var rx = c.slim ? 11 : boy ? 12.6 : amb ? 12 : 11.6, ry = c.slim ? 15.8 : 15.4, st = c.st;
    if (st === 'long') { back = '<path d="M15 32Q12 8 30 8Q48 8 45 32L48 68H12Z" fill="' + h + '"/>'; front = '<path d="M17 28Q20 14 30 13Q42 14 43 28Q36 19 30 20Q24 19 17 28Z" fill="' + h + '"/>'; }
    if (st === 'longb') { back = '<path d="M14 32Q11 7 30 7Q49 7 46 32L49 64H11Z" fill="' + h + '"/>'; front = '<path d="M16 30Q16 11 30 11Q44 11 44 30Q37 18 30 18Q23 18 16 30Z" fill="' + h + '"/><path d="M15 32Q14 52 17 62M45 32Q46 52 43 62" stroke="' + h + '" stroke-width="5" fill="none" stroke-linecap="round"/>'; }
    if (st === 'bob') { back = '<path d="M15 30Q13 8 30 8Q47 8 45 30L46 46Q30 52 14 46Z" fill="' + h + '"/>'; front = '<path d="M16 24Q22 12 30 13Q40 12 44 25L44 29Q36 22 30 22Q23 22 16 29Z" fill="' + h + '"/>'; }
    if (st === 'pixie') { front = '<path d="M16 30Q12 10 30 9Q48 10 44 30Q42 20 34 17Q26 22 17 24Z" fill="' + h + '"/>'; }
    if (st === 'afro') { back = [[12, 22], [18, 11], [30, 6], [42, 11], [48, 22], [11, 33], [49, 33]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="8.5" fill="' + h + '"/>'; }).join(''); }
    if (st === 'undercut') { front = '<path d="M17.5 27Q16.5 17 21 16.5L21 28Z M42.5 27Q43.5 17 39 16.5L39 28Z" fill="' + h + '" opacity=".4"/><path d="M20 22Q21 8 34 9Q45 10 43 22Q37 14 29 16Q22 17 20 22Z" fill="' + h + '"/>'; }
    if (st === 'mullet') { back = '<path d="M14 30Q12 8 30 8Q48 8 46 30L51 58L41 50H19L9 58Z" fill="' + h + '"/>'; front = '<path d="M16 28Q16 11 30 11Q44 11 44 28Q40 20 36 21L33 16L29 22L24 17L20 22Q17 24 16 28Z" fill="' + h + '"/>'; }
    if (st === 'swoop') { front = '<path d="M15.5 29Q13 9 31 9Q47 10 44.5 28Q42 17 33 17Q24 18 15.5 29Z" fill="' + h + '"/><path d="M17 26Q28 11 43 19" fill="none" stroke="' + h + '" stroke-width="4" stroke-linecap="round"/>'; }
    if (st === 'fade') { front = '<path d="M17.5 26Q17 18 20 17L20.5 27Z M42.5 26Q43 18 40 17L39.5 27Z" fill="' + h + '" opacity=".35"/><path d="M18 21Q19 10 30 10Q41 10 42 21Q36 15 30 15Q24 15 18 21Z" fill="' + h + '"/>'; }
    if (st === 'bowl') { back = '<path d="M15 34Q12 8 30 8Q48 8 45 34Z" fill="' + h + '"/>'; front = '<path d="M15.5 25Q30 15 44.5 25L45 22Q44 8 30 8Q16 8 15 22Z" fill="' + h + '"/>'; }
    if (st === 'beanie') { front = '<path d="M16 25Q15 7 30 7Q45 7 44 25Z" fill="' + h + '"/><rect x="15" y="21" width="30" height="5" rx="2" fill="rgba(0,0,0,.22)"/><path d="M16.5 28Q16 25 17 25M43.5 28Q44 25 43 25" stroke="#2a1a12" stroke-width="3" stroke-linecap="round"/>'; }
    if (st === 'spiky') { front = '<path d="M16 27L17 12L22 20L25 6L30 18L35 6L38 20L43 12L44 27Q38 20 30 21Q22 20 16 27Z" fill="' + h + '"/>'; }
    if (st === 'quiff') { front = '<path d="M16.5 27Q13 12 25 8Q38 4 44 14Q46 21 43.5 27Q40 18 30 18Q22 18 16.5 27Z" fill="' + h + '"/><path d="M22 14Q32 8 42 14" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2" stroke-linecap="round"/>'; }
    if (st === 'curlytop') { front = [[16, 17], [23, 10], [31, 8], [39, 10], [45, 17], [14, 25], [46, 25]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6.8" fill="' + h + '"/>'; }).join('') + '<path d="M17 24Q30 14 43 24Q36 19 30 20Q23 19 17 24Z" fill="' + h + '"/>'; }
    if (st === 'buns') { back = '<circle cx="15" cy="10" r="7" fill="' + h + '"/><circle cx="45" cy="10" r="7" fill="' + h + '"/>'; front = '<path d="M16.5 29Q14 10 30 10Q46 10 43.5 29Q38 18 30 19Q22 18 16.5 29Z" fill="' + h + '"/>'; }
    if (st === 'puffs') { back = '<circle cx="13" cy="15" r="9.5" fill="' + h + '"/><circle cx="47" cy="15" r="9.5" fill="' + h + '"/>'; front = '<path d="M16.5 29Q14 10 30 10Q46 10 43.5 29Q38 18 30 19Q22 18 16.5 29Z" fill="' + h + '"/>'; }
    if (st === 'braid') { back = '<path d="M15 32Q12 8 30 8Q48 8 45 32L46 56H14Z" fill="' + h + '"/>'; front = '<path d="M17 28Q20 14 30 13Q42 14 43 28Q36 19 30 20Q24 19 17 28Z" fill="' + h + '"/><path d="M44 38Q50 50 45 60Q41 67 46 72" fill="none" stroke="' + h + '" stroke-width="5.5" stroke-linecap="round"/><path d="M44 38Q50 50 45 60Q41 67 46 72" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="5.5" stroke-dasharray="1.6 3.4"/>'; }
    if (st === 'mop') { front = '<path d="M15.5 29Q12 9 30 8Q48 9 44.5 29Q43 18 36 15Q31 22 24 17Q18 19 15.5 29Z" fill="' + h + '"/><path d="M16 27L14.5 34M44 27L45.5 34" stroke="' + h + '" stroke-width="3.4" stroke-linecap="round"/>'; }
    if (st === 'twists') { front = '<path d="M17 24Q18 13 30 13Q42 13 43 24Q36 18 30 18Q24 18 17 24Z" fill="' + h + '"/>' + [20, 25, 30, 35, 40].map(function (x, k) { return '<rect x="' + (x - 1.9) + '" y="' + (3 + Math.abs(k - 2) * 1.6) + '" width="3.8" height="11" rx="1.9" fill="' + h + '"/>'; }).join(''); }
    if (st === 'curtains') { front = '<path d="M15.5 30Q12 9 30 9Q48 9 44.5 30Q42 21 36 17Q32 15 30 22Q28 15 24 17Q18 21 15.5 30Z" fill="' + h + '"/>'; }
    var shoulders = (boy || amb) ? '<path d="M' + (c.slim ? '7' : '3') + ' 72Q' + (c.slim ? '9' : '5') + ' 54 22 50H38Q' + (c.slim ? '51' : '55') + ' 54 ' + (c.slim ? '53' : '57') + ' 72Z" fill="' + c.tp + '"/>' : '<path d="M8 72Q10 54 24 50H36Q50 54 52 72Z" fill="' + c.tp + '"/>';
    var plaid = c.plaid ? '<path d="M14 58h32M13 65h34M20 52v20M30 52v20M40 52v20" stroke="rgba(0,0,0,.35)" stroke-width="1.6"/>' : '';
    var chain = c.chain ? '<path d="M24 51Q30 59 36 51" fill="none" stroke="#e6cb82" stroke-width="1.4"/><circle cx="30" cy="56" r="1.8" fill="#e6cb82"/>' : '';
    var liner = c.liner ? '<path d="M22.4 31.2l-3 -1.8M37.6 31.2l3 -1.8" stroke="#17120f" stroke-width="1.3" stroke-linecap="round"/>' : '';
    var septum = c.septum ? '<path d="M28.3 37.4q1.7 2.6 3.4 0" fill="none" stroke="#e6cb82" stroke-width="1.2"/>' : '';
    var studs = c.studs ? '<circle cx="17.6" cy="34.5" r="1.4" fill="#e6cb82"/><circle cx="42.4" cy="34.5" r="1.4" fill="#e6cb82"/>' : '';
    var hoops = c.hoops ? '<circle cx="17.2" cy="38" r="3.2" fill="none" stroke="#e6cb82" stroke-width="1.3"/><circle cx="42.8" cy="38" r="3.2" fill="none" stroke="#e6cb82" stroke-width="1.3"/>' : '';
    var lipc = '#8a4a3c';
    var glasses = c.glasses ? '<circle cx="25.2" cy="31" r="4.6" fill="rgba(255,255,255,.12)" stroke="#17120f" stroke-width="1.2"/><circle cx="34.8" cy="31" r="4.6" fill="rgba(255,255,255,.12)" stroke="#17120f" stroke-width="1.2"/><path d="M29.8 31h.4M20.6 30.6l-3 -1M39.4 30.6l3 -1" stroke="#17120f" stroke-width="1.2" stroke-linecap="round"/>' : '';
    var mouth = '<path d="M26.5 40.4q3.5 2.4 7 0" fill="none" stroke="' + lipc + '" stroke-width="1.7" stroke-linecap="round"/>' + glasses;
    var brows = boy ? '<path d="M22.5 26.5q2.5 -1.6 5 0M32.5 26.5q2.5 -1.6 5 0" fill="none" stroke="' + (c.brow || (h === '#ecd68a' ? '#b79a4a' : h)) + '" stroke-width="1.7" stroke-linecap="round"/>' : '<path d="M22.5 26.8q2.5 -1.2 5 0M32.5 26.8q2.5 -1.2 5 0" fill="none" stroke="' + (c.brow || h) + '" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>';
    return '<svg viewBox="0 0 60 72" aria-hidden="true">' + back + shoulders + plaid + chain + '<path d="M26 44h8v9q-4 4-8 0z" fill="' + sk + '"/>' + chain +
      '<ellipse cx="30" cy="30" rx="' + rx + '" ry="' + ry + '" fill="' + sk + '"/>' + front + studs + hoops + brows + liner +
      '<path d="M23.5 31q2.4 -2.2 4.8 0M31.7 31q2.4 -2.2 4.8 0" fill="none" stroke="#2a1710" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="M30 33v4" stroke="rgba(0,0,0,.25)" stroke-width="1" stroke-linecap="round"/>' + septum + mouth + '</svg>';
  }
  // pickers
  $('#vbDo').innerHTML = [1, 2, 3].map(function (n) { return '<label class="mg-opt"><input type="radio" name="vbdo" value="' + n + '"' + (n === 1 ? ' checked' : '') + '><span data-i18n="mg_do' + n + '"></span></label>'; }).join('');
  $('#vbFaces').innerHTML = CHARS.map(function (c, i) { return '<label class="mg-opt"><input type="radio" name="vbface" value="' + i + '"' + (i === 0 ? ' checked' : '') + '><span>' + face(i) + '</span></label>'; }).join('');
  SYNC.apply($('#vbForm'));

  // faint hand-drawn doodle faces behind the tags, like the real board
  (function doodle() {
    var svg = $('#vbDoodle'), W = 1000, H = 625, cols = 14, rows = 9, s = 1, seed = 5;
    var r = function () { seed = seed * 16807 % 2147483647; return seed / 2147483647; };
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    var h = '';
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
      var cx = (x + .5) * W / cols + (r() - .5) * 14, cy = (y + .5) * H / rows + (r() - .5) * 10, k = .8 + r() * .3;
      h += '<g transform="translate(' + cx.toFixed(0) + ' ' + cy.toFixed(0) + ') scale(' + k.toFixed(2) + ') rotate(' + ((r() - .5) * 14).toFixed(0) + ')" fill="none" stroke="#e6cb82" stroke-width="1.6" stroke-linecap="round">' +
        '<ellipse rx="12" ry="15"/><path d="M-12 -4Q-14 -22 0 -22Q14 -22 12 -4' + (r() > .5 ? 'Q4 -14 -3 -13Q-9 -12 -12 -4' : 'L14 16') + '"/>' +
        '<path d="M-6 -1h3M3 -1h3"/><path d="M-4 7q4 3 8 0"/></g>';
    }
    svg.innerHTML = h;
  })();

  var KEY = 'syncit:vibeboard', tags = [];
  try { tags = JSON.parse(localStorage.getItem(KEY) || '[]'); if (!Array.isArray(tags)) tags = []; } catch (e) { tags = []; }
  var vb = $('#vb');
  function save() { try { localStorage.setItem(KEY, JSON.stringify(tags)); } catch (e) {} }
  function slotPos(k, i) {
    var narrow = innerWidth < 800, cols = narrow ? 4 : 6, rows = narrow ? 4 : 3;
    var c = k % cols, rw = Math.floor(k / cols) % rows;
    var seed = (tags[i] ? tags[i].s : 1);
    return { left: 3 + c * (94 / cols) + ((seed % 7) - 3) * .6, top: 6 + rw * (92 / rows) + ((seed % 5) - 2) * 1.2, r: ((seed % 9) - 4) * 1.3 };
  }
  function renderTags(newest) {
    $$('.tag', vb).forEach(function (n) { n.remove(); });
    var cap = innerWidth < 800 ? 16 : 18;
    while (tags.length > cap) tags.shift();
    tags.forEach(function (tg, i) {
      var p = slotPos(i, i), d = document.createElement('div');
      d.className = 'tag'; d.style.left = p.left + '%'; d.style.top = p.top + '%'; d.style.setProperty('--r', p.r + 'deg');
      if (!(newest && i === tags.length - 1) || reduce) d.style.animation = 'none';
      d.innerHTML = '<div class="tag__card">' + face(tg.f) + '<b></b><small class="do' + tg.v + '"></small></div><button class="tag__x" type="button" aria-label="' + t('mg_rm') + '">✕</button>';
      $('b', d).textContent = tg.n; $('small', d).textContent = t('mg_do' + tg.v);
      $('.tag__x', d).addEventListener('click', function () { tags.splice(i, 1); save(); renderTags(); });
      vb.appendChild(d);
    });
    vb.classList.toggle('has-tags', tags.length > 0);
  }
  $('#vbForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('#vbName').value.trim(); if (!n) return;
    tags.push({ n: n.slice(0, 16), v: +$('input[name=vbdo]:checked').value, f: +$('input[name=vbface]:checked').value, s: Math.floor(Math.random() * 1000) });
    save(); renderTags(true); $('#vbName').value = '';
  });
  $('#vbClear').addEventListener('click', function () { tags = []; save(); renderTags(); });
  document.addEventListener('syncit:lang', function () { renderTags(); });
  addEventListener('resize', function () { renderTags(); });
  renderTags();
})();
