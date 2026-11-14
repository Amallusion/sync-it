/* Sync it — Thrift page: the rail, sealed mystery bags and live open status. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T = function (k, v) { return window.SYNC.t(k, v); };

  window.SYNC.extend({
    en: {
      th_script: 'hand-picked, one rail at a time', th_h1: 'Thrift',
      th_sub: 'Vintage tees, cosy knits and sealed mystery bags, in a corner of Sync it.',
      th_rail_btn: 'Browse the rail', th_myst_btn: 'Open a mystery bag',
      th_rail: 'On the rail', th_rail_s: 'Tap a piece to turn it over. Everything here is for display; come in to try it on.',
      th_rail_aria: 'Clothes rail. Scroll sideways to see more pieces.',
      th_tap: 'Flip me', th_walk: 'Walk in to try it on',
      th_i_cardigan: 'Faux-fur cardigan', th_d_cardigan: 'Black knit with a soft faux-fur front.',
      th_i_tee: 'Sip this tea tee', th_d_tee: 'Pink tee printed with a teapot and a slice of cake.',
      th_i_knit: 'Striped flare-cuff knit', th_d_knit: 'Mustard, cream and rust stripes with flared cuffs.',
      th_i_sweat: 'Oversized sweatshirt', th_d_sweat: 'Oatmeal and roomy, with a Wicked print on the front.',
      th_i_alt: 'Cardigan hanging on the rail', th_i_alt2: 'Pink tee on the rail', th_i_alt3: 'Striped knit on the rail', th_i_alt4: 'Oversized sweatshirt on the rail',
      th_wall: 'The green wall', th_wall_p: 'Vintage band tees hang on the wall under the lamps. Browse them, hold them up to the light, and take your pick.',
      th_wall_alt: 'A green wall hung with vintage band tees',
      th_myst: 'Mystery thrifting', th_myst_s: 'Pick your size, pick a sealed bag, and see what kind of top is waiting inside.',
      th_size_l: 'Choose a size', th_size_t: 'Size {s}', th_bag_l: 'Sealed mystery bag {n} of {m}, size {s}',
      th_rev_empty: 'Choose a bag to open it.', th_rev_pre: 'Inside the bag:',
      th_rev_note: 'This is a taste of the idea. The real bag stays sealed until it is yours.',
      th_reseal: 'Seal the bags again',
      th_c_band: 'A band tee', th_c_graphic: 'A graphic tee', th_c_knit: 'A knit top', th_c_sweat: 'A sweatshirt', th_c_cardi: 'A fur-trim cardigan',
      th_visit: 'Come and dig', th_visit_p: 'The thrift corner is open whenever Sync it is. Just walk in.',
      th_follow: 'See new drops on Instagram'
    },
    ar: {
      th_script: 'مختارة بعناية، رف بعد رف', th_h1: 'ثريفت',
      th_sub: 'تيشيرتات فينتج، تريكو دافئ وأكياس غامضة مختومة، في زاوية من سينك إت.',
      th_rail_btn: 'تصفّحي الرف', th_myst_btn: 'افتحي كيسًا غامضًا',
      th_rail: 'على الرف', th_rail_s: 'اضغطي على القطعة لتقلبيها. كل ما هنا للعرض، تعالي وجرّبيه.',
      th_rail_aria: 'رف الملابس. مرّري جانبيًا لرؤية المزيد.',
      th_tap: 'اقلبيني', th_walk: 'تعالي جرّبيها',
      th_i_cardigan: 'كارديجان بفرو صناعي', th_d_cardigan: 'تريكو أسود بمقدمة من الفرو الصناعي الناعم.',
      th_i_tee: 'تيشيرت «Sip this tea»', th_d_tee: 'تيشيرت وردي مطبوع عليه إبريق شاي وقطعة كيك.',
      th_i_knit: 'تريكو مخطط بأكمام واسعة', th_d_knit: 'خطوط خردلية وكريمية وبنية محمرّة مع أكمام واسعة عند الأطراف.',
      th_i_sweat: 'سويتشيرت أوفرسايز', th_d_sweat: 'لون شوفان وقصّة واسعة، مع طبعة Wicked على الصدر.',
      th_i_alt: 'كارديجان معلّق على الرف', th_i_alt2: 'تيشيرت وردي على الرف', th_i_alt3: 'تريكو مخطط على الرف', th_i_alt4: 'سويتشيرت أوفرسايز على الرف',
      th_wall: 'الجدار الأخضر', th_wall_p: 'تيشيرتات فرق فينتج معلّقة على الجدار تحت الإضاءة. تصفّحيها، ارفعيها نحو الضوء، واختاري ما يعجبك.',
      th_wall_alt: 'جدار أخضر معلّق عليه تيشيرتات فرق فينتج',
      th_myst: 'ثريفت الغموض', th_myst_s: 'اختاري مقاسك، ثم كيسًا مختومًا، وشوفي أي نوع من القطع ينتظرك بداخله.',
      th_size_l: 'اختاري المقاس', th_size_t: 'المقاس {s}', th_bag_l: 'كيس غامض مختوم {n} من {m}، المقاس {s}',
      th_rev_empty: 'اختاري كيسًا لتفتحيه.', th_rev_pre: 'داخل الكيس:',
      th_rev_note: 'هذه لمحة عن الفكرة. الكيس الحقيقي يبقى مختومًا حتى يصبح لك.',
      th_reseal: 'اختمي الأكياس من جديد',
      th_c_band: 'تيشيرت فرقة', th_c_graphic: 'تيشيرت مطبوع', th_c_knit: 'بلوزة تريكو', th_c_sweat: 'سويتشيرت', th_c_cardi: 'كارديجان بحافة فرو',
      th_visit: 'تعالي وفتّشي', th_visit_p: 'ركن الثريفت مفتوح طوال ما سينك إت مفتوح. تعالي فقط.',
      th_follow: 'شوفي الجديد على إنستغرام'
    }
  });

  var SIZES = ['S', 'M', 'L', 'XL'];
  var BAGS = 6;
  var size = 'M';

  /* ---------------------------------------------------------------- the rail */
  var ITEMS = [
    { k: 'cardigan', img: 'cardigan.jpg', alt: 'th_i_alt', n: 'th_i_cardigan', d: 'th_d_cardigan' },
    { k: 'tee', img: 'tee.jpg', alt: 'th_i_alt2', n: 'th_i_tee', d: 'th_d_tee' },
    { k: 'knit', img: 'knit.jpg', alt: 'th_i_alt3', n: 'th_i_knit', d: 'th_d_knit' },
    { k: 'sweat', img: 'sweatshirt.jpg', alt: 'th_i_alt4', n: 'th_i_sweat', d: 'th_d_sweat' }
  ];
  var HANGER = '<svg class="th-hanger" viewBox="0 0 96 56" aria-hidden="true"><path d="M48 4 C58 4 62 12 54 18 C50 21 48 24 48 30" fill="none" stroke="#e6cb82" stroke-width="3.5" stroke-linecap="round"/><path d="M48 30 L6 50 H90 Z" fill="none" stroke="#e6cb82" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/></svg>';
  function buildRail() {
    var host = $('#railIn'); if (!host) return;
    host.innerHTML = ITEMS.map(function (it, i) {
      return '<div class="th-item" style="--i:' + i + '">' + HANGER +
        '<button type="button" class="th-card" aria-pressed="false" aria-label="' + T(it.n) + '">' +
        '<span class="th-card__in">' +
        '<span class="th-card__f"><img src="assets/thrift/' + it.img + '" alt="" loading="lazy" data-alt="' + it.alt + '"></span>' +
        '<span class="th-card__b"><h3 data-i18n="' + it.n + '"></h3><p data-i18n="' + it.d + '"></p><span class="th-card__walk" data-i18n="th_walk"></span></span>' +
        '</span><span class="th-tag" data-i18n="th_tap"></span></button></div>';
    }).join('');
    window.SYNC.apply(host);
    refreshRail();
    $$('.th-card', host).forEach(function (c) {
      c.addEventListener('click', function () {
        var on = !c.classList.contains('is-flip');
        $$('.th-card.is-flip', host).forEach(function (o) { if (o !== c) { o.classList.remove('is-flip'); o.setAttribute('aria-pressed', 'false'); } });
        c.classList.toggle('is-flip', on); c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  }
  function refreshRail() {
    $$('.th-card').forEach(function (c, i) {
      c.setAttribute('aria-label', T(ITEMS[i].n));
      var im = $('img', c); if (im) im.setAttribute('alt', T(ITEMS[i].alt));
    });
  }

  /* ----------------------------------------------------------------- garments */
  var INK = '#2b1f12';
  var TEE = 'M38 20 L18 32 L6 56 L26 64 L32 54 V104 H88 V54 L94 64 L114 56 L102 32 L82 20 C78 28 70 32 60 32 C50 32 42 28 38 20 Z';
  var SWEAT = 'M40 16 L16 30 L6 96 L28 100 L34 62 V102 H86 V62 L92 100 L114 96 L104 30 L80 16 C76 24 68 28 60 28 C52 28 44 24 40 16 Z';
  function g(kind) {
    var o = 'stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"';
    switch (kind) {
      case 'band': return '<path d="' + TEE + '" fill="#3a3f45" ' + o + '/><circle cx="60" cy="62" r="17" fill="none" stroke="#f1e6cb" stroke-width="3"/><path d="M63 48 L53 64 H62 L57 77 L69 59 H60 Z" fill="#e0a928"/>';
      case 'graphic': return '<path d="' + TEE + '" fill="#f4b7cc" ' + o + '/><path d="M60 80 C42 66 48 52 60 60 C72 52 78 66 60 80 Z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      case 'knit': return '<path d="' + TEE + '" fill="#d9a73a" ' + o + '/><path d="M32 70 H88 M32 84 H88" stroke="#b5532a" stroke-width="7"/><path d="M32 56 H88 M32 98 H88" stroke="#f1e6cb" stroke-width="5"/><path d="' + TEE + '" fill="none" ' + o + '/>';
      case 'sweat': return '<path d="' + SWEAT + '" fill="#e4d6b8" ' + o + '/><path d="M34 98 H86" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round"/><path d="M52 52 C52 44 68 44 68 52 C68 60 52 62 52 70 C52 76 68 76 68 68" fill="none" stroke="#3b6b45" stroke-width="4" stroke-linecap="round"/>';
      default: return '<path d="' + SWEAT + '" fill="#1f1f22" ' + o + '/><path d="M60 28 V102" stroke="#f1e6cb" stroke-width="2.5" stroke-dasharray="1 7" stroke-linecap="round"/>' +
        [0, 1, 2, 3, 4, 5].map(function (i) { return '<circle cx="' + (50 + (i % 2) * 2) + '" cy="' + (34 + i * 11) + '" r="6" fill="#d8c9a8"/><circle cx="' + (70 - (i % 2) * 2) + '" cy="' + (34 + i * 11) + '" r="6" fill="#d8c9a8"/>'; }).join('');
    }
  }
  var CATS = [['band', 'th_c_band'], ['graphic', 'th_c_graphic'], ['knit', 'th_c_knit'], ['sweat', 'th_c_sweat'], ['cardi', 'th_c_cardi']];

  /* -------------------------------------------------------------- mystery bags */
  function bagSVG(i) {
    var tilt = [-2, 1.5, -1, 2, -1.5, 1][i % 6];
    return '<svg viewBox="0 0 160 210" aria-hidden="true" style="--r:' + tilt + 'deg"><g transform="rotate(' + tilt + ' 80 105)">' +
      '<path d="M22 44 L138 44 L146 196 Q80 206 14 196 Z" fill="#c8a06a" stroke="#6b4a24" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<path d="M22 44 L30 196 M138 44 L130 196" stroke="#a97f48" stroke-width="2" opacity=".6"/>' +
      '<g class="b-flap"><path d="M20 44 L140 44 L134 18 Q80 8 26 18 Z" fill="#d6b27c" stroke="#6b4a24" stroke-width="3.5" stroke-linejoin="round"/></g>' +
      '<text class="b-q" x="80" y="128" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="64" fill="#6b4a24" opacity=".75">?</text>' +
      '<g class="b-tape"><rect x="18" y="32" width="124" height="20" fill="#a52320" stroke="#6e1416" stroke-width="2.5"/><path d="M28 42 H132" stroke="#f1e6cb" stroke-width="2" stroke-dasharray="6 6" opacity=".7"/></g>' +
      '<rect x="48" y="150" width="64" height="32" rx="3" fill="#f6eedb" stroke="#6b4a24" stroke-width="2.5" transform="rotate(-3 80 166)"/>' +
      '<text class="b-sz" x="80" y="174" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="24" fill="#2b1f12" transform="rotate(-3 80 166)">' + size + '</text></g></svg>';
  }
  function buildSizes() {
    var host = $('#sizes'); if (!host) return;
    host.innerHTML = SIZES.map(function (s) { return '<button type="button" class="th-size" role="radio" aria-checked="' + (s === size) + '" tabindex="' + (s === size ? 0 : -1) + '" data-s="' + s + '">' + s + '</button>'; }).join('');
    var btns = $$('.th-size', host);
    function pick(s, focus) {
      size = s;
      btns.forEach(function (b) { var on = b.getAttribute('data-s') === s; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
      $$('.b-sz').forEach(function (t) { t.textContent = s; });
      refreshBags();
      reseal();
    }
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { pick(b.getAttribute('data-s')); });
      b.addEventListener('keydown', function (e) {
        var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return; e.preventDefault();
        if (document.documentElement.dir === 'rtl' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) d = -d;
        pick(SIZES[(i + d + SIZES.length) % SIZES.length], true);
      });
    });
  }
  function refreshBags() {
    $$('.th-bag').forEach(function (b, i) { b.setAttribute('aria-label', T('th_bag_l', { n: window.SYNC.num ? window.SYNC.num(i + 1) : i + 1, m: window.SYNC.num ? window.SYNC.num(BAGS) : BAGS, s: size })); });
  }
  function buildBags() {
    var host = $('#bags'); if (!host) return;
    var h = '';
    for (var i = 0; i < BAGS; i++) h += '<button type="button" class="th-bag" data-i="' + i + '">' + bagSVG(i) + '</button>';
    host.innerHTML = h;
    refreshBags();
    var last = -1;
    $$('.th-bag', host).forEach(function (b) {
      b.addEventListener('click', function () { openBag(b); });
    });
    function openBag(b) {
      if (b.classList.contains('is-open')) { showCat(b); return; }
      if (reduce) { b.classList.add('is-open'); showCat(b); return; }
      b.classList.add('is-shake');
      setTimeout(function () { b.classList.remove('is-shake'); b.classList.add('is-open'); showCat(b); }, 520);
    }
    function showCat(b) {
      var i = +b.getAttribute('data-i'), pick;
      do { pick = Math.floor(Math.random() * CATS.length); } while (pick === last && CATS.length > 1);
      last = pick;
      var c = CATS[pick], card = $('#revCard');
      $('#revIcon').innerHTML = g(c[0]);
      $('#revPre').textContent = T('th_rev_pre'); $('#revName').textContent = T(c[1]); $('#revSize').textContent = T('th_size_t', { s: size });
      card.hidden = false; $('#revEmpty').hidden = true; card.setAttribute('data-cat', c[1]);
      card.classList.remove('is-pop'); void card.offsetWidth; card.classList.add('is-pop');
    }
  }
  function reseal() {
    $$('.th-bag').forEach(function (b) { b.classList.remove('is-open', 'is-shake'); });
    var card = $('#revCard'); if (card) card.hidden = true;
    var e = $('#revEmpty'); if (e) e.hidden = false;
  }

  /* -------------------------------------------------------------------- status */
  function status() {
    var el = $('#thStatus'); if (!el) return;
    el.textContent = window.SYNC.statusText(window.SYNC.openState());
  }

  function init() {
    buildRail(); buildSizes(); buildBags(); status();
    var r = $('#reseal'); if (r) r.addEventListener('click', reseal);
    setInterval(status, 30000);
    document.addEventListener('syncit:lang', function () {
      refreshRail(); refreshBags(); status();
      var card = $('#revCard'); if (card && !card.hidden) {
        var k = card.getAttribute('data-cat'); $('#revPre').textContent = T('th_rev_pre'); $('#revName').textContent = T(k); $('#revSize').textContent = T('th_size_t', { s: size });
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
