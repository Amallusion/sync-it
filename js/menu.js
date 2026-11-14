/* Sync it — menu page.
   1. the hero: muted video, then coffee pours in and milk rises, driven by scroll
   2. arched sections (one open at a time) with item cards
   3. an item dialog with short descriptions, prev / next
   4. "Our coffee" */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------ content */
  var BEIGE = '#f4e3d1', WHITE = '#f6f6f6';
  // id, category, image, background of the photo, [EN name, EN text], [AR name, AR text]
  var ITEMS = [
    ['iced-americano', 'cold', BEIGE, ['Iced Americano', 'Two shots of our espresso over ice and cold water. Clean, bold and bright.'], ['أمريكانو مثلج', 'جرعتان من الإسبريسو فوق الثلج والماء البارد. نظيف وجريء ومنعش.']],
    ['iced-latte', 'cold', BEIGE, ['Iced Latte', 'Espresso poured into cold milk over ice. Smooth, creamy and easy to sip.'], ['لاتيه مثلج', 'إسبريسو يُسكب على حليب بارد وثلج. ناعم وكريمي وسهل الشرب.']],
    ['iced-macchiato', 'cold', BEIGE, ['Iced Macchiato', 'Cold milk with espresso poured on top, so you get two layers in one glass.'], ['ماكياتو مثلج', 'حليب بارد يعلوه الإسبريسو، فتحصل على طبقتين في كوب واحد.']],
    ['iced-mocha', 'cold', BEIGE, ['Iced Mocha', 'Espresso, chocolate and cold milk, finished with whipped cream and a chocolate drizzle.'], ['موكا مثلج', 'إسبريسو وشوكولاتة وحليب بارد، يعلوها الكريمة المخفوقة وخيوط الشوكولاتة.']],
    ['iced-matcha', 'cold', BEIGE, ['Iced Matcha', 'Matcha whisked with cold milk over ice. Earthy, fresh and lightly sweet.'], ['ماتشا مثلج', 'ماتشا مخفوقة مع حليب بارد وثلج. بنكهة ترابية منعشة وحلاوة خفيفة.']],
    ['hot-chocolate', 'hot', BEIGE, ['Hot Chocolate', 'Rich chocolate steamed with milk until velvety, served hot in our Sync it cup.'], ['هوت شوكلت', 'شوكولاتة غنية تُبخَّر مع الحليب حتى تصبح مخملية، تُقدَّم ساخنة في كوب سينك إت.']],
    ['marshmallow-hot-chocolate', 'hot', BEIGE, ['Marshmallow Hot Chocolate', 'Our hot chocolate topped with whipped cream and colorful marshmallows.'], ['هوت شوكلت بالمارشميلو', 'هوت شوكلت الخاص بنا يعلوه الكريمة المخفوقة ومارشميلو ملوّن.']],
    ['tea', 'hot', BEIGE, ['Tea', 'Hot black tea, brewed to order and served with the tag on the side.'], ['شاي', 'شاي أسود ساخن يُحضَّر عند الطلب ويُقدَّم مع كيس الشاي.']],
    ['mango-mojito', 'mojito', BEIGE, ['Mango Mojito', 'Fresh mint and lime with sweet mango, topped with sparkling water and ice. No alcohol.'], ['موهيتو المانجو', 'نعناع وليمون طازج مع مانجو حلوة، يعلوها الماء الغازي والثلج. بدون كحول.']],
    ['strawberry-mojito', 'mojito', BEIGE, ['Strawberry Mojito', 'Fresh mint and lime with strawberry, topped with sparkling water and ice. No alcohol.'], ['موهيتو الفراولة', 'نعناع وليمون طازج مع الفراولة، يعلوها الماء الغازي والثلج. بدون كحول.']],
    ['mango-bubble-tea', 'bubble', BEIGE, ['Mango Bubble Tea', 'Mango fruit tea over ice with chewy golden pearls. Use the wide straw.'], ['بابل تي المانجو', 'شاي المانجو بالثلج مع لؤلؤ ذهبي طري. استخدم الشفاطة العريضة.']],
    ['strawberry-bubble-tea', 'bubble', BEIGE, ['Strawberry Bubble Tea', 'Strawberry fruit tea over ice with chewy strawberry pearls at the bottom.'], ['بابل تي الفراولة', 'شاي الفراولة بالثلج مع لؤلؤ الفراولة الطري في القاع.']],
    ['chocolate-donut', 'dessert', '#f4e6d4', ['Chocolate Donut', 'A chocolate donut with a chocolate drizzle and crunchy chocolate crumbs.'], ['دونات الشوكولاتة', 'دونات بالشوكولاتة مع خيوط الشوكولاتة ورقائق مقرمشة.']],
    ['fudge-cake', 'dessert', WHITE, ['Chocolate Fudge Cake', 'Layers of dark chocolate sponge and fudge frosting, with a swirl on top.'], ['كيكة الشوكولاتة الفادج', 'طبقات من إسفنج الشوكولاتة الداكنة وكريمة الفادج، مع دوّامة في الأعلى.']],
    ['tiramisu', 'dessert', '#eceae6', ['Tiramisu', 'Coffee-soaked ladyfingers layered with mascarpone cream and dusted with cocoa.'], ['تيراميسو', 'بسكويت مبلل بالقهوة بطبقات من كريمة الماسكاربوني ومرشوش بالكاكاو.']],
    ['velvet-cheesecake', 'dessert', WHITE, ['Velvet Cheesecake', 'A red velvet base under a smooth cheesecake layer, served with a berry sauce.'], ['تشيز كيك ريد فلفت', 'قاعدة ريد فلفت تحت طبقة تشيز كيك ناعمة، تُقدَّم مع صلصة التوت.']]
  ];
  // The best-seller ranking is a placeholder guess until the cafe gives real numbers.
  var BEST = ['iced-latte', 'iced-mocha', 'strawberry-mojito', 'velvet-cheesecake', 'mango-bubble-tea'];
  var CATS = [
    { id: 'best', icon: '<path d="M12 3l2.6 5.6 6 .7-4.4 4.1 1.2 6L12 16.5 6.6 19.4l1.2-6L3.4 9.3l6-.7z"/>' },
    { id: 'cold', icon: '<path d="M7 5h10l-1.2 15H8.2zM7.6 10h8.8M13 5l2-3"/>' },
    { id: 'hot', icon: '<path d="M5 10h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 11h2a2.5 2.5 0 0 1 0 5h-2M9 3c-1 1.5 1 2.5 0 4M13 3c-1 1.5 1 2.5 0 4"/>' },
    { id: 'mojito', icon: '<path d="M6 5h12l-1.4 14H7.4zM9 5c0 3 6 3 6 0M14 5l3-3M10 12c1.5 1.5 3 1.5 4 0"/>' },
    { id: 'bubble', icon: '<path d="M6.5 8h11l-1.3 12H7.8zM6 8c1-3 11-3 12 0M14 8l3-5"/><circle cx="10" cy="17" r="1.2"/><circle cx="13.6" cy="17.4" r="1.2"/><circle cx="12" cy="14.4" r="1.2"/>' },
    { id: 'dessert', icon: '<path d="M4 17h16v3H4zM5 17c0-5 3-8 7-8s7 3 7 8M12 9V5M10 5h4"/>' },
    { id: 'coffee', icon: '<path d="M6 9h10v5a5 5 0 0 1-5 5 5 5 0 0 1-5-5zM16 10h1.5a2.3 2.3 0 0 1 0 4.6H16M8 4l1 2M12 3l1 3"/>' }
  ];
  var byId = {}; ITEMS.forEach(function (it) { byId[it[0]] = it; });

  var en = {
    m_title: 'The Menu', m_sub: 'Cold, hot, fresh and sweet. Open a section, then tap an item to see what is in it.', m_cta: 'Explore the menu', m_mid: 'What are you having?', m_scroll: 'Scroll',
    m_intro_h: 'Pick a section', m_intro_p: 'One section opens at a time. The best sellers are the five most ordered.', m_chips: 'Menu sections', m_items: 'items',
    c_best: 'Best sellers', c_cold: 'Cold drinks', c_hot: 'Hot drinks', c_mojito: 'Mojitos', c_bubble: 'Bubble tea', c_dessert: 'Desserts', c_coffee: 'Our coffee',
    c_best_s: 'The five most ordered', c_coffee_s: 'Where it comes from and how we make it',
    d_close: 'Close', d_prev: 'Previous item', d_next: 'Next item', d_of: 'of',
    ci_lead: 'Every cup starts with one house blend, ground fresh and pulled to order.',
    ci_o_h: 'Where it comes from',
    ci_o_p: 'The blend pairs washed Ethiopian beans, bright and floral, with Brazilian beans that bring chocolate and nuts. A little Colombian coffee adds body. We roast medium-dark in small batches and receive fresh beans every week.',
    ci_p_h: 'How it is prepared',
    ci_s1: 'Grind to order', ci_s1d: 'Beans are ground just before each shot, so nothing sits and goes stale.',
    ci_s2: 'Tamp and pull', ci_s2d: 'A level tamp, then about 28 seconds of extraction on our Cimbali machine.',
    ci_s3: 'Steam or chill', ci_s3d: 'Milk is steamed for hot drinks. Cold drinks are poured over ice and stirred.',
    ci_s4: 'Served in a Sync it cup', ci_s4d: 'Every drink arrives in our red cup with the two suns.',
    ci_f1: 'Medium-dark roast', ci_f2: 'Double shot as standard', ci_f3: 'Fresh milk daily'
  };
  var ar = {
    m_title: 'القائمة', m_sub: 'بارد وساخن ومنعش وحلو. افتح قسماً ثم اضغط على أي صنف لتعرف ما فيه.', m_cta: 'استكشف القائمة', m_mid: 'ماذا تشرب اليوم؟', m_scroll: 'مرّر',
    m_intro_h: 'اختر قسماً', m_intro_p: 'يُفتح قسم واحد في كل مرة. الأكثر طلباً هي أكثر خمسة أصناف مبيعاً.', m_chips: 'أقسام القائمة', m_items: 'أصناف',
    c_best: 'الأكثر طلباً', c_cold: 'مشروبات باردة', c_hot: 'مشروبات ساخنة', c_mojito: 'موهيتو', c_bubble: 'بابل تي', c_dessert: 'حلويات', c_coffee: 'قهوتنا',
    c_best_s: 'أكثر خمسة أصناف طلباً', c_coffee_s: 'من أين تأتي وكيف نحضّرها',
    d_close: 'إغلاق', d_prev: 'الصنف السابق', d_next: 'الصنف التالي', d_of: 'من',
    ci_lead: 'كل كوب يبدأ بخلطة واحدة خاصة بنا، تُطحن طازجة وتُحضَّر عند الطلب.',
    ci_o_h: 'من أين تأتي',
    ci_o_p: 'تجمع الخلطة بين حبوب إثيوبية مغسولة بنكهة زهرية منعشة، وحبوب برازيلية بنكهة الشوكولاتة والمكسرات، مع قليل من البن الكولومبي لإعطاء القوام. نحمّصها تحميصاً متوسطاً غامقاً على دفعات صغيرة، ونستلم حبوباً طازجة كل أسبوع.',
    ci_p_h: 'كيف تُحضَّر',
    ci_s1: 'نطحن عند الطلب', ci_s1d: 'تُطحن الحبوب قبل كل جرعة مباشرة، فلا شيء ينتظر ويفقد نكهته.',
    ci_s2: 'نكبس ونستخلص', ci_s2d: 'كبس متساوٍ ثم استخلاص نحو ٢٨ ثانية على ماكينة سيمبالي.',
    ci_s3: 'نبخّر أو نبرّد', ci_s3d: 'يُبخَّر الحليب للمشروبات الساخنة، وتُسكب المشروبات الباردة فوق الثلج وتُقلَّب.',
    ci_s4: 'تُقدَّم في كوب سينك إت', ci_s4d: 'يصلك كل مشروب في كوبنا الأحمر بالشمسين.',
    ci_f1: 'تحميص متوسط غامق', ci_f2: 'جرعة مزدوجة افتراضياً', ci_f3: 'حليب طازج يومياً'
  };
  ITEMS.forEach(function (it) { en['i_' + it[0] + '_n'] = it[3][0]; en['i_' + it[0] + '_d'] = it[3][1]; ar['i_' + it[0] + '_n'] = it[4][0]; ar['i_' + it[0] + '_d'] = it[4][1]; });
  SYNC.extend({ en: en, ar: ar });
  var t = SYNC.t;

  /* ------------------------------------------------------------ build the page */
  var secs = $('#msecs'), chips = $('#chips');
  function card(id, rank) {
    var it = byId[id];
    return '<button class="card" type="button" data-id="' + id + '">' +
      '<span class="card__ph">' + (rank ? '<span class="rank" aria-hidden="true">' + SYNC.num(rank) + '</span>' : '') +
      '<img src="assets/menu/' + id + '.jpg" alt="" loading="lazy" decoding="async"></span>' +
      '<span class="card__n" data-i18n="i_' + id + '_n">' + it[3][0] + '</span></button>';
  }
  function coffeeBlock() {
    return '<div class="coffee"><div class="coffee__ph"><img src="assets/menu/coffee-info.jpg" alt="" loading="lazy"></div><div class="coffee__txt">' +
      '<p class="coffee__lead" data-i18n="ci_lead"></p>' +
      '<div><h3 data-i18n="ci_o_h"></h3><p data-i18n="ci_o_p"></p></div>' +
      '<div><h3 data-i18n="ci_p_h"></h3><ol class="steps">' +
      [1, 2, 3, 4].map(function (n) { return '<li><span><b data-i18n="ci_s' + n + '"></b><span data-i18n="ci_s' + n + 'd"></span></span></li>'; }).join('') +
      '</ol></div><div class="facts"><span data-i18n="ci_f1"></span><span data-i18n="ci_f2"></span><span data-i18n="ci_f3"></span></div></div></div>';
  }
  function build() {
    var h = '', c = '';
    CATS.forEach(function (cat) {
      var list = cat.id === 'best' ? BEST : ITEMS.filter(function (i) { return i[1] === cat.id; }).map(function (i) { return i[0]; });
      var body = cat.id === 'coffee' ? coffeeBlock() :
        '<div class="grid' + (cat.id === 'best' ? ' grid--best' : '') + '" data-list="' + cat.id + '">' + list.map(function (id, i) { return card(id, cat.id === 'best' ? i + 1 : 0); }).join('') + '</div>';
      h += '<section class="msec' + (cat.id === 'best' ? ' msec--best' : '') + '" id="' + cat.id + '" data-cat="' + cat.id + '">' +
        '<h2 class="msec__h"><button class="msec__btn" type="button" aria-expanded="false" aria-controls="p-' + cat.id + '">' +
        '<span class="msec__ico" aria-hidden="true"><svg viewBox="0 0 24 24">' + cat.icon + '</svg></span>' +
        '<span class="msec__t"><b data-i18n="c_' + cat.id + '"></b><small data-count="' + cat.id + '" data-n="' + list.length + '"></small></span>' +
        '<span class="msec__pm" aria-hidden="true"></span></button></h2>' +
        '<div class="msec__panel" id="p-' + cat.id + '"><div class="msec__in">' + body + '</div></div></section>';
      c += '<button class="chip' + (cat.id === 'best' ? ' chip--best' : '') + '" type="button" data-go="' + cat.id + '" aria-pressed="false" data-i18n="c_' + cat.id + '"></button>';
    });
    secs.innerHTML = h; chips.innerHTML = c;
    SYNC.apply(document);
    counts();
  }
  function counts() {
    $$('[data-count]').forEach(function (s) {
      var id = s.getAttribute('data-count'), n = +s.getAttribute('data-n');
      s.textContent = id === 'coffee' ? t('c_coffee_s') : id === 'best' ? t('c_best_s') : SYNC.num(n) + ' ' + t('m_items');
    });
    $$('.rank').forEach(function (r, i) { r.textContent = SYNC.num(i + 1); });
  }

  /* ------------------------------------------------------------ sections */
  var openId = '';
  function openSection(id, scroll, quiet) {
    var same = openId === id;
    $$('.msec').forEach(function (s) {
      var on = s.id === id && !same;
      s.classList.toggle('is-open', on);
      $('.msec__btn', s).setAttribute('aria-expanded', on ? 'true' : 'false');
    });
    openId = same ? '' : id;
    $$('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-go') === openId ? 'true' : 'false'); });
    if (scroll && openId) {
      var go = function () { $('#' + id).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); };
      setTimeout(go, 80); setTimeout(go, 560);
    }
    if (!quiet && history.replaceState) history.replaceState(null, '', openId ? '#' + openId : location.pathname + location.search);
  }
  secs.addEventListener('click', function (e) {
    var b = e.target.closest('.msec__btn');
    if (b) { openSection(b.closest('.msec').id, true); return; }
    var c = e.target.closest('.card');
    if (c) showItem(c.getAttribute('data-id'), c.closest('.grid').getAttribute('data-list'), c);
  });
  chips.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'); if (!c) return;
    var id = c.getAttribute('data-go');
    if (openId === id) { $('#' + id).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); return; }
    openSection(id, true);
  });

  /* ------------------------------------------------------------ dialog */
  var dlg = $('#idlg'), curList = [], curIdx = 0;
  function listFor(listId) {
    return listId === 'best' ? BEST : ITEMS.filter(function (i) { return i[1] === listId; }).map(function (i) { return i[0]; });
  }
  function fill() {
    var id = curList[curIdx], it = byId[id];
    $('#idImg').src = 'assets/menu/' + id + '.jpg';
    $('#idPh').style.background = it[2];
    $('#idName').textContent = t('i_' + id + '_n');
    $('#idDesc').textContent = t('i_' + id + '_d');
    $('#idCat').textContent = t('c_' + (curList.length === BEST.length && curList[0] === BEST[0] ? 'best' : it[1]));
    $('#idCount').textContent = SYNC.num(curIdx + 1) + ' ' + t('d_of') + ' ' + SYNC.num(curList.length);
  }
  function showItem(id, listId, from) {
    curList = listFor(listId); curIdx = Math.max(0, curList.indexOf(id));
    if (from) {
      var r = from.getBoundingClientRect(), W = innerWidth, H = innerHeight;
      dlg.style.setProperty('--ox', Math.round((r.left + r.width / 2 - (W - Math.min(940, W * .94)) / 2) / Math.min(940, W * .94) * 100) + '%');
      dlg.style.setProperty('--oy', Math.round((r.top + r.height / 2) / H * 100) + '%');
    }
    fill(); if (!dlg.open) dlg.showModal();
  }
  function step(d) { curIdx = (curIdx + d + curList.length) % curList.length; fill(); }
  $('#idPrev').addEventListener('click', function () { step(document.documentElement.dir === 'rtl' ? 1 : -1); });
  $('#idNext').addEventListener('click', function () { step(document.documentElement.dir === 'rtl' ? -1 : 1); });
  $('#idX').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    var rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') step(rtl ? -1 : 1); if (e.key === 'ArrowLeft') step(rtl ? 1 : -1);
  });
  document.addEventListener('syncit:lang', function () { counts(); if (dlg.open) fill(); });

  /* ------------------------------------------------------------ coffee, then milk */
  var mid = $('#mmid'), hero = $('#mhero'), copy = $('#mcopy'), hint = $('#mhint'), vid = $('#mvid');
  var P = {}; ['fCoffee', 'fSw1', 'fSw2', 'fSw3', 'fCrema', 'fStream', 'fStreamHi', 'fMilk', 'fMilkEdge'].forEach(function (k) { P[k] = $('#' + k); });
  function edge(L, t, ph, a1, a2, bump) {
    var pts = [], x, y;
    for (x = -20; x <= 1020; x += 20) {
      y = L + a1 * Math.sin(x * .011 + t * 1.25 + ph) + a2 * Math.sin(x * .027 - t * .8 + ph * 2) + bump * Math.exp(-Math.pow((x - 500) / 90, 2)) * Math.sin(t * 7);
      pts.push([x, y]);
    }
    return pts;
  }
  function line(pts) { return 'M' + pts.map(function (p) { return p[0] + ' ' + p[1].toFixed(1); }).join('L'); }
  function fillTo(pts, bottom) { return line(pts) + 'L1020 ' + bottom + 'L-20 ' + bottom + 'Z'; }
  function draw(p, tt) {
    var q1 = ease(clamp((p - .07) / .55, 0, 1)), q2 = ease(clamp((p - .5) / .47, 0, 1));
    var L1 = lerp(1080, -110, q1), L2 = lerp(1080, -110, q2);
    var drop = clamp(p / .09, 0, 1), pouring = p > .005 && L1 > -20 && q2 < .4;
    // the stream falls from the top until it meets the surface
    var bottomY = Math.min(L1 < 1000 ? L1 : 1e9, lerp(0, 1000, ease(drop)));
    var wob = 9 * Math.sin(tt * 3.2);
    var e1 = edge(L1, tt, 0, 12, 6, pouring ? 14 : 0);
    P.fCoffee.setAttribute('d', fillTo(e1, 1100));
    P.fCrema.setAttribute('d', line(e1));
    P.fCrema.style.opacity = L1 < 1060 ? 1 : 0;
    [[P.fSw1, 90, 0.7, 10], [P.fSw2, 190, 1.9, 8], [P.fSw3, 320, 3.1, 14]].forEach(function (s) {
      s[0].setAttribute('d', line(edge(L1 + s[1], tt * .8, s[2], s[3], s[3] * .6, 0)));
    });
    if (pouring && bottomY > 0) {
      var d = 'M500 -30C' + (500 + wob) + ' ' + (bottomY * .35) + ' ' + (500 - wob) + ' ' + (bottomY * .65) + ' 500 ' + bottomY;
      P.fStream.setAttribute('d', d); P.fStreamHi.setAttribute('d', 'M494 -30C' + (494 + wob) + ' ' + (bottomY * .35) + ' ' + (494 - wob) + ' ' + (bottomY * .65) + ' 494 ' + bottomY);
      P.fStream.style.opacity = P.fStreamHi.style.opacity = '1';
    } else { P.fStream.style.opacity = P.fStreamHi.style.opacity = '0'; }
    var e2 = edge(L2, tt * .9, 2.2, 16, 8, 0);
    P.fMilk.setAttribute('d', fillTo(e2, 1100));
    P.fMilkEdge.setAttribute('d', line(e2));
    P.fMilkEdge.style.opacity = L2 < 1060 && L2 > -60 ? .9 : 0;
    copy.style.opacity = String(1 - ease(clamp(p / .1, 0, 1)));
    copy.style.transform = 'translateY(' + (-ease(clamp(p / .2, 0, 1)) * 40) + 'px)';
    copy.style.pointerEvents = p > .12 ? 'none' : '';
    hint.style.opacity = String(1 - clamp(p / .05, 0, 1));
    var m = Math.sin(clamp((p - .34) / .3, 0, 1) * Math.PI); mid.style.opacity = String(m); mid.style.transform = 'translateY(' + ((1 - m) * 30) + 'px)';
    vid.style.transform = 'scale(' + (1 + p * .08) + ')';
  }
  var prog = 0, ticking = false, on = true, t0 = performance.now();
  function progress() {
    var r = hero.getBoundingClientRect(), span = hero.offsetHeight - innerHeight;
    return span > 0 ? clamp(-r.top / span, 0, 1) : 0;
  }
  function loop(now) {
    if (!on) { ticking = false; return; }
    draw(progress(), (now - t0) / 1000);
    requestAnimationFrame(loop);
  }
  if (reduce) {
    // a still band of coffee and milk at the foot of the hero, no scroll animation
    draw(0, 0);
    P.fCoffee.setAttribute('d', fillTo(edge(930, 0, 0, 12, 6, 0), 1100)); P.fCrema.setAttribute('d', line(edge(930, 0, 0, 12, 6, 0))); P.fCrema.style.opacity = 1;
    P.fMilk.setAttribute('d', fillTo(edge(975, 0, 2.2, 14, 6, 0), 1100)); P.fMilkEdge.setAttribute('d', line(edge(975, 0, 2.2, 14, 6, 0))); P.fMilkEdge.style.opacity = .9;
    vid.pause(); vid.removeAttribute('autoplay'); copy.style.opacity = 1; hint.style.display = 'none';
  } else {
    new IntersectionObserver(function (en) {
      on = en[0].isIntersecting;
      if (on && !ticking) { ticking = true; requestAnimationFrame(loop); }
    }, { rootMargin: '100px' }).observe(hero);
    ticking = true; requestAnimationFrame(loop);
  }

  /* ------------------------------------------------------------ go */
  build();
  var h = (location.hash || '').slice(1);
  if (h && byId && CATS.some(function (c) { return c.id === h; })) { openSection(h, false); setTimeout(function () { $('#' + h).scrollIntoView(); }, 50); }
  else openSection('best', false, true);
  // the header measures itself: keep the sticky chips just under it
  function hh() { var x = $('#hdr'); if (x) document.documentElement.style.setProperty('--hh', x.offsetHeight + 'px'); }
  hh(); addEventListener('resize', hh);
})();
