/* Sync it — Girls Only page: countdown, rooms, pick-a-card, tap pops and the dress-up studio. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L = function () { return window.SYNC.lang(); };
  var T = function (k, v) { return window.SYNC.t(k, v); };

  /* ------------------------------------------------------------------ words */
  window.SYNC.extend({
    en: {
      gl_script: 'a room that is all yours', gl_h1: 'Girls Only',
      gl_sub: 'Markets, crafts and dress-up nights for girls who make things, wear things and cheer each other on.',
      gl_see: 'See what’s on', gl_play: 'Play dress-up', gl_tap: 'Tap anywhere for a surprise',
      gl_pick: 'Pick a card', gl_pick_s: 'Six little reminders. Tap one to turn it over.',
      gl_up: 'Upcoming', gl_up_s: 'Open a card to see the details.',
      gl_past: 'Past nights', gl_past_s: 'The nights we dressed up for.',
      gl_open_market: 'Open the Mini Market details', gl_open_fancy: 'Open the Fancy Nancy Night details',
      gl_m_t: 'Mini Market', gl_m_when: 'Every Saturday, 8 pm to 12 am',
      gl_m_txt: 'Handmade, homemade and hand-painted. Sellers set up their own table, shoppers wander and find something nobody else has.',
      gl_days: 'days', gl_hrs: 'hrs', gl_min: 'min', gl_sec: 'sec',
      gl_next: 'Next Mini Market opens in', gl_open_now: 'The Mini Market is open. It closes in',
      gl_reg: 'Register to sell', gl_rules: 'Rules and what to bring',
      gl_s_t: 'More nights are on the way', gl_s_txt: 'Workshops, dress-up nights and gatherings for girls are always being planned. Follow us to hear first.',
      gl_follow: 'Follow on Instagram',
      gl_f_t: 'Fancy Nancy Night', gl_f_when: 'Friday 28 August',
      gl_f_txt: 'A night of singing and fun, a crafting workshop and a whole room dressed in its fanciest. The best look won a free ticket.',
      gl_f_open: 'See the night', gl_f_dress: 'Dress up for it',
      gl_rm_p: 'If you make it, bake it, paint it, sew it or design it, this is your stall. Girls come to browse, to buy and to meet the people behind the things.',
      gl_rm_h: 'How it works',
      gl_r1: 'Register first with the form, so we know you are coming.', gl_r2: 'Bring your own table.',
      gl_r3: 'Bring your own lights, so your pieces shine.', gl_r4: 'Handmade and homemade pieces are what we love most.',
      gl_r5: 'Girls only, for sellers and shoppers.',
      gl_rf_p: 'One very fancy evening, made for girls who love glitter, ribbons and big words.', gl_rf_h: 'The night',
      gl_fr1: 'A night of singing and fun.', gl_fr2: 'A crafting workshop, to make your own pieces.',
      gl_fr3: 'An exceptional Fancy Nancy atmosphere.', gl_fr4: 'Everyone wears their best look inspired by Fancy Nancy.',
      gl_fr5: 'The best look wins a free ticket.',
      gl_close: 'Close',
      gl_st: 'The Fancy Night dress-up', gl_st_s: 'Mix tops, jeans and skirts or go full dress. Do her hair, add the sparkle, then give her a name worthy of the night.',
      gl_doll_aria: 'Your dress-up girl', gl_tabs: 'What to change',
      gl_surprise: 'Surprise me', gl_undo: 'Undo', gl_reset: 'Start over', gl_done: 'I’m ready for the night',
      gl_t_top: 'Top', gl_t_bottom: 'Bottom', gl_t_dress: 'Dress', gl_t_hair: 'Hair', gl_t_head: 'Head', gl_t_extra: 'Extras', gl_t_shoes: 'Shoes', gl_t_scene: 'Scene', gl_t_skin: 'Skin',
      gl_c_top: 'Top colour', gl_c_bottom: 'Bottom colour', gl_c_dress: 'Dress colour', gl_c_hair: 'Hair colour', gl_c_accent: 'Accent colour', gl_c_skin: 'Skin tone',
      gl_tp_tee: 'T-shirt', gl_tp_sweater: 'Knit sweater', gl_tp_blouse: 'Bow blouse', gl_tp_hoodie: 'Hoodie', gl_tp_blazer: 'Blazer', gl_bt_jeans: 'Jeans', gl_bt_wide: 'Wide-leg pants', gl_bt_midi: 'Midi skirt', gl_bt_mini: 'Mini skirt', gl_dr_none: 'No dress', gl_dr_gown: 'Princess gown', gl_dr_party: 'Tea party dress', gl_dr_shirt: 'Shirt dress',
      gl_h_long: 'Long', gl_h_curls: 'Curls', gl_h_bun: 'Top bun', gl_h_braids: 'Braids',
      gl_g_none: 'None', gl_g_tiara: 'Tiara', gl_g_bow: 'Big bow', gl_g_flowers: 'Flowers', gl_g_hijab: 'Hijab', gl_g_beret: 'Beret',
      gl_e_boa: 'Feather boa', gl_e_pearls: 'Pearls', gl_e_shades: 'Heart shades', gl_e_wand: 'Star wand', gl_e_bag: 'Little bag',
      gl_s_flats: 'Flats', gl_s_heels: 'Heels', gl_s_boots: 'Boots', gl_s_sneak: 'Sneakers',
      gl_b_blush: 'Blush stage', gl_b_night: 'Starry night', gl_b_garden: 'Garden', gl_b_curtain: 'Curtain call', gl_b_sun: 'Sunny',
      gl_look_pre: 'Tonight she is', gl_newname: 'New name', gl_keep: 'Keep playing',
      gl_look_note: 'Screenshot your look to share it. Bring the real one to the next dress-up night.',
      gl_word: 'Fancy word of the night: {w}',
      gl_toast_undo: 'Nothing to undo yet.'
    },
    ar: {
      gl_script: 'مساحة كلها لكِ', gl_h1: 'للبنات فقط',
      gl_sub: 'أسواق وحِرف وليالٍ للتنكّر، لبنات يصنعن ويبدعن ويشجّعن بعضهن.',
      gl_see: 'شوفي القادم', gl_play: 'العبي لعبة التلبيس', gl_tap: 'اضغطي في أي مكان لمفاجأة',
      gl_pick: 'اختاري بطاقة', gl_pick_s: 'ست تذكيرات صغيرة. اضغطي على واحدة لتنقلبي بها.',
      gl_up: 'القادم', gl_up_s: 'افتحي البطاقة لتري التفاصيل.',
      gl_past: 'ليالٍ سابقة', gl_past_s: 'الليالي التي تأنّقنا لها.',
      gl_open_market: 'افتحي تفاصيل الميني ماركت', gl_open_fancy: 'افتحي تفاصيل ليلة فانسي نانسي',
      gl_m_t: 'ميني ماركت', gl_m_when: 'كل سبت، من ٨ مساءً إلى ١٢ منتصف الليل',
      gl_m_txt: 'منتجات يدوية ومنزلية ومرسومة باليد. تجهّز البائعات طاولاتهن وتتجوّل الزائرات لتجدن ما لا يشبه شيئًا آخر.',
      gl_days: 'يوم', gl_hrs: 'ساعة', gl_min: 'دقيقة', gl_sec: 'ثانية',
      gl_next: 'الميني ماركت القادم يبدأ بعد', gl_open_now: 'الميني ماركت مفتوح الآن. يُغلق بعد',
      gl_reg: 'سجّلي للبيع', gl_rules: 'القواعد وما تحضرينه',
      gl_s_t: 'ليالٍ أخرى في الطريق', gl_s_txt: 'ورش وليالي تنكّر ولقاءات للبنات قيد التحضير دائمًا. تابعينا لتعرفي أولًا.',
      gl_follow: 'تابعينا على إنستغرام',
      gl_f_t: 'ليلة فانسي نانسي', gl_f_when: 'الجمعة ٢٨ أغسطس',
      gl_f_txt: 'ليلة غناء ومرح، وورشة حِرف، وقاعة كاملة بأجمل الأزياء. وفازت صاحبة أفضل إطلالة بتذكرة مجانية.',
      gl_f_open: 'شوفي الليلة', gl_f_dress: 'تأنّقي لها',
      gl_rm_p: 'إن كنتِ تصنعين أو تخبزين أو ترسمين أو تخيطين أو تصمّمين، فهذه طاولتكِ. تأتي البنات للتجوّل والشراء ولقاء من يقف وراء هذه القطع.',
      gl_rm_h: 'كيف يعمل',
      gl_r1: 'سجّلي أولًا عبر النموذج لنعرف أنكِ قادمة.', gl_r2: 'أحضري طاولتكِ.',
      gl_r3: 'أحضري إضاءتكِ لتلمع قطعكِ.', gl_r4: 'القطع اليدوية والمصنوعة في البيت هي الأحب إلينا.',
      gl_r5: 'للبنات فقط، للبائعات والمتسوّقات.',
      gl_rf_p: 'أمسية فاخرة جدًا لبنات يحببن البريق والأشرطة والكلمات الكبيرة.', gl_rf_h: 'الليلة',
      gl_fr1: 'ليلة غناء ومرح.', gl_fr2: 'ورشة حِرف لتصنعي قطعكِ بنفسكِ.',
      gl_fr3: 'أجواء فانسي نانسي استثنائية.', gl_fr4: 'ترتدي الجميع أجمل إطلالة مستوحاة من فانسي نانسي.',
      gl_fr5: 'صاحبة أفضل إطلالة تفوز بتذكرة مجانية.',
      gl_close: 'إغلاق',
      gl_st: 'تلبيس ليلة فانسي', gl_st_s: 'نسّقي بلوزة وجينز وتنورة أو اختاري فستانًا. سرّحي شعرها وأضيفي البريق، ثم امنحيها اسمًا يليق بالليلة.',
      gl_doll_aria: 'دميتكِ للتلبيس', gl_tabs: 'ماذا تغيّرين',
      gl_surprise: 'فاجئيني', gl_undo: 'تراجع', gl_reset: 'من جديد', gl_done: 'جاهزة للّيلة',
      gl_t_top: 'البلوزة', gl_t_bottom: 'البنطال', gl_t_dress: 'الفستان', gl_t_hair: 'الشعر', gl_t_head: 'الرأس', gl_t_extra: 'إضافات', gl_t_shoes: 'الحذاء', gl_t_scene: 'المشهد', gl_t_skin: 'البشرة',
      gl_c_top: 'لون البلوزة', gl_c_bottom: 'لون البنطال', gl_c_dress: 'لون الفستان', gl_c_hair: 'لون الشعر', gl_c_accent: 'لون الإكسسوار', gl_c_skin: 'لون البشرة',
      gl_tp_tee: 'تيشيرت', gl_tp_sweater: 'سترة صوف', gl_tp_blouse: 'بلوزة بفيونكة', gl_tp_hoodie: 'هودي', gl_tp_blazer: 'بليزر', gl_bt_jeans: 'جينز', gl_bt_wide: 'بنطال واسع', gl_bt_midi: 'تنورة ميدي', gl_bt_mini: 'تنورة قصيرة', gl_dr_none: 'بدون فستان', gl_dr_gown: 'فستان الأميرة', gl_dr_party: 'فستان حفلة شاي', gl_dr_shirt: 'فستان قميص',
      gl_h_long: 'طويل', gl_h_curls: 'مجعّد', gl_h_bun: 'كعكة', gl_h_braids: 'ضفائر',
      gl_g_none: 'بلا', gl_g_tiara: 'تاج', gl_g_bow: 'فيونكة كبيرة', gl_g_flowers: 'زهور', gl_g_hijab: 'حجاب', gl_g_beret: 'بيريه',
      gl_e_boa: 'وشاح ريش', gl_e_pearls: 'لؤلؤ', gl_e_shades: 'نظارة قلوب', gl_e_wand: 'عصا نجمة', gl_e_bag: 'حقيبة صغيرة',
      gl_s_flats: 'بلا كعب', gl_s_heels: 'كعب', gl_s_boots: 'بوت', gl_s_sneak: 'رياضي',
      gl_b_blush: 'مسرح وردي', gl_b_night: 'ليلة نجوم', gl_b_garden: 'حديقة', gl_b_curtain: 'ستارة', gl_b_sun: 'مشمس',
      gl_look_pre: 'الليلة هي', gl_newname: 'اسم جديد', gl_keep: 'أكملي اللعب',
      gl_look_note: 'خذي لقطة شاشة لإطلالتكِ لتشاركيها. وأحضري الإطلالة الحقيقية لليلة التنكّر القادمة.',
      gl_word: 'كلمة الليلة الفاخرة: {w}',
      gl_toast_undo: 'لا شيء للتراجع عنه بعد.'
    }
  });

  var MSG = {
    en: ['You are stronger than you think.', 'Your hands make magic. Show it, share it.', 'Take up space. This room has plenty.', 'Her win is your win too.', 'Rest is powerful. So is starting.', 'Small shops grow big dreams.'],
    ar: ['أنتِ أقوى مما تتصورين.', 'يداكِ تصنعان السحر. اعرضيه وشاركيه.', 'خذي مساحتكِ. هنا متسع للجميع.', 'نجاحها نجاحكِ أيضًا.', 'الراحة قوة، والبدء قوة.', 'المشاريع الصغيرة تكبّر الأحلام.']
  };
  var CHEER = {
    en: ['Look at you go!', 'Be fancy your own way.', 'You belong here.', 'Proud of you.', 'Dream big, sell bigger.', 'Girls build things.'],
    ar: ['ما شاء الله عليكِ!', 'كوني فاخرة على طريقتكِ.', 'مكانكِ هنا.', 'فخورون بكِ.', 'احلمي كبيرًا.', 'البنات يبنين.']
  };

  /* ------------------------------------------------------------------ pops */
  var PINKS = ['#f27fa8', '#e3447d', '#ffb3cf', '#fbe39a', '#bcd4ee', '#ffffff', '#c9a6f0'];
  var SHAPES = [
    function (c) { return '<svg viewBox="0 0 24 24"><path d="M12 21C4 14 2 9.5 2 7a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 2.500-2 7-10 14z" fill="' + c + '" stroke="#fff" stroke-width="1.600" stroke-linejoin="round"/></svg>'; },
    function (c) { return '<svg viewBox="0 0 24 24"><path d="M12 1.500c1 6 3.500 8.500 10.500 10.500-7 2-9.500 4.500-10.500 10.500C11 16.500 8.500 14 1.500 12 8.500 10 11 7.500 12 1.500z" fill="' + c + '" stroke="#fff" stroke-width="1.500" stroke-linejoin="round"/></svg>'; },
    function (c) { return '<svg viewBox="0 0 24 24"><g fill="' + c + '" stroke="#fff" stroke-width="1.300"><circle cx="12" cy="5" r="4.200"/><circle cx="19" cy="10" r="4.200"/><circle cx="16.500" cy="18.500" r="4.200"/><circle cx="7.500" cy="18.500" r="4.200"/><circle cx="5" cy="10" r="4.200"/></g><circle cx="12" cy="12.500" r="3.200" fill="#fbe39a" stroke="#fff" stroke-width="1.200"/></svg>'; },
    function (c) { return '<svg viewBox="0 0 24 24"><path d="M12 12C8 2 1 4 2.500 10c1.200 5 7 4 9.500 2zm0 0c4-10 11-8 9.500-2-1.200 5-7 4-9.500 2z" fill="' + c + '" stroke="#fff" stroke-width="1.400" stroke-linejoin="round"/><path d="M12 12l-4 10 4-3 4 3z" fill="' + c + '" stroke="#fff" stroke-width="1.300" stroke-linejoin="round"/></svg>'; },
    function (c) { return '<svg viewBox="0 0 24 24"><path d="M12 12C9 4 3 5 4 10c1 4 6 3 8 2zm0 0c3-8 9-7 8-2-1 4-6 3-8 2zm0 0c-5 1-8 6-4 9 3 2 4-5 4-9zm0 0c5 1 8 6 4 9-3 2-4-5-4-9z" fill="' + c + '" stroke="#fff" stroke-width="1.200" stroke-linejoin="round"/><rect x="11.200" y="9" width="1.600" height="6" rx=".8" fill="#6d1b3f"/></svg>'; }
  ];
  var PICK = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var layer = document.body;

  function burst(x, y, n, spread) {
    n = reduce ? Math.min(n, 3) : n;
    for (var i = 0; i < n; i++) {
      var el = document.createElement('div'), size = 18 + Math.random() * 20;
      el.className = 'gpop'; el.style.width = el.style.height = size + 'px';
      el.innerHTML = PICK(SHAPES)(PICK(PINKS)); layer.appendChild(el);
      var ang = Math.random() * Math.PI * 2, dist = (spread || 90) * (0.5 + Math.random() * 0.9), rot = (Math.random() - 0.5) * 240;
      var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 26;
      var x0 = x - size / 2, y0 = y - size / 2;
      var anim = el.animate([
        { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(.2) rotate(0deg)', opacity: 0 },
        { transform: 'translate(' + (x0 + dx * 0.55) + 'px,' + (y0 + dy * 0.55) + 'px) scale(1.15) rotate(' + rot * 0.5 + 'deg)', opacity: 1, offset: 0.4 },
        { transform: 'translate(' + (x0 + dx) + 'px,' + (y0 + dy + 30) + 'px) scale(.7) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: reduce ? 500 : 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' });
      anim.onfinish = (function (e) { return function () { e.remove(); }; })(el);
    }
  }

  var sayEl = null, sayTimer = 0;
  function say(x, y) {
    if (sayEl) { sayEl.remove(); clearTimeout(sayTimer); }
    var el = document.createElement('div'); el.className = 'gsay';
    var useImg = Math.random() < 0.45;
    if (useImg) {
      var img = document.createElement('img');
      var ar = L() === 'ar' ? Math.random() < 0.7 : Math.random() < 0.25;
      img.src = ar ? 'assets/girls/sticker-ar.png' : 'assets/girls/sticker-stronger.png';
      img.width = ar ? 179 : 268; img.height = ar ? 47 : 62; img.alt = ''; img.style.width = (ar ? 179 : 268) * 1.15 + 'px'; img.style.maxWidth = '78vw';
      el.appendChild(img);
    } else {
      var sp = document.createElement('span'); sp.textContent = PICK(MSG[L()].concat(CHEER[L()])); el.appendChild(sp);
    }
    el.style.visibility = 'hidden'; layer.appendChild(el); sayEl = el;
    var w = el.offsetWidth, h = el.offsetHeight, vw = window.innerWidth, vh = window.innerHeight;
    var px = Math.max(10, Math.min(vw - w - 10, x - w / 2)), py = Math.max(10, Math.min(vh - h - 10, y - h - 24));
    el.style.visibility = '';
    var base = 'translate(' + px + 'px,' + py + 'px)';
    var a = el.animate(reduce ? [{ transform: base, opacity: 0 }, { transform: base, opacity: 1 }] : [
      { transform: base + ' scale(.3) rotate(-8deg)', opacity: 0 },
      { transform: base + ' scale(1.1) rotate(3deg)', opacity: 1, offset: .55 },
      { transform: base + ' scale(1) rotate(0deg)', opacity: 1 }
    ], { duration: reduce ? 200 : 520, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'forwards' });
    sayTimer = setTimeout(function () {
      var o = el.animate([{ transform: base + ' scale(1)', opacity: 1 }, { transform: 'translate(' + px + 'px,' + (py - 26) + 'px) scale(.9)', opacity: 0 }], { duration: 450, easing: 'ease-in', fill: 'forwards' });
      o.onfinish = function () { el.remove(); if (sayEl === el) sayEl = null; };
    }, 2300);
  }

  var taps = 0;
  document.addEventListener('pointerdown', function (e) {
    if (e.button && e.button !== 0) return;
    var t = e.target;
    if (t.closest && t.closest('#dOpts, #dSw, #dTabs, .gl-doll__act')) { burst(e.clientX, e.clientY, 4, 60); return; }
    taps++;
    burst(e.clientX, e.clientY, 7, 100);
    var pop = t.closest && t.closest('[data-pop]');
    if (pop && !(t.closest('#site-header'))) { say(e.clientX, e.clientY); }
    else if (taps % 5 === 0 && !(t.closest && t.closest('#site-header, dialog, .gl-count'))) { say(e.clientX, e.clientY); }
  }, { passive: true });

  /* ------------------------------------------------------------------ pick a card */
  function buildDeck() {
    var deck = $('#deck'); var m = MSG[L()];
    var open = $$('.gl-pick.is-flip', deck).map(function (b) { return b.getAttribute('data-i'); });
    deck.innerHTML = '';
    m.forEach(function (txt, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'gl-pick' + (open.indexOf(String(i)) > -1 ? ' is-flip' : '');
      b.setAttribute('data-i', i); b.style.setProperty('--r', ((i % 3) - 1) * 2.2 + 'deg');
      b.setAttribute('aria-pressed', open.indexOf(String(i)) > -1 ? 'true' : 'false');
      b.innerHTML = '<span class="gl-pick__in"><span class="gl-pick__f"><svg viewBox="0 0 200 140" aria-hidden="true"><path d="M92 76 L58 134 L82 125 L91 138 L108 86Z M108 76 L142 134 L118 125 L109 138 L92 86Z" fill="#fff"/><path d="M100 72C70 8 8 12 14 62c6 46 58 42 86 10zM100 72c30-64 92-60 86-10-6 46-58 42-86 10z" fill="#fff"/><ellipse cx="100" cy="72" rx="15" ry="17" fill="#ffd0e1"/></svg></span><span class="gl-pick__b"><span>' + txt + '</span></span></span>';
      b.addEventListener('click', function () {
        var on = b.classList.toggle('is-flip'); b.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (on) { var r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 10, 120); }
      });
      deck.appendChild(b);
    });
  }

  /* ------------------------------------------------------------------ Mini Market countdown */
  function tickMarket() {
    var r = new Date(Date.now() + 3 * 3600e3);
    var tNow = r.getUTCDay() * 86400 + r.getUTCHours() * 3600 + r.getUTCMinutes() * 60 + r.getUTCSeconds();
    var start = 6 * 86400 + 20 * 3600, end = 7 * 86400, diff, open = false;
    if (tNow >= start && tNow < end) { open = true; diff = end - tNow; }
    else if (tNow < start) diff = start - tNow; else diff = start + 7 * 86400 - tNow;
    var d = Math.floor(diff / 86400), h = Math.floor(diff % 86400 / 3600), m = Math.floor(diff % 3600 / 60), s = diff % 60, N = window.SYNC.num, P = window.SYNC.pad;
    $('#mmD').textContent = N(P(d)); $('#mmH').textContent = N(P(h)); $('#mmM').textContent = N(P(m)); $('#mmS').textContent = N(P(s));
    $('#mmLabel').textContent = T(open ? 'gl_open_now' : 'gl_next');
    $('#mmCount').classList.toggle('is-open', open);
  }

  /* ------------------------------------------------------------------ rooms (dialogs) */
  function wireDialogs() {
    $$('[data-open]').forEach(function (b) {
      b.addEventListener('click', function () { var d = $('#room-' + b.getAttribute('data-open')); if (d && !d.open) d.showModal(); });
    });
    $$('dialog.gl-dlg').forEach(function (d) {
      d.addEventListener('click', function (e) { if (e.target === d) closeDlg(d); });
      $$('[data-close]', d).forEach(function (b) { b.addEventListener('click', function () { closeDlg(d); }); });
      d.addEventListener('cancel', function (e) { e.preventDefault(); closeDlg(d); });
    });
  }
  function closeDlg(d) {
    if (!d.open) return;
    if (reduce) { d.close(); return; }
    d.classList.add('is-closing');
    setTimeout(function () { d.classList.remove('is-closing'); d.close(); }, 260);
  }

  /* ------------------------------------------------------------------ the doll */
  var SKIN = ['#fde0c8', '#f4c7a0', '#d9a074', '#b9794f', '#8d5532', '#5e3722'];
  var PAL = ['#f27fa8', '#e3447d', '#b79ae0', '#8fd6b8', '#f6d56e', '#8fc1ea', '#f5896b', '#fffaf3'];
  var BOTC = ['#5b86b8', '#2f4f7a', '#9fc0e0', '#fffaf3', '#2b1b25', '#e3447d', '#b79ae0', '#c8a27a'];
  var HAIRC = ['#2b1b17', '#6b3f2a', '#a8432a', '#e9c46a', '#f27fa8', '#b79ae0'];
  var TOP = ['tee', 'sweater', 'blouse', 'hoodie', 'blazer'], BOTTOM = ['jeans', 'wide', 'midi', 'mini'], DRESS = ['none', 'gown', 'party', 'shirt'], HAIR = ['long', 'curls', 'bun', 'braids'], HEAD = ['none', 'tiara', 'bow', 'flowers', 'hijab', 'beret'],
    EXTRA = ['boa', 'pearls', 'shades', 'wand', 'bag'], SHOES = ['flats', 'heels', 'boots', 'sneak'], SCENE = ['blush', 'night', 'garden', 'curtain', 'sun'];

  function mix(hex, a) { // a>0 lighten, a<0 darken
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = n >> 8 & 255, b = n & 255, t = a < 0 ? 0 : 255, p = Math.abs(a);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  var uid = 0;
  function bow(cx, cy, sc, c) {
    var d = mix(c, -.25);
    return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + sc + ')"><path d="M0 0C-12-22-40-20-38 0c2 20 28 20 38 0zM0 0c12-22 40-20 38 0-2 20-28 20-38 0z" fill="' + c + '" stroke="' + d + '" stroke-width="2.500" stroke-linejoin="round"/><ellipse cx="0" cy="0" rx="7" ry="9" fill="' + d + '"/></g>';
  }
  function flower(cx, cy, r, c) {
    var h = ''; for (var i = 0; i < 5; i++) { var a = i * 1.2566; h += '<circle cx="' + (cx + Math.cos(a) * r * .9).toFixed(1) + '" cy="' + (cy + Math.sin(a) * r * .9).toFixed(1) + '" r="' + r * .75 + '" fill="' + c + '" stroke="#fff" stroke-width="1"/>'; }
    return h + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r * .55 + '" fill="#fbe39a" stroke="#fff" stroke-width="1"/>';
  }
  function star(cx, cy, r, c, sw) { return '<path transform="translate(' + cx + ' ' + cy + ') scale(' + r / 12 + ')" d="M0-12C1.200-4 4-1.200 12 0 4 1.200 1.200 4 0 12-1.200 4-4 1.200-12 0-4-1.200-1.200-4 0-12z" fill="' + c + '" stroke="#fff" stroke-width="' + (sw || 1.200) + '" stroke-linejoin="round"/>'; }

  function scene(k, id) {
    var h = '';
    if (k === 'blush') {
      h = '<defs><linearGradient id="bg' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9f1"/><stop offset="1" stop-color="#ffb3cf"/></linearGradient></defs><rect width="300" height="520" fill="url(#bg' + id + ')"/>' +
        star(48, 70, 11, '#fbe39a') + star(256, 120, 9, '#fff') + star(36, 250, 7, '#fff') + star(268, 300, 12, '#fbe39a') + star(70, 400, 8, '#fff');
    } else if (k === 'night') {
      h = '<defs><linearGradient id="bg' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d1646"/><stop offset="1" stop-color="#8a3c93"/></linearGradient></defs><rect width="300" height="520" fill="url(#bg' + id + ')"/>' +
        star(40, 60, 9, '#fbe39a') + star(255, 90, 12, '#fff') + star(60, 200, 7, '#fff') + star(250, 250, 9, '#fbe39a') + star(30, 340, 11, '#fff') + star(270, 400, 8, '#fff') + '<circle cx="236" cy="52" r="22" fill="#fbe39a"/><circle cx="246" cy="46" r="20" fill="#3b1a55"/>';
    } else if (k === 'garden') {
      h = '<defs><linearGradient id="bg' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d5e6f7"/><stop offset="1" stop-color="#f0f8ee"/></linearGradient></defs><rect width="300" height="520" fill="url(#bg' + id + ')"/><ellipse cx="60" cy="520" rx="160" ry="110" fill="#a9d8a0"/><ellipse cx="260" cy="530" rx="150" ry="100" fill="#8fcb90"/>' +
        flower(40, 430, 11, '#f27fa8') + flower(262, 420, 12, '#fbe39a') + flower(80, 470, 9, '#fff') + flower(230, 476, 10, '#f27fa8') + flower(20, 90, 9, '#fff') + flower(274, 60, 11, '#f27fa8');
    } else if (k === 'curtain') {
      h = '<defs><radialGradient id="bg' + id + '" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fff3c4"/><stop offset="1" stop-color="#f7b8cd"/></radialGradient></defs><rect width="300" height="520" fill="url(#bg' + id + ')"/>' +
        '<path d="M0 0h70C60 120 80 300 50 520H0z" fill="#c9345f"/><path d="M300 0h-70c10 120-10 300 20 520h50z" fill="#c9345f"/><path d="M30 0C44 130 36 330 20 520M54 0C66 140 60 320 40 520M270 0c-14 130-6 330 10 520M246 0c-12 140-6 320 14 520" fill="none" stroke="#9c1f45" stroke-width="3"/><rect width="300" height="24" fill="#9c1f45"/><path d="M0 24c20 14 40 14 60 0s40 14 60 0 40 14 60 0 40 14 60 0 40 14 60 0V10H0z" fill="#e3447d"/>';
    } else {
      h = '<defs><linearGradient id="bg' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c9"/><stop offset="1" stop-color="#ffe08a"/></linearGradient></defs><rect width="300" height="520" fill="url(#bg' + id + ')"/><circle cx="240" cy="70" r="38" fill="#fff" opacity=".7"/><circle cx="240" cy="70" r="26" fill="#ffb347"/>' +
        '<g fill="#fff" opacity=".8"><circle cx="50" cy="120" r="5"/><circle cx="90" cy="60" r="3"/><circle cx="40" cy="300" r="4"/><circle cx="262" cy="290" r="4"/><circle cx="60" cy="440" r="3"/></g>';
    }
    return h + '<ellipse cx="150" cy="494" rx="92" ry="10" fill="#6d1b3f" opacity=".16"/>';
  }

  function hairBack(s) {
    var c = HAIRC[s.hairC], d = mix(c, -.2);
    if (HEAD[s.head] === 'hijab') return '';
    switch (HAIR[s.hair]) {
      case 'long': return '<path d="M102 84C80 150 78 232 94 270 Q150 292 206 270C222 232 220 150 198 84Z" fill="' + c + '"/><path d="M118 130C112 190 112 240 118 270M182 130C188 190 188 240 182 270" stroke="' + d + '" stroke-width="3" fill="none" opacity=".5"/>';
      case 'curls': { var cs = [[96, 80], [88, 112], [92, 146], [100, 178], [86, 200], [104, 214], [204, 80], [212, 112], [208, 146], [200, 178], [214, 200], [196, 214], [118, 50], [182, 50], [150, 40]], h = ''; cs.forEach(function (p) { h += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="22" fill="' + c + '" stroke="' + d + '" stroke-width="2" opacity=".98"/>'; }); return h; }
      case 'bun': return '<path d="M106 80C100 120 108 150 118 160L182 160C192 150 200 120 194 80Z" fill="' + c + '"/>';
      default: return '<path d="M106 80C100 120 106 140 112 150L188 150C194 140 200 120 194 80Z" fill="' + c + '"/>';
    }
  }
  function hairFront(s) {
    if (HEAD[s.head] === 'hijab') return '';
    var c = HAIRC[s.hairC], d = mix(c, -.22), h = '';
    h += '<path d="M106 94C98 36 138 16 152 16 180 16 204 44 194 94 188 72 178 58 150 56 122 58 112 72 106 94Z" fill="' + c + '"/><path d="M150 56C138 62 126 70 118 84" stroke="' + d + '" stroke-width="2.500" fill="none" opacity=".6"/>';
    var k = HAIR[s.hair];
    if (k === 'bun') h += '<circle cx="150" cy="30" r="22" fill="' + c + '" stroke="' + d + '" stroke-width="2.500"/><path d="M136 24C146 32 158 32 166 24" stroke="' + d + '" stroke-width="2" fill="none"/>';
    if (k === 'braids') [112, 188].forEach(function (x, i) { var sx = i ? 1 : -1; for (var j = 0; j < 7; j++) h += '<ellipse cx="' + (x + sx * (j % 2 ? 3 : -3)) + '" cy="' + (118 + j * 22) + '" rx="12" ry="13" fill="' + c + '" stroke="' + d + '" stroke-width="2"/>'; h += '<rect x="' + (x - 7) + '" y="262" width="14" height="8" rx="3" fill="#f27fa8"/>'; });
    return h;
  }

  function sleeve(s, side, col, trim, puff, pct) {
    var sx = side < 0 ? 114 : 186, ex = side < 0 ? 96 : 204, p = pct || 100;
    var h = '<path d="M' + sx + ' 170Q' + (side < 0 ? 98 : 202) + ' 230 ' + ex + ' 290" pathLength="100" stroke="' + col + '" stroke-width="19" stroke-linecap="round" stroke-dasharray="' + p + ' 200" fill="none"/>';
    if (trim && p >= 100) h += '<path d="M' + (ex - 10) + ' 284H' + (ex + 10) + '" stroke="' + trim + '" stroke-width="7" stroke-linecap="round"/>';
    if (puff) h += '<circle cx="' + (side < 0 ? 106 : 194) + '" cy="178" r="21" fill="' + col + '" stroke="' + mix(col, -.18) + '" stroke-width="2"/>';
    return h;
  }
  /* round collar + ribbon: keeps every top high-necked and tidy */
  function collar(c, d) {
    return '<path d="M120 160Q150 186 180 160Q176 150 150 154Q124 150 120 160Z" fill="#fffaf3" stroke="' + mix(c, -.1) + '" stroke-width="1.800" stroke-linejoin="round"/><path d="M124 162Q150 184 176 162" stroke="' + d + '" stroke-width="1.400" stroke-dasharray="2 4" fill="none" stroke-linecap="round"/>';
  }
  function frill(y, w, c, n) {
    var h = '', k = n || 9, step = w * 2 / k;
    for (var i = 0; i < k; i++) h += '<circle cx="' + (150 - w + step * (i + .5)).toFixed(1) + '" cy="' + y + '" r="' + (step / 2).toFixed(1) + '" fill="' + c + '"/>';
    return h;
  }

  function dress(s) {
    var c = PAL[s.dressC], d = mix(c, -.2), l = mix(c, .45), k = DRESS[s.dress], a = PAL[s.accent], h = '';
    if (k === 'gown') {
      h += '<path d="M108 258Q150 278 192 258C226 326 262 408 270 466 238 478 210 470 184 480 160 470 140 470 116 480 90 470 62 478 30 466 38 408 74 326 108 258Z" fill="' + c + '"/>';
      h += '<path d="M64 400Q150 430 236 400C246 430 256 450 262 462 232 472 206 462 184 472 160 462 140 462 116 472 94 462 68 470 38 460 44 440 56 420 64 400Z" fill="' + l + '" opacity=".85"/>';
      h += '<path d="M150 278L150 478M128 272C100 380 66 466 56 470M172 272C200 380 234 466 244 470" fill="none" stroke="' + d + '" stroke-width="2.500" opacity=".35"/>';
      h += '<path d="M114 160Q150 176 186 160L192 262Q150 278 108 262Z" fill="' + c + '"/>';
      h += '<path d="M108 256Q150 274 192 256L191 270Q150 288 109 270Z" fill="' + a + '"/>' + bow(150, 266, .5, mix(a, .2));
      h += sleeve(s, -1, c, l, true) + sleeve(s, 1, c, l, true);
      h += collar(c, d);
      h += '<g fill="#fff" opacity=".85"><circle cx="90" cy="440" r="2.600"/><circle cx="214" cy="420" r="2.600"/><circle cx="150" cy="450" r="3"/><circle cx="116" cy="340" r="2.200"/><circle cx="190" cy="330" r="2.200"/></g>';
    } else if (k === 'party') {
      h += '<path d="M114 160Q150 176 186 160L190 256 232 410Q150 432 68 410L110 256Z" fill="' + c + '"/>' + sleeve(s, -1, c, d, false) + sleeve(s, 1, c, d, false);
      h += '<path d="M150 262L150 420M128 262C112 320 96 380 84 416M172 262C188 320 204 380 216 416" stroke="' + d + '" stroke-width="2" fill="none" opacity=".3"/>';
      h += '<path d="M108 250Q150 266 192 250L191 264Q150 280 109 264Z" fill="' + d + '"/>' + bow(150, 264, .6, a);
      h += frill(414, 82, l, 11);
      h += collar(c, d);
      h += '<g fill="' + l + '" opacity=".9"><circle cx="124" cy="330" r="3"/><circle cx="176" cy="340" r="3"/><circle cx="150" cy="370" r="3"/><circle cx="102" cy="384" r="3"/><circle cx="198" cy="388" r="3"/></g>';
    } else if (k === 'shirt') {
      h += '<path d="M114 160Q150 176 186 160L190 250 222 394Q150 410 78 394L110 250Z" fill="' + c + '"/>' + sleeve(s, -1, c, l, false) + sleeve(s, 1, c, l, false);
      h += '<path d="M150 176V396" stroke="' + d + '" stroke-width="2"/><g fill="' + l + '" stroke="' + d + '" stroke-width="1"><circle cx="145" cy="200" r="2.800"/><circle cx="145" cy="226" r="2.800"/><circle cx="145" cy="300" r="2.800"/><circle cx="145" cy="340" r="2.800"/><circle cx="145" cy="372" r="2.800"/></g>';
      h += '<path d="M108 250Q150 266 192 250L191 262Q150 278 109 262Z" fill="' + mix(c, -.35) + '"/><rect x="141" y="254" width="18" height="12" rx="2" fill="none" stroke="#f6d56e" stroke-width="2.500"/>';
      h += '<path d="M118 162L150 198 182 162 170 154 150 170 130 154Z" fill="' + l + '" stroke="' + d + '" stroke-width="1.500" stroke-linejoin="round"/>';
      h += '<path d="M126 262C112 300 100 340 92 380M174 262C188 300 200 340 208 380" stroke="' + d + '" stroke-width="2" fill="none" opacity=".3"/>';
    }
    return h;
  }

  /* ---- everyday tops (hem at the hip, never see-through) ---- */
  var TORSO = 'M114 160Q150 176 186 160L192 270Q150 282 108 270Z';
  function tops(s) {
    var c = PAL[s.topC], d = mix(c, -.2), l = mix(c, .45), k = TOP[s.top], a = PAL[s.accent], h = '';
    if (k === 'tee') {
      h += sleeve(s, -1, c, null, false, 26) + sleeve(s, 1, c, null, false, 26);
      h += '<path d="' + TORSO + '" fill="' + c + '"/><path d="M108 270Q150 282 192 270" stroke="' + d + '" stroke-width="2.500" fill="none"/>';
      h += '<path d="M126 160Q150 186 174 160" fill="none" stroke="' + d + '" stroke-width="5" stroke-linecap="round"/>' + star(150, 222, 15, mix(a, .1), 1.600);
    } else if (k === 'sweater') {
      h += '<path d="M112 160Q150 176 188 160L196 276Q150 290 104 276Z" fill="' + c + '"/>' + sleeve(s, -1, c, d, false) + sleeve(s, 1, c, d, false);
      h += '<path d="M104 266Q150 280 196 266L196 280Q150 294 104 280Z" fill="' + d + '"/><path d="M110 272V286M120 275V289M130 277V291M140 278V292M150 278V292M160 278V292M170 277V291M180 275V289M190 272V286" stroke="' + mix(c, -.35) + '" stroke-width="1.200" opacity=".5"/>';
      h += '<path d="M124 160Q150 188 176 160" fill="none" stroke="' + d + '" stroke-width="7" stroke-linecap="round"/>';
      h += '<path d="M140 190C134 206 146 214 140 230C134 244 146 252 140 264M160 190C166 206 154 214 160 230C166 244 154 252 160 264" stroke="' + d + '" stroke-width="2.500" fill="none" opacity=".45"/>';
    } else if (k === 'blouse') {
      h += '<path d="M114 160Q150 176 186 160L192 266Q150 278 108 266Z" fill="' + c + '"/>' + sleeve(s, -1, c, mix(c, -.12), true) + sleeve(s, 1, c, mix(c, -.12), true);
      h += '<path d="M150 178V268" stroke="' + d + '" stroke-width="1.500"/><g fill="' + l + '" stroke="' + d + '" stroke-width="1"><circle cx="146" cy="214" r="2.500"/><circle cx="146" cy="238" r="2.500"/></g>';
      h += collar(c, d) + bow(150, 176, .5, a);
    } else if (k === 'hoodie') {
      h += '<path d="M112 160Q150 176 188 160L196 274Q150 288 104 274Z" fill="' + c + '"/>' + sleeve(s, -1, c, d, false) + sleeve(s, 1, c, d, false);
      h += '<path d="M118 154Q150 196 182 154Q192 170 184 180Q150 202 116 180Q108 170 118 154Z" fill="' + d + '"/><path d="M142 184V214M158 184V214" stroke="#fffaf3" stroke-width="2.500" stroke-linecap="round"/>';
      h += '<path d="M122 230Q150 238 178 230L186 266Q150 274 114 266Z" fill="' + mix(c, -.08) + '" stroke="' + d + '" stroke-width="1.800" stroke-linejoin="round"/><path d="M104 268Q150 282 196 268" stroke="' + d + '" stroke-width="4" fill="none"/>';
    } else {
      h += '<path d="M114 160Q150 176 186 160L192 270Q150 282 108 270Z" fill="#fffaf3"/>';
      h += '<path d="M138 156L108 164C104 200 112 240 112 276L148 280L148 190Z" fill="' + c + '"/><path d="M162 156L192 164C196 200 188 240 188 276L152 280L152 190Z" fill="' + c + '"/>';
      h += sleeve(s, -1, c, d, false) + sleeve(s, 1, c, d, false);
      h += '<path d="M138 156L126 170 148 198 150 166Z" fill="' + l + '" stroke="' + d + '" stroke-width="1.500" stroke-linejoin="round"/><path d="M162 156L174 170 152 198 150 166Z" fill="' + l + '" stroke="' + d + '" stroke-width="1.500" stroke-linejoin="round"/>';
      h += '<circle cx="144" cy="232" r="3" fill="#f6d56e"/><circle cx="156" cy="232" r="3" fill="#f6d56e"/><path d="M112 276L148 280M188 276L152 280" stroke="' + d + '" stroke-width="2"/>';
    }
    return h;
  }

  /* ---- everyday bottoms ---- */
  function bottoms(s) {
    var c = BOTC[s.botC], d = mix(c, -.22), l = mix(c, .3), k = BOTTOM[s.bottom], h = '';
    if (k === 'jeans') {
      h += '<path d="M108 250L150 262 192 250 192 468 154 468 150 332 146 468 108 468Z" fill="' + c + '"/>';
      h += '<path d="M108 452H146M154 452H192" stroke="' + l + '" stroke-width="9" opacity=".7"/><path d="M146 266L150 332 154 266" stroke="' + d + '" stroke-width="1.800" fill="none"/>';
      h += '<path d="M118 262C124 276 132 282 142 280M182 262C176 276 168 282 158 280" stroke="' + d + '" stroke-width="2" fill="none" stroke-dasharray="4 3"/>';
      h += '<path d="M124 300C122 360 120 410 118 452M176 300C178 360 180 410 182 452" stroke="' + l + '" stroke-width="3" fill="none" opacity=".4"/>';
      h += '<path d="M104 248Q150 264 196 248L195 262Q150 278 105 262Z" fill="' + d + '"/><rect x="144" y="252" width="12" height="9" rx="1.500" fill="#f6d56e"/>';
    } else if (k === 'wide') {
      h += '<path d="M108 250L150 262 192 250 218 470 156 470 150 340 144 470 82 470Z" fill="' + c + '"/>';
      h += '<path d="M122 266L108 468M178 266L192 468" stroke="' + d + '" stroke-width="2" fill="none" opacity=".4"/><path d="M150 262V340" stroke="' + d + '" stroke-width="2" opacity=".5"/>';
      h += '<path d="M104 248Q150 264 196 248L195 262Q150 278 105 262Z" fill="' + d + '"/><rect x="144" y="252" width="12" height="9" rx="1.500" fill="#f6d56e"/>';
    } else if (k === 'midi') {
      h += '<path d="M108 250Q150 268 192 250L226 432Q150 450 74 432Z" fill="' + c + '"/>';
      h += '<path d="M118 262L96 438M134 266L124 442M150 268V446M166 266L176 442M182 262L204 438" stroke="' + d + '" stroke-width="2" fill="none" opacity=".4"/>';
      h += '<path d="M104 248Q150 264 196 248L195 262Q150 278 105 262Z" fill="' + d + '"/>';
    } else {
      h += '<path d="M108 250Q150 268 192 250L218 338Q150 352 82 338Z" fill="' + c + '"/>';
      h += '<path d="M118 262L100 340M134 266L126 346M150 268V348M166 266L174 346M182 262L200 340" stroke="' + d + '" stroke-width="2" fill="none" opacity=".4"/>';
      h += '<path d="M104 248Q150 264 196 248L195 262Q150 278 105 262Z" fill="' + d + '"/>';
    }
    return h;
  }

  function shoes(s) {
    var a = PAL[s.accent], d = mix(a, -.25), k = SHOES[s.shoes], h = '';
    [138, 162].forEach(function (x, i) {
      var f = i ? 1 : -1;
      if (k === 'flats') h += '<ellipse cx="' + (x + f * 4) + '" cy="488" rx="14" ry="7" fill="' + a + '" stroke="' + d + '" stroke-width="2"/>';
      else if (k === 'heels') h += '<path d="M' + (x - 9) + ' 476h18l' + (f * 8) + ' 12H' + (x - 14) + 'z" fill="' + a + '" stroke="' + d + '" stroke-width="2" stroke-linejoin="round"/><rect x="' + (x - f * 8 - 2) + '" y="486" width="4" height="10" fill="' + d + '"/><circle cx="' + (x - 3) + '" cy="480" r="1.800" fill="#fff" opacity=".8"/>';
      else if (k === 'boots') h += '<path d="M' + (x - 10) + ' 446h20v34q' + f * 12 + ' 2 ' + f * 14 + ' 12H' + (x - 12) + 'z" fill="' + a + '" stroke="' + d + '" stroke-width="2" stroke-linejoin="round"/><rect x="' + (x - 10) + '" y="446" width="20" height="6" fill="' + d + '"/>';
      else h += '<ellipse cx="' + (x + f * 4) + '" cy="486" rx="15" ry="9" fill="#fffaf3" stroke="' + d + '" stroke-width="2"/><path d="M' + (x - 8 + f * 4) + ' 484q8 5 16 0" stroke="' + a + '" stroke-width="3.500" fill="none" stroke-linecap="round"/><rect x="' + (x - 6 + f * 4) + '" y="478" width="12" height="4" rx="2" fill="' + a + '"/>';
    });
    return h;
  }

  function headgear(s) {
    var a = PAL[s.accent], d = mix(a, -.25), k = HEAD[s.head];
    if (k === 'tiara') return '<path d="M116 52L122 28 138 44 150 20 162 44 178 28 184 52Q150 44 116 52Z" fill="#f6d56e" stroke="#c9962a" stroke-width="2.500" stroke-linejoin="round"/><circle cx="150" cy="30" r="4" fill="' + a + '"/><circle cx="127" cy="42" r="3" fill="' + a + '"/><circle cx="173" cy="42" r="3" fill="' + a + '"/>';
    if (k === 'bow') return bow(124, 38, .8, a);
    if (k === 'flowers') { var h = ''; [[112, 66], [124, 50], [138, 42], [150, 38], [162, 42], [176, 50], [188, 66]].forEach(function (p, i) { h += flower(p[0], p[1], 8, [a, '#fff', '#fbe39a'][i % 3]); }); return h; }
    if (k === 'beret') return '<ellipse cx="144" cy="46" rx="48" ry="22" transform="rotate(-8 144 46)" fill="' + a + '" stroke="' + d + '" stroke-width="2.500"/><circle cx="150" cy="22" r="5" fill="' + d + '"/>';
    return '';
  }
  function hijabBack(s) {
    if (HEAD[s.head] !== 'hijab') return '';
    var a = PAL[s.accent], d = mix(a, -.2);
    return '<path d="M100 92C94 30 140 14 150 14 160 14 206 30 200 92 200 124 218 156 226 204 200 226 176 228 150 228 124 228 100 226 74 204 82 156 100 124 100 92Z" fill="' + a + '" stroke="' + d + '" stroke-width="2.500" stroke-linejoin="round"/><path d="M118 150C124 190 118 214 106 222M182 150C176 190 182 214 194 222" stroke="' + d + '" stroke-width="2.500" fill="none" opacity=".5"/>';
  }
  function hijabFront(s) {
    if (HEAD[s.head] !== 'hijab') return '';
    var a = PAL[s.accent], d = mix(a, -.2);
    return '<path d="M106 92C104 46 196 46 194 92 184 66 164 58 150 58 136 58 116 66 106 92Z" fill="' + a + '" stroke="' + d + '" stroke-width="2.500" stroke-linejoin="round"/>';
  }

  function face(s, skin) {
    var d = mix(skin, -.14), shades = s.extras.indexOf('shades') > -1;
    var h = '<rect x="136" y="122" width="28" height="36" rx="10" fill="' + d + '"/><ellipse cx="150" cy="90" rx="42" ry="46" fill="' + skin + '"/><ellipse cx="108.500" cy="94" rx="6" ry="9" fill="' + skin + '"/><ellipse cx="191.500" cy="94" rx="6" ry="9" fill="' + skin + '"/>';
    h += '<circle cx="126" cy="106" r="8" fill="#ff7fa6" opacity=".32"/><circle cx="174" cy="106" r="8" fill="#ff7fa6" opacity=".32"/>';
    if (!shades) h += '<ellipse cx="133" cy="92" rx="4.500" ry="6.500" fill="#3a2420"/><ellipse cx="167" cy="92" rx="4.500" ry="6.500" fill="#3a2420"/><circle cx="134.800" cy="89.500" r="1.800" fill="#fff"/><circle cx="168.800" cy="89.500" r="1.800" fill="#fff"/><path d="M125 82Q133 77 141 81M159 81Q167 77 175 82" stroke="#3a2420" stroke-width="2.200" fill="none" stroke-linecap="round"/><path d="M127 88l-4-2M173 88l4-2" stroke="#3a2420" stroke-width="2" stroke-linecap="round"/>';
    h += '<path d="M150 98q-3 8 1 9" stroke="' + mix(skin, -.28) + '" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M139 114Q150 124 161 114" stroke="#b0453f" stroke-width="3.200" fill="none" stroke-linecap="round"/>';
    if (shades) { var a = PAL[s.accent]; h += '<g fill="#6d1b3f" stroke="' + a + '" stroke-width="3" stroke-linejoin="round"><path transform="translate(133 91) scale(1.100)" d="M0 14C-18 2-18-8-9-9-3-10 0-5 0-5S3-10 9-9C18-8 18 2 0 14z"/><path transform="translate(167 91) scale(1.100)" d="M0 14C-18 2-18-8-9-9-3-10 0-5 0-5S3-10 9-9C18-8 18 2 0 14z"/></g><path d="M147 88h6" stroke="' + a + '" stroke-width="3"/>'; }
    return h;
  }

  function extrasFront(s) {
    var a = PAL[s.accent], d = mix(a, -.2), h = '';
    s.extras.forEach(function (k) {
      if (k === 'boa') h += '<path d="M96 168Q150 214 204 168" stroke="' + a + '" stroke-width="22" stroke-linecap="round" fill="none"/><path d="M96 168Q150 214 204 168" stroke="' + mix(a, .5) + '" stroke-width="22" stroke-linecap="round" fill="none" stroke-dasharray="3 9"/><path d="M104 176Q84 230 96 262M196 176Q216 230 204 262" stroke="' + a + '" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M104 176Q84 230 96 262M196 176Q216 230 204 262" stroke="' + mix(a, .5) + '" stroke-width="18" stroke-linecap="round" fill="none" stroke-dasharray="3 9"/>';
      if (k === 'pearls') { for (var i = 0; i < 9; i++) { var t = i / 8, x = 122 + t * 56, y = 166 + Math.sin(t * Math.PI) * 18; h += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="4.500" fill="#fffaf3" stroke="#e5cfd2" stroke-width="1.300"/>'; } }
      if (k === 'wand') h += '<path d="M206 296L240 226" stroke="#c9962a" stroke-width="5" stroke-linecap="round"/>' + star(242, 216, 20, '#fbe39a', 2.500) + '<circle cx="206" cy="298" r="10" fill="' + SKIN[s.skin] + '"/>';
      if (k === 'bag') h += '<path d="M92 290Q88 262 74 296" stroke="' + d + '" stroke-width="3" fill="none"/><rect x="62" y="296" width="36" height="28" rx="8" fill="' + a + '" stroke="' + d + '" stroke-width="2.500"/><path d="M62 306H98" stroke="' + d + '" stroke-width="2"/><circle cx="80" cy="306" r="3" fill="#fbe39a"/>';
    });
    return h;
  }

  function build(s, o) {
    o = o || {}; var id = ++uid, skin = SKIN[s.skin], onDress = s.dress > 0, legC = (!onDress && BOTTOM[s.bottom] === 'mini') ? mix(BOTC[s.botC], -.45) : skin;
    var h = o.noBg ? '' : scene(SCENE[s.scene], id);
    h += hairBack(s);
    h += '<g><rect x="130" y="256" width="17" height="226" rx="8" fill="' + legC + '"/><rect x="153" y="256" width="17" height="226" rx="8" fill="' + legC + '"/></g>';
    h += shoes(s);
    h += '<path d="M114 168Q98 232 96 290M186 168Q202 232 204 290" stroke="' + skin + '" stroke-width="17" stroke-linecap="round" fill="none"/><circle cx="96" cy="296" r="9" fill="' + skin + '"/><circle cx="204" cy="296" r="9" fill="' + skin + '"/>';
    h += '<path d="' + TORSO + '" fill="' + skin + '"/>';
    if (onDress) h += dress(s); else h += bottoms(s) + tops(s);
    h += hijabBack(s);
    h += face(s, skin);
    h += hairFront(s) + hijabFront(s) + headgear(s);
    h += extrasFront(s);
    return '<g class="dg">' + h + '</g>';
  }

  var DEF = { skin: 1, top: 1, topC: 4, bottom: 0, botC: 0, dress: 0, dressC: 0, hair: 0, hairC: 1, head: 1, accent: 3, extras: [], shoes: 1, scene: 0 };
  var S = JSON.parse(JSON.stringify(DEF)), STACK = [], TAB = 'top';

  var TABS = {
    top: { n: 'gl_t_top', key: 'top', list: TOP, p: 'gl_tp_', sw: ['topC', PAL, 'gl_c_top'], view: '70 130 160 170', solo: true },
    bottom: { n: 'gl_t_bottom', key: 'bottom', list: BOTTOM, p: 'gl_bt_', sw: ['botC', BOTC, 'gl_c_bottom'], view: '50 240 200 250', solo: true },
    dress: { n: 'gl_t_dress', key: 'dress', list: DRESS, p: 'gl_dr_', sw: ['dressC', PAL, 'gl_c_dress'], view: '34 136 232 350' },
    hair: { n: 'gl_t_hair', key: 'hair', list: HAIR, p: 'gl_h_', sw: ['hairC', HAIRC, 'gl_c_hair'], view: '66 0 168 210' },
    head: { n: 'gl_t_head', key: 'head', list: HEAD, p: 'gl_g_', sw: ['accent', PAL, 'gl_c_accent'], view: '66 0 168 210' },
    extra: { n: 'gl_t_extra', key: 'extras', list: EXTRA, p: 'gl_e_', multi: true, sw: ['accent', PAL, 'gl_c_accent'], view: '34 100 232 300' },
    shoes: { n: 'gl_t_shoes', key: 'shoes', list: SHOES, p: 'gl_s_', sw: ['accent', PAL, 'gl_c_accent'], view: '86 410 128 100' },
    scene: { n: 'gl_t_scene', key: 'scene', list: SCENE, p: 'gl_b_', view: '0 0 300 520', bg: true },
    skin: { n: 'gl_t_skin', key: 'skin', list: null, sw: ['skin', SKIN, 'gl_c_skin'], view: '70 10 160 180' }
  };
  var TAB0 = 'top';

  function copy(o) { return JSON.parse(JSON.stringify(o)); }
  function push() { STACK.push(copy(S)); if (STACK.length > 40) STACK.shift(); }
  function drawDoll() { $('#doll').innerHTML = build(S); }

  function drawPanel() {
    var cfg = TABS[TAB], tabs = $('#dTabs'), opts = $('#dOpts'), sw = $('#dSw');
    tabs.innerHTML = '';
    Object.keys(TABS).forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'gl-tab' + (k === TAB ? ' is-on' : ''); b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', k === TAB ? 'true' : 'false');
      b.textContent = T(TABS[k].n); b.addEventListener('click', function () { TAB = k; drawPanel(); }); tabs.appendChild(b);
    });
    opts.innerHTML = '';
    if (cfg.list) {
      cfg.list.forEach(function (name, i) {
        var on = cfg.multi ? S[cfg.key].indexOf(name) > -1 : S[cfg.key] === i;
        var trial = copy(S); if (cfg.multi) { if (on) trial.extras.splice(trial.extras.indexOf(name), 1); else trial.extras.push(name); } else trial[cfg.key] = i;
        if (cfg.key === 'head' && i !== 4) { /* keep hair visible for thumbs */ }
        var b = document.createElement('button'); b.type = 'button'; b.className = 'gl-opt' + (on ? ' is-on' : ''); b.setAttribute('aria-pressed', on ? 'true' : 'false');
        var th = copy(S); if (cfg.multi) { th.extras = [name]; } else th[cfg.key] = i; if (cfg.solo) th.dress = 0;
        b.innerHTML = '<svg viewBox="' + cfg.view + '" aria-hidden="true">' + build(th, { noBg: !cfg.bg }) + '</svg><span>' + T(cfg.p + (cfg.multi || cfg.key !== 'head' && cfg.key !== 'hair' && cfg.key !== 'dress' && cfg.key !== 'shoes' && cfg.key !== 'scene' ? name : name)) + '</span>';
        b.addEventListener('click', function () {
          push();
          if (cfg.multi) { var ix = S.extras.indexOf(name); if (ix > -1) S.extras.splice(ix, 1); else S.extras.push(name); } else S[cfg.key] = i; if (cfg.solo) S.dress = 0;
          drawDoll(); drawPanel(); bounceDoll();
        });
        opts.appendChild(b);
      });
    }
    sw.innerHTML = '';
    if (cfg.sw) {
      var lab = document.createElement('p'); lab.className = 'gl-swatches__l'; lab.textContent = T(cfg.sw[2]); sw.appendChild(lab);
      var row = document.createElement('div'); row.className = 'gl-swatches__r';
      cfg.sw[1].forEach(function (col, i) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'gl-sw' + (S[cfg.sw[0]] === i ? ' is-on' : ''); b.style.background = col; b.setAttribute('aria-label', col); b.setAttribute('aria-pressed', S[cfg.sw[0]] === i ? 'true' : 'false');
        b.addEventListener('click', function () { push(); S[cfg.sw[0]] = i; if (cfg.solo) S.dress = 0; drawDoll(); drawPanel(); bounceDoll(); });
        row.appendChild(b);
      });
      sw.appendChild(row);
    }
    $('#dUndo').disabled = !STACK.length;
  }

  function bounceDoll() {
    if (reduce) return; var d = $('#doll');
    d.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.035) rotate(-.8deg)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'cubic-bezier(.3,1.5,.5,1)' });
  }

  function rnd(n) { return Math.floor(Math.random() * n); }
  function surprise() {
    push();
    S = { skin: S.skin, top: rnd(TOP.length), topC: rnd(PAL.length), bottom: rnd(BOTTOM.length), botC: rnd(BOTC.length), dress: Math.random() < .3 ? 1 + rnd(DRESS.length - 1) : 0, dressC: rnd(PAL.length), hair: rnd(HAIR.length), hairC: rnd(HAIRC.length), head: rnd(HEAD.length), accent: rnd(PAL.length), extras: [], shoes: rnd(SHOES.length), scene: rnd(SCENE.length) };
    EXTRA.forEach(function (e) { if (Math.random() < .35) S.extras.push(e); });
    if (S.accent === S.dressC) S.accent = (S.accent + 3) % PAL.length;
    drawDoll(); drawPanel(); bounceDoll();
    var r = $('#dollStage').getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 12, 150);
  }

  /* names */
  var NM = {
    en: { t: ['Duchess', 'Princess', 'Queen', 'Lady', 'Countess', 'Madame'], n: ['Pearl', 'Glitterbelle', 'Rosabelle', 'Starlight', 'Marigold', 'Velvetta', 'Sugarplum', 'Peony', 'Twinkle', 'Bonbon'], a: ['the Fearless', 'the Brilliant', 'the Unstoppable', 'the Radiant', 'the Bold', 'the Marvellous'], w: ['radiant', 'splendid', 'glamorous', 'marvellous', 'elegant', 'dazzling', 'magnificent'] },
    ar: { t: ['الدوقة', 'الأميرة', 'الملكة', 'السيدة', 'الكونتيسة', 'الآنسة'], n: ['لؤلؤة', 'نجمة', 'ياسمينة', 'وردة', 'سُكّرة', 'غيمة', 'فراشة', 'دانة', 'ريمة', 'شمس'], a: ['الجريئة', 'اللامعة', 'التي لا تُقهر', 'المشعّة', 'الشجاعة', 'الرائعة'], w: ['مشعّة', 'رائعة', 'أنيقة', 'ساحرة', 'مذهلة', 'متألقة', 'فاخرة'] }
  };
  function newName() {
    var N = NM[L()];
    $('#lookName').textContent = PICK(N.t) + ' ' + PICK(N.n) + ' ' + PICK(N.a);
    $('#lookWord').textContent = T('gl_word', { w: PICK(N.w) });
    if (!reduce) $('#lookName').animate([{ transform: 'scale(.8)', opacity: 0 }, { transform: 'scale(1.06)', opacity: 1, offset: .6 }, { transform: 'scale(1)', opacity: 1 }], { duration: 480, easing: 'cubic-bezier(.3,1.4,.5,1)' });
  }
  function openLook() {
    $('#lookDoll').innerHTML = build(S); newName();
    var d = $('#lookDlg'); if (!d.open) d.showModal();
    setTimeout(function () { var r = $('.gl-look__frame', d).getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 90, 16, 170); }, 250);
  }

  function initStudio() {
    drawDoll(); drawPanel();
    $('#dSurprise').addEventListener('click', surprise);
    $('#dUndo').addEventListener('click', function () { if (!STACK.length) return; S = STACK.pop(); drawDoll(); drawPanel(); });
    $('#dReset').addEventListener('click', function () { push(); S = copy(DEF); drawDoll(); drawPanel(); bounceDoll(); });
    $('#dDone').addEventListener('click', openLook);
    $('#lookNew').addEventListener('click', newName);
  }

  window.GL = { build: build, DEF: DEF };

  /* ------------------------------------------------------------------ boot */
  function init() {
    window.SYNC.apply(); buildDeck(); tickMarket(); setInterval(tickMarket, 1000);
    wireDialogs(); initStudio();
    document.addEventListener('syncit:lang', function () { buildDeck(); tickMarket(); drawPanel(); if ($('#lookDlg').open) newName(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
