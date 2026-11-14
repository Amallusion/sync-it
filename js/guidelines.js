/* Sync it — Guidelines & FAQ: house rules, a searchable question list and the live open status. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var S = window.SYNC;
  var L = function () { return S.lang(); };

  var FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSf4xOU39RlxzkNtUArrcCeVMfX7XBnaiQzAN4I-RXg4uakPpQ/viewform';
  var MAPS = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x3e49e9effb7dc8ad:0x7fd42262eb31b169';
  var TIX = 'https://9lxbkc.zid.store/products/';
  var IG = 'https://www.instagram.com/sync.1t/';

  S.extend({
    en: {
      fq_script: 'before the curtain rises', fq_h1: 'Guidelines & FAQ',
      fq_sub: 'The house rules in four lines, and answers to what people ask us most.',
      fq_btn_rules: 'Read the house rules', fq_btn_faq: 'Find an answer',
      fq_rules: 'House rules', fq_rules_s: 'Short, and the same for everyone who walks in.',
      fq_faq: 'Questions people ask', fq_faq_s: 'Pick a topic or type a word. Tap a question to open it.',
      fq_search_l: 'Search the questions', fq_search_ph: 'Search, for example “Tuesday”', fq_topics: 'Topics',
      fq_none: 'No question matches that yet.', fq_none_a: 'Ask us directly.',
      fq_ask: 'Still wondering?', fq_ask_p: 'Message us and a real person answers.', fq_dm: 'Message us on Instagram',
      fq_all: 'All', fq_t_visit: 'Visiting', fq_t_tue: 'Tuesdays', fq_t_wed: 'Chess', fq_t_girls: 'Girls Only', fq_t_thrift: 'Thrift', fq_t_menu: 'Drinks',
      fq_count: '{n} questions'
    },
    ar: {
      fq_script: 'قبل أن ترتفع الستارة', fq_h1: 'القواعد والأسئلة',
      fq_sub: 'قواعد المكان في أربعة أسطر، وإجابات عمّا يسألنا عنه الناس أكثر.',
      fq_btn_rules: 'اقرأ قواعد المكان', fq_btn_faq: 'ابحث عن إجابة',
      fq_rules: 'قواعد المكان', fq_rules_s: 'قصيرة، وهي نفسها لكل من يدخل.',
      fq_faq: 'أسئلة يطرحها الناس', fq_faq_s: 'اختر موضوعًا أو اكتب كلمة. اضغط على السؤال لتفتحه.',
      fq_search_l: 'ابحث في الأسئلة', fq_search_ph: 'ابحث، مثلًا «الثلاثاء»', fq_topics: 'المواضيع',
      fq_none: 'لا يوجد سؤال يطابق ذلك بعد.', fq_none_a: 'اسألنا مباشرة.',
      fq_ask: 'ما زلت تتساءل؟', fq_ask_p: 'راسلنا ويجيبك شخص حقيقي.', fq_dm: 'راسلنا على إنستغرام',
      fq_all: 'الكل', fq_t_visit: 'الزيارة', fq_t_tue: 'الثلاثاء', fq_t_wed: 'الشطرنج', fq_t_girls: 'للبنات فقط', fq_t_thrift: 'ثريفت', fq_t_menu: 'المشروبات',
      fq_count: '{n} أسئلة'
    }
  });

  /* ------------------------------------------------------------ house rules */
  var RULES = [
    { en: ['Everyone shares something', 'Sing, play, sell, move a pawn or just listen. Be kind to whoever takes the stage, the table or the board.'],
      ar: ['كل واحد يشارك بشيء', 'غنِّ أو اعزف أو بع أو حرّك بيدقًا أو استمع فقط. كن لطيفًا مع كل من يصعد المسرح أو يجلس إلى الطاولة.'] },
    { en: ['Give the stage your ears', 'When someone is performing, keep conversation low so the room can hear them.'],
      ar: ['امنح المسرح أذنيك', 'حين يكون أحدهم على المسرح، اخفض الأحاديث ليسمعه الجميع.'] },
    { en: ['Come as you are', 'Whatever you love, bring it with you. This is a place to find people who love the same things.'],
      ar: ['تعال كما أنت', 'أيًّا كان ما تحبه، أحضره معك. هذا مكان تجد فيه من يحبون الأشياء نفسها.'] },
    { en: ['Look after the place', 'Leave your table, your chair and your corner the way you would like to find them, so the next person enjoys it too.'],
      ar: ['اعتنِ بالمكان', 'اترك طاولتك وكرسيك وزاويتك كما تحب أن تجدها، ليستمتع بها من يأتي بعدك.'] }
  ];
  function buildRules() {
    var host = $('#notices'); if (!host) return;
    var tilt = [-1.2, .9, -.8, 1.1];
    host.innerHTML = RULES.map(function (r, i) {
      var c = r[L()] || r.en;
      return '<li class="fq-notice" style="--r:' + tilt[i] + 'deg"><span class="fq-notice__pin" aria-hidden="true"></span><h3>' + c[0] + '</h3><p>' + c[1] + '</p></li>';
    }).join('');
  }

  /* -------------------------------------------------------------------- FAQ */
  var TOPICS = [['all', 'fq_all'], ['visit', 'fq_t_visit'], ['tue', 'fq_t_tue'], ['menu', 'fq_t_menu']];
  var A = function (h, t, x) { return '<a href="' + h + '"' + (x || '') + '>' + t + '</a>'; };
  var EXT = ' target="_blank" rel="noopener"';
  var FAQ = [
    { g: 'visit',
      en: ['Where are you?', 'Inside Gosaibi Village, King Fahd St, Al Yarmouk, Al Khobar 42548. ' + A(MAPS, 'Get directions', EXT) + '.'],
      ar: ['أين تجدونكم؟', 'داخل قرية القصيبي، طريق الملك فهد، حي اليرموك، الخبر 42548. ' + A(MAPS, 'الاتجاهات', EXT) + '.'] },
    { g: 'visit',
      en: ['When are you open?', 'Sunday to Thursday, 9:00 am to 2:30 am. Friday and Saturday, 2:00 pm to 2:30 am. The line at the top of this page shows whether we are open right now.'],
      ar: ['متى تفتحون؟', 'من الأحد إلى الخميس من ٩:٠٠ صباحًا حتى ٢:٣٠ بعد منتصف الليل. الجمعة والسبت من ٢:٠٠ ظهرًا حتى ٢:٣٠ بعد منتصف الليل. السطر في أعلى الصفحة يوضح إن كنا مفتوحين الآن.'] },
    { g: 'visit',
      en: ['How do I get tickets?', 'Tickets for Music Gathering are sold at our ' + A(TIX, 'online store', EXT) + '. For other nights, follow ' + A(IG, '@sync.1t', EXT) + ' and each post says how to join.'],
      ar: ['كيف أحصل على التذاكر؟', 'تذاكر تجمّع الموسيقى تُباع في ' + A(TIX, 'متجرنا الإلكتروني', EXT) + '. أما الليالي الأخرى فتابعنا على ' + A(IG, '@sync.1t', EXT) + ' وكل منشور يوضح طريقة الانضمام.'] },
    { g: 'tue',
      en: ['When is Music Gathering?', 'Every Tuesday at 8:30 pm, on the Sync it stage. ' + A('music-gathering.html', 'See the Music Gathering page') + '.'],
      ar: ['متى يكون تجمّع الموسيقى؟', 'كل ثلاثاء الساعة ٨:٣٠ مساءً على مسرح سينك إت. ' + A('music-gathering.html', 'صفحة تجمّع الموسيقى') + '.'] },
    { g: 'tue',
      en: ['Do I have to perform?', 'No. You are equally welcome to settle in with a coffee and enjoy everyone else’s performances.'],
      ar: ['هل يجب أن أؤدي؟', 'لا. أنت مرحّب بك بالقدر نفسه لتجلس مع قهوتك وتستمتع بأداء الآخرين.'] },
    { g: 'menu',
      en: ['What do you serve?', 'Hot and cold drinks, mojitos, bubble tea and desserts. Open a section on the ' + A('menu.html', 'Menu page') + ' and tap an item to see what is in it.'],
      ar: ['ماذا تقدمون؟', 'مشروبات ساخنة وباردة وموهيتو وبابل تي وحلويات. افتح قسمًا في ' + A('menu.html', 'صفحة القائمة') + ' واضغط على أي صنف لترى مكوناته.'] },
    { g: 'menu',
      en: ['What coffee do you use?', 'One house blend of washed Ethiopian and Brazilian beans with a little Colombian, roasted medium-dark in small batches and ground fresh to order.'],
      ar: ['أي قهوة تستخدمون؟', 'خلطة واحدة خاصة بنا من حبوب إثيوبية مغسولة وبرازيلية مع قليل من الكولومبية، محمّصة تحميصًا متوسطًا إلى غامق على دفعات صغيرة، وتُطحن طازجة عند الطلب.'] }
  ];

  var KW = { visit: 'visit visiting hours open location address contact tickets الزيارة ساعات العمل الموقع تواصل', tue: 'tuesday tuesdays music gathering vibe board karaoke stage الثلاثاء ثلاثاء الموسيقى مسرح', wed: 'wednesday wednesdays chess blitz tournament الاربعاء اربعاء الشطرنج بطوله', girls: 'girls only mini market saturday fancy nancy للبنات السبت سوق', thrift: 'thrift mystery bag clothes vintage ثريفت ملابس كيس', menu: 'menu drinks coffee food desserts القائمه مشروبات قهوه حلويات' };
  var topic = 'all', term = '';
  function norm(s) { return String(s).toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[ً-ٟـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه'); }

  function buildChips() {
    var host = $('#fqChips'); if (!host) return;
    host.innerHTML = TOPICS.map(function (t) { return '<button type="button" class="fq-chip" data-t="' + t[0] + '" aria-pressed="' + (t[0] === topic) + '">' + S.t(t[1]) + '</button>'; }).join('');
    $$('.fq-chip', host).forEach(function (b) {
      b.addEventListener('click', function () { topic = b.getAttribute('data-t'); $$('.fq-chip', host).forEach(function (o) { o.setAttribute('aria-pressed', o === b); }); filter(); });
    });
  }
  function buildList() {
    var host = $('#fqList'); if (!host) return;
    var open = $$('details[open]', host).map(function (d) { return d.getAttribute('data-i'); });
    host.innerHTML = FAQ.map(function (f, i) {
      var c = f[L()] || f.en;
      return '<details class="fq-item" data-g="' + f.g + '" data-k="' + norm(KW[f.g]) + '" data-i="' + i + '"' + (open.indexOf(String(i)) > -1 ? ' open' : '') + '><summary><span>' + c[0] + '</span><i aria-hidden="true"></i></summary><div class="fq-item__a"><p>' + c[1] + '</p></div></details>';
    }).join('');
    $$('details', host).forEach(function (d) {
      d.addEventListener('toggle', function () { if (d.open) $$('details[open]', host).forEach(function (o) { if (o !== d) o.removeAttribute('open'); }); });
    });
    filter();
  }
  function filter() {
    var q = norm(term).trim(), shown = 0;
    $$('.fq-item').forEach(function (d) {
      var ok = (topic === 'all' || d.getAttribute('data-g') === topic) && (!q || (norm(d.textContent) + ' ' + d.getAttribute('data-k')).indexOf(q) > -1);
      d.hidden = !ok; if (ok) shown++;
    });
    $('#fqNone').hidden = shown > 0;
  }

  function status() {
    var el = $('#fqStatus'); if (!el) return;
    var s = S.openState(); el.setAttribute('data-open', s.open ? 'true' : 'false'); el.textContent = S.statusText(s);
  }

  function rays() {
    var svg = $('.fq-hero__rays'); if (!svg || svg.firstChild) return;
    var h = '', n = 19;
    for (var i = 0; i < n; i++) {
      var a0 = Math.PI + (i * Math.PI / n), a1 = Math.PI + ((i + .5) * Math.PI / n), cx = 200, cy = 200, r = 520;
      h += '<path d="M' + cx + ' ' + cy + ' L' + (cx + r * Math.cos(a0)).toFixed(1) + ' ' + (cy + r * Math.sin(a0)).toFixed(1) + ' L' + (cx + r * Math.cos(a1)).toFixed(1) + ' ' + (cy + r * Math.sin(a1)).toFixed(1) + ' Z" fill="#e6cb82" opacity=".13"/>';
    }
    h += '<circle cx="200" cy="200" r="62" fill="none" stroke="#e6cb82" stroke-width="1.2" opacity=".5"/><circle cx="200" cy="200" r="86" fill="none" stroke="#e6cb82" stroke-width="1" opacity=".35"/><circle cx="200" cy="200" r="116" fill="none" stroke="#e6cb82" stroke-width=".8" opacity=".25"/>';
    svg.innerHTML = h;
  }

  function init() {
    rays(); buildRules(); buildChips(); buildList(); status();
    var inp = $('#fqSearch'); if (inp) inp.addEventListener('input', function () { term = inp.value; filter(); });
    setInterval(status, 30000);
    document.addEventListener('syncit:lang', function () { buildRules(); buildChips(); buildList(); status(); });
    // arriving on #faq or #rules from elsewhere
    if (location.hash === '#faq' || location.hash === '#rules') setTimeout(function () { var t = $(location.hash); if (t) t.scrollIntoView(); }, 50);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
