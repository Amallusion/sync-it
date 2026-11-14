/* Sync it — Musical Events.
   Six artist nights. Each one is a "room" that takes on its poster's world: colours, type, torn-paper edges and a few drawn details.
   Data per night: poster, performer photo + bio, background video, Instagram (+ website), and the Spotify playlist as a tracklist.
   Tracklists come from the Spotify CSV exports in js/events-data.js. The live Spotify player is added too and simply hides itself where the page can't embed it. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  SYNC.extend({
    en: {
      ev_script: 'The heart of Sync it', ev_h1a: 'Musical', ev_h1b: 'Events',
      ev_sub: 'Artist nights hosted by Sync it. Every night has its own poster, its own world and its own playlist.',
      ev_up: 'Upcoming nights', ev_up_s: 'Choose a night and step into its world.',
      ev_past: 'Past nights', ev_past_s: 'The performer, the footage and the songs, kept for you.',
      ev_host: 'Hosted by Sync it', ev_soon: 'Date announced soon', ev_step: 'Step in',
      ev_about: 'About', ev_ig: 'Instagram', ev_web: 'Website',
      ev_to_about: 'About the artist', ev_to_songs: 'The songs', ev_tix: 'Get tickets',
      ev_songs_up: 'On the playlist', ev_songs_past: 'Played that night',
      ev_songs_pu: 'A taste of how the night will sound. Tap a song to open it in Spotify.',
      ev_songs_pp: 'Every song from the night, in order. Tap a song to open it in Spotify.',
      ev_open_sp: 'Open the playlist in Spotify', ev_play: 'Play it here', ev_noplay: 'This preview can’t load Spotify’s player. Use “Open the playlist in Spotify” to listen.', ev_songlist: 'See the printed song list',
      ev_songs_n: '{n} songs', ev_dur_h: '{h} hr {m} min', ev_dur_m: '{m} min',
      ev_tag_up: 'Upcoming', ev_tag_past: 'Past night', ev_live: 'On stage now', ev_over: 'This night has passed',
      ev_jump: 'Jump to a night', ev_close: 'Close', ev_poster: 'View the poster',
      cd_d: 'days', cd_h: 'hrs', cd_m: 'min', cd_s: 'sec'
    },
    ar: {
      ev_script: 'قلب سينك إت', ev_h1a: 'الأمسيات', ev_h1b: 'الموسيقية',
      ev_sub: 'ليالٍ لفنانين تستضيفها سينك إت. لكل ليلة ملصقها وعالمها وقائمة أغانيها.',
      ev_up: 'الليالي القادمة', ev_up_s: 'اختر ليلة وادخل عالمها.',
      ev_past: 'الليالي السابقة', ev_past_s: 'الفنانة والمقاطع والأغاني، محفوظة لك.',
      ev_host: 'تستضيفها سينك إت', ev_soon: 'يُعلن الموعد قريبًا', ev_step: 'ادخل',
      ev_about: 'عن', ev_ig: 'إنستغرام', ev_web: 'الموقع',
      ev_to_about: 'عن الفنان', ev_to_songs: 'الأغاني', ev_tix: 'احجز تذكرتك',
      ev_songs_up: 'على قائمة التشغيل', ev_songs_past: 'ما عُزف في تلك الليلة',
      ev_songs_pu: 'لمحة عن صوت الليلة. اضغط على أي أغنية لفتحها في سبوتيفاي.',
      ev_songs_pp: 'كل أغاني الليلة بالترتيب. اضغط على أي أغنية لفتحها في سبوتيفاي.',
      ev_open_sp: 'افتح القائمة في سبوتيفاي', ev_play: 'شغّلها هنا', ev_noplay: 'هذه المعاينة لا تحمّل مشغّل سبوتيفاي. استخدم زر «افتح القائمة في سبوتيفاي» للاستماع.', ev_songlist: 'شاهد قائمة الأغاني المطبوعة',
      ev_songs_n: '{n} أغنية', ev_dur_h: '{h} س {m} د', ev_dur_m: '{m} د',
      ev_tag_up: 'قادمة', ev_tag_past: 'ليلة سابقة', ev_live: 'على المسرح الآن', ev_over: 'انتهت هذه الليلة',
      ev_jump: 'انتقل إلى ليلة', ev_close: 'إغلاق', ev_poster: 'شاهد الملصق',
      cd_d: 'يوم', cd_h: 'ساعة', cd_m: 'دقيقة', cd_s: 'ثانية'
    }
  });

  /* ------------------------------------------------------------------ the nights */
  var EV = [
    { id: 'bjork', up: 1, dot: '#d5e83a', sp: '6xg2Ytc8BcloUQSNUnRqMf',
      ig: 'https://www.instagram.com/bjork/?hl=en', igh: '@bjork',
      title: { en: 'Björk Night', ar: 'ليلة بيورك' }, name: { en: 'Björk', ar: 'بيورك' }, night: { en: 'Night', ar: 'ليلة' },
      bio: {
        en: 'Björk is a singular Icelandic visionary whose fearless creativity has reshaped modern music, fashion, and visual art for over four decades. Possessing an unmistakable voice that glides from a delicate whisper to a volcanic roar, she masterfully fuses raw human emotion with avant-garde electronic innovation, inspiring generations of artists to embrace their boldest, most authentic selves without compromise.',
        ar: 'بيورك فنانة آيسلندية فريدة برؤية استثنائية، أعاد إبداعها الجريء تشكيل الموسيقى الحديثة والأزياء والفن البصري على مدى أكثر من أربعة عقود. صوتها لا يشبه غيره، ينساب من همسة رقيقة إلى زئير بركاني، وتدمج بمهارة المشاعر الإنسانية الخام بالابتكار الإلكتروني الطليعي، فتلهم أجيالًا من الفنانين لاحتضان ذواتهم الأكثر جرأة وأصالة بلا أي تنازل.' } },
    { id: 'charli', up: 1, dot: '#b6ff00', sp: '0qC0nv9uA8fZOEoWOFHpfY',
      ig: 'https://www.instagram.com/charli_xcx/?hl=en', igh: '@charli_xcx',
      title: { en: 'Charli XCX Night', ar: 'ليلة تشارلي إكس سي إكس' }, name: { en: 'Charli XCX', ar: 'تشارلي XCX' }, night: { en: 'Night', ar: 'ليلة' },
      bio: {
        en: 'Charli XCX is a fearless pop architect who has spent over a decade bending the mainstream to her own dazzling, hyper-modern vision. Blending infectious hook-writing with club-ready electronic edge, she effortlessly turns raw vulnerability and unapologetic confidence into global cultural phenomena. As both a chart-topping icon and an underground tastemaker, she continues to redefine what pop stardom looks and sounds like, inspiring fans and fellow artists alike to live boldly and never play it safe.',
        ar: 'تشارلي إكس سي إكس مهندسة بوب لا تعرف الخوف، أمضت أكثر من عقد تلوي التيار السائد نحو رؤيتها العصرية المبهرة. تمزج بين الألحان الجذابة وحدّة الموسيقى الإلكترونية الجاهزة للنوادي، وتحوّل هشاشتها الصادقة وثقتها بلا اعتذار إلى ظواهر ثقافية عالمية. هي أيقونة تتصدر القوائم وصاحبة ذائقة في الوسط المستقل في آنٍ واحد، وما زالت تعيد تعريف شكل نجومية البوب وصوتها، وتلهم المعجبين والفنانين على السواء ليعيشوا بجرأة ولا يلعبوا على المضمون أبدًا.' } },
    { id: 'zara', up: 1, dot: '#f7cf3b', sp: '665IAF2T0AYh7mP0kzpHFt',
      ig: 'https://www.instagram.com/zaralarsson/?hl=en', igh: '@zaralarsson',
      title: { en: 'Zara Larsson Night', ar: 'ليلة زارا لارسون' }, name: { en: 'Zara Larsson', ar: 'زارا لارسون' }, night: { en: 'Night', ar: 'ليلة' },
      bio: {
        en: 'Zara Larsson is a radiant pop powerhouse whose soaring vocals and unstoppable energy have made her a defining voice of modern dance-pop. Blending infectious melodies with fierce empowerment, she effortlessly commands the global stage with anthems that are as deeply heartfelt as they are brilliantly magnetic. With her unwavering authenticity and undeniable star power, she continues to light up the music world, inspiring fans everywhere to embrace their strength and dance without inhibition.',
        ar: 'زارا لارسون نجمة بوب مشعّة، جعلها صوتها المحلّق وطاقتها التي لا تتوقف من أبرز أصوات موسيقى الدانس بوب الحديثة. تمزج بين الألحان الجذابة وروح القوة والتمكين، وتتربع على المسرح العالمي بأغنيات صادقة ومغناطيسية بالقدر نفسه. وبأصالتها الثابتة وحضورها النجمي الواضح، ما زالت تضيء عالم الموسيقى وتلهم المعجبين في كل مكان لاحتضان قوتهم والرقص بلا قيود.' } },
    { id: 'rosalia', up: 1, dot: '#d4ab55', sp: '3SbJrlAincJZKja7dSIYoP',
      ig: 'https://www.instagram.com/rosalia.vt/', igh: '@rosalia.vt',
      title: { en: 'Rosalía Night', ar: 'ليلة روزاليا' }, name: { en: 'Rosalía', ar: 'روزاليا' }, night: { en: 'Night', ar: 'ليلة' },
      bio: {
        en: 'Rosalía is a breathtaking global innovator whose fearless artistic vision has redefined contemporary music by seamlessly blending deep-rooted flamenco tradition with avant-garde pop and urban edge. Possessing a mesmerizing voice and a fierce dedication to craftsmanship, she treats every album as a bold cinematic masterpiece, inspiring millions worldwide to embrace cultural richness and uncompromising creativity.',
        ar: 'روزاليا مجددة عالمية آسرة، أعادت برؤيتها الفنية الجريئة تعريف الموسيقى المعاصرة بمزج سلس بين الفلامنكو العريق وموسيقى البوب الطليعية وحيوية الشارع. بصوتها الساحر وتفانيها الشديد في الإتقان، تتعامل مع كل ألبوم كتحفة سينمائية جريئة، وتلهم الملايين حول العالم لاحتضان ثراء الثقافات والإبداع بلا مساومة.' } },
    { id: 'grimes', up: 1, dot: '#8fd9b6', sp: '2x9AHipm30sDg6LCVBpMcH',
      ig: 'https://www.instagram.com/grimes/?hl=en', igh: '@grimes',
      title: { en: 'Grimes Night', ar: 'ليلة غرايمز' }, name: { en: 'Grimes', ar: 'غرايمز' }, night: { en: 'Night', ar: 'ليلة' },
      bio: {
        en: 'Grimes is a visionary electronic auteur who has redefined the boundaries of modern music and digital art with her breathtaking, futuristic creations. Seamlessly producing, writing, and engineering her own ethereal soundscapes, she weaves otherworldly pop melodies with cyberpunk aesthetics to build immersive universes entirely her own. With a boundless imagination and a relentless drive for technological and artistic innovation, she continues to inspire a new wave of creators to dream without limits and build worlds beyond the horizon.',
        ar: 'غرايمز فنانة إلكترونية صاحبة رؤية، أعادت رسم حدود الموسيقى الحديثة والفن الرقمي بإبداعاتها المستقبلية الآسرة. تنتج وتكتب وتهندس عوالمها الصوتية الأثيرية بنفسها، وتنسج ألحان بوب غريبة مع جماليات السايبربانك لتبني أكوانًا غامرة خاصة بها. وبخيال بلا حدود وسعي دؤوب نحو الابتكار التقني والفني، ما زالت تلهم موجة جديدة من المبدعين ليحلموا بلا حدود ويبنوا عوالم تتجاوز الأفق.' } },
    { id: 'reem', up: 0, d: '2026-05-28', dot: '#f5c518', sp: '42PeSRvs15QmPY53aqljlW', songlist: 'assets/events/reem-songlist.jpg',
      ig: 'https://www.instagram.com/reembaqeri/', igh: '@reembaqeri', web: 'https://www.reembaqeri.com/', webh: 'reembaqeri.com',
      title: { en: 'Billie Eilish Cover Night by Reem Baqeri', ar: 'ليلة بيلي آيليش مع ريم باقري' }, name: { en: 'Reem Baqeri', ar: 'ريم باقري' }, night: { en: 'Billie Eilish Cover Night', ar: 'ليلة تغطية بيلي آيليش' },
      bio: {
        en: 'Reem Baqeri is a captivating rising artist whose soulful voice and deeply expressive lyricism bring a fresh, enchanting energy to contemporary music. Blending heartfelt vulnerability with a natural, magnetic artistry, she crafts songs that deeply resonate with the soul, inspiring listeners everywhere to embrace their emotions and find beauty in their own authentic stories.',
        ar: 'ريم باقري فنانة صاعدة آسرة، يمنح صوتها الروحاني وكلماتها العميقة التعبير طاقة جديدة وساحرة للموسيقى المعاصرة. تمزج بين الصدق الهش والفنية الطبيعية الجذابة، فتكتب أغنيات تلامس الروح، وتلهم المستمعين في كل مكان لاحتضان مشاعرهم وإيجاد الجمال في قصصهم الأصيلة.' } }
  ];

  /* Dates live in SYNC.NIGHTS (js/site.js). A night with a date gets a countdown, stays "on stage now" until
     2:30 am the next morning, then moves itself to Past nights. Nights without a date say "soon". */
  EV.forEach(function (e) {
    e.up0 = e.up;
    var n = (SYNC.NIGHTS || []).filter(function (x) { return x.id === e.id; })[0];
    if (n) { e.t = Date.parse(n.at); var k = new Date(e.t + 3 * 36e5); e.mins = k.getUTCHours() * 60 + k.getUTCMinutes(); e.cd = 1; }
  });
  function refreshUp() {
    var changed = false;
    EV.forEach(function (e) { var u = e.up0 && !(e.t && Date.now() >= SYNC.endOf(e.t)) ? 1 : 0; if (u !== e.up) { e.up = u; changed = true; } });
    return changed;
  }
  function when0(e) { return e.t || (e.d ? Date.parse(e.d + 'T12:00:00+03:00') : 0); }
  refreshUp();

  /* ------------------------------------------------------------------ helpers */
  var L = function () { return SYNC.lang(); };
  var T = SYNC.t;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function starPts(cx, cy, R, r, n, rot) {
    var p = [], i, a, rad;
    for (i = 0; i < n * 2; i++) { a = rot + i * Math.PI / n; rad = i % 2 ? r : R; p.push((cx + Math.cos(a) * rad).toFixed(1) + ',' + (cy + Math.sin(a) * rad).toFixed(1)); }
    return p.join(' ');
  }
  function rnd(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function when(e) {
    var ar = L() === 'ar', f = function (o) { return new Intl.DateTimeFormat(ar ? 'ar-SA-u-ca-gregory' : 'en-GB', o).format; };
    if (e.t) {
      var d = f({ timeZone: 'Asia/Riyadh', weekday: 'long', day: 'numeric', month: ar ? 'long' : 'short' })(new Date(e.t));
      return d + ' · ' + SYNC.fmtTime(e.mins);
    }
    if (e.d) return f({ timeZone: 'Asia/Riyadh', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })(new Date(e.d + 'T12:00:00+03:00'));
    return T('ev_soon');
  }
  function dur(ms, short) {
    var m = Math.round(ms / 60000), h = Math.floor(m / 60);
    return h ? T('ev_dur_h', { h: SYNC.num(h), m: SYNC.num(m % 60) }) : T('ev_dur_m', { m: SYNC.num(m) });
  }
  function mmss(ms) { var s = Math.round(ms / 1000); return SYNC.num((s / 60 | 0) + ':' + SYNC.pad(s % 60)); }

  /* ------------------------------------------------------------------ shared drawing defs */
  function defs() {
    var s = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>';
    s += '<radialGradient id="gOrch" cx=".5" cy=".65" r=".7"><stop offset="0" stop-color="#e46aa6"/><stop offset=".55" stop-color="#b4317c"/><stop offset="1" stop-color="#6a0f47"/></radialGradient>';
    s += '<linearGradient id="gCrys" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef8ff"/><stop offset=".5" stop-color="#a9d3ea"/><stop offset="1" stop-color="#5c9cc4"/></linearGradient>';
    s += '<linearGradient id="gChrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#8d8d8d"/><stop offset=".55" stop-color="#fafafa"/><stop offset=".8" stop-color="#6a6a6a"/><stop offset="1" stop-color="#e8e8e8"/></linearGradient>';
    s += '<radialGradient id="gBall" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#b9b9b9"/><stop offset="1" stop-color="#3a3a3a"/></radialGradient>';
    s += '<pattern id="pGrid" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="none" stroke="#111" stroke-opacity=".55" stroke-width="1.4"/></pattern>';
    s += '<linearGradient id="gSun" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffd36a"/><stop offset="1" stop-color="#ff9a52"/></linearGradient>';
    s += '<linearGradient id="gDol" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a8de0"/><stop offset="1" stop-color="#b79bea"/></linearGradient>';
    s += '<linearGradient id="gRuf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c3111d"/><stop offset="1" stop-color="#4d0509"/></linearGradient>';
    s += '<linearGradient id="gMint" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c6f5dd"/><stop offset="1" stop-color="#6cc9a0"/></linearGradient>';
    s += '<pattern id="pLace" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="11" cy="11" r="8" fill="none" stroke="#0a0405" stroke-width="3"/><circle cx="11" cy="11" r="2.6" fill="#0a0405"/><path d="M0 0L5 5M22 0L17 5M0 22L5 17M22 22L17 17" stroke="#0a0405" stroke-width="2"/></pattern>';
    // reusable bits
    s += '<g id="dDaisy"><g fill="#f9d84a" stroke="#d9951e" stroke-width="2">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { return '<ellipse cx="0" cy="-27" rx="11" ry="21" transform="rotate(' + i * 36 + ')"/>'; }).join('') + '</g><circle r="15" fill="#f39a1c" stroke="#d9791a" stroke-width="2"/><circle r="8" fill="#f7b73a"/></g>';
    s += '<g id="dOrchid"><g fill="url(#gOrch)" stroke="#f6d6e6" stroke-opacity=".55" stroke-width="1.6"><ellipse cx="0" cy="-58" rx="22" ry="64"/><ellipse cx="0" cy="-58" rx="22" ry="64" transform="rotate(120)"/><ellipse cx="0" cy="-58" rx="22" ry="64" transform="rotate(240)"/><ellipse cx="-42" cy="-10" rx="46" ry="38" transform="rotate(-18 -42 -10)"/><ellipse cx="42" cy="-10" rx="46" ry="38" transform="rotate(18 42 -10)"/></g>' +
      '<g fill="#5a0b3a" opacity=".42">' + [[-8, -78, 3], [10, -64, 2.6], [-14, -54, 2.4], [-62, -18, 3], [-50, 0, 2.4], [-36, -22, 2.2], [60, -16, 3], [48, -2, 2.4], [34, -24, 2.2], [-70, -4, 2], [8, -92, 2.2], [-22, -92, 2]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/>'; }).join('') + '</g>' +
      '<path d="M-17 10C-34 30-10 52 0 48C10 52 34 30 17 10C8-2-8-2-17 10Z" fill="#f7e6a6" stroke="#e7a43a" stroke-width="2"/><circle cy="-4" r="9" fill="#fff4cf" stroke="#e9a644" stroke-width="2"/><circle cx="-4" cy="26" r="2.4" fill="#d6542f"/><circle cx="5" cy="31" r="2.4" fill="#d6542f"/></g>';
    s += '<g id="dMush"><path d="M8 54C8 14 92 14 92 54Z" fill="#e9b8a3"/><path d="M16 48C30 40 70 40 84 48" stroke="#c98d78" stroke-width="2" fill="none"/><path d="M45 54C43 72 40 86 35 98H65C60 86 57 72 55 54Z" fill="#f4dfca"/><g stroke="#c98d78" stroke-width="1.6" opacity=".8"><path d="M30 54V46M42 54V42M50 54V41M58 54V42M70 54V46"/></g></g>';
    s += '<g id="dSpark"><polygon points="' + starPts(0, 0, 50, 7, 4, -Math.PI / 2) + '"/></g>';
    s += '<g id="dChromeStar"><polygon points="' + starPts(0, 0, 92, 40, 5, -Math.PI / 2) + '" fill="none" stroke="url(#gChrome)" stroke-width="11" stroke-linejoin="round"/><polygon points="' + starPts(0, 0, 92, 40, 5, -Math.PI / 2) + '" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linejoin="round"/></g>';
    s += '<g id="dDrop"><path d="M0-22C8-8 14-2 14 6a14 14 0 0 1-28 0C-14-2-8-8 0-22Z" fill="#cfe3ff" stroke="#9fbef0" stroke-width="2"/></g>';
    s += '<g id="dScrib"><path d="M0-46L27 38-44-14H44L-27 38Z" fill="none" stroke="#e1432f" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M-3-50L30 36-46-16H46L-24 40Z" fill="none" stroke="#e1432f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/></g>';
    s += '<g id="dWing"><path d="M10 130C0 60 60 0 150 10C190 14 195 60 170 110C150 150 90 190 50 220C20 190 5 160 10 130Z" fill="url(#gMint)" stroke="#e9fff3" stroke-width="3"/><path d="M50 205C90 170 150 150 160 192C170 232 110 252 70 266C60 244 55 224 50 205Z" fill="url(#gMint)" stroke="#e9fff3" stroke-width="3" opacity=".92"/><path d="M20 128C60 90 110 60 160 24M40 160C80 120 120 90 170 60M70 200C100 160 140 130 168 110" stroke="#4fae86" stroke-width="2" fill="none" opacity=".55"/><circle cx="118" cy="58" r="15" fill="#9ae0bd" stroke="#4fae86" stroke-width="3"/><circle cx="118" cy="58" r="6" fill="#2e7a5a"/></g>';
    return s + '</defs></svg>';
  }
  function svg(cls, style, vb, inner, extra) { return '<svg class="dc ' + cls + '" style="' + style + '" viewBox="' + vb + '" aria-hidden="true"' + (extra || '') + '>' + inner + '</svg>'; }
  function use(id, tr, fill) { return '<use href="#' + id + '"' + (tr ? ' transform="' + tr + '"' : '') + (fill ? ' fill="' + fill + '"' : '') + '/>'; }

  /* ------------------------------------------------------------------ each poster's drawn details */
  var DECO = {
    bjork: function () {
      var r = rnd(7), burst = function (st, rot, R, k) { return svg('', st, '-110 -110 220 220', '<polygon fill="#d5e83a" points="' + starPts(0, 0, R, R * .42, k, rot) + '"/>'); };
      var circ = 'M0 30H70L95 55H150M70 30L90 10H140' ;
      return burst('right:1%;top:9%;width:min(23vw,290px)', -.25, 104, 11) + burst('left:-3%;top:34%;width:min(15vw,190px)', .1, 104, 9) +
        svg('', 'left:-2%;bottom:-3%;width:min(27vw,350px)', '-110 -120 220 220', use('dOrchid', 'rotate(-14)')) +
        svg('', 'right:-3%;bottom:-4%;width:min(30vw,400px)', '-110 -120 220 220', use('dOrchid', 'rotate(16) scale(-1 1)')) +
        svg('', 'left:30%;bottom:-3%;width:min(16vw,200px)', '0 0 100 100', use('dMush')) + svg('', 'left:38%;bottom:-4%;width:min(10vw,120px)', '0 0 100 100', use('dMush', 'translate(100 0) scale(-1 1)')) +
        svg('', 'right:26%;bottom:-2%;width:min(24vw,300px)', '0 0 200 130', '<polygon points="30,130 56,20 84,130" fill="url(#gCrys)" stroke="#fff" stroke-opacity=".6"/><polygon points="76,130 112,6 140,130" fill="url(#gCrys)" stroke="#fff" stroke-opacity=".6" opacity=".95"/><polygon points="120,130 156,44 184,130" fill="url(#gCrys)" stroke="#fff" stroke-opacity=".6"/><polygon points="56,20 62,130 84,130" fill="#fff" opacity=".28"/>') +
        svg('dc-circ', 'left:2%;top:12%;width:min(26vw,330px)', '0 0 160 70', '<g fill="none" stroke="#f3e4c6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="' + circ + '"/><circle cx="155" cy="55" r="4.5"/><circle cx="145" cy="10" r="4.5"/><circle cx="0" cy="30" r="4.5"/></g>') +
        svg('dc-circ', 'right:3%;top:48%;width:min(22vw,280px)', '0 0 160 70', '<g fill="none" stroke="#f3e4c6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" transform="translate(160 0) scale(-1 1)"><path d="' + circ + '"/><circle cx="155" cy="55" r="4.5"/><circle cx="145" cy="10" r="4.5"/></g>');
    },
    charli: function () {
      var r = rnd(21), d = '', x, w, len, i;
      for (i = 0; i < 26; i++) { x = i * 40 + r() * 28; w = 7 + r() * 9; len = (i % 3 === 0 ? 70 : 26) + r() * 90; d += '<rect x="' + x.toFixed(0) + '" y="0" width="' + w.toFixed(0) + '" height="' + len.toFixed(0) + '" rx="' + (w / 2).toFixed(1) + '"/><circle cx="' + (x + w / 2).toFixed(1) + '" cy="' + len.toFixed(0) + '" r="' + (w * .72).toFixed(1) + '"/>'; }
      var spl = ''; for (i = 0; i < 16; i++) spl += '<circle cx="' + (r() * 300).toFixed(0) + '" cy="' + (r() * 150).toFixed(0) + '" r="' + (1.5 + r() * 5).toFixed(1) + '"/>';
      return svg('dc-drips', 'left:0;top:0;width:100%;min-width:900px', '0 0 1040 230', '<g fill="#b6ff00"><rect x="0" y="0" width="1040" height="16"/>' + d + '</g>', ' preserveAspectRatio="xMidYMin slice"') +
        svg('', 'left:1%;bottom:8%;width:min(22vw,270px);transform:rotate(-14deg)', '-110 -110 220 220', use('dChromeStar')) +
        svg('', 'right:3%;top:26%;width:min(14vw,170px);transform:rotate(12deg)', '-110 -110 220 220', use('dChromeStar')) +
        svg('', 'right:1%;bottom:-6%;width:min(25vw,320px)', '-70 -70 140 140', '<circle r="62" fill="url(#gBall)"/><circle r="62" fill="url(#pGrid)"/><ellipse cx="-20" cy="-26" rx="16" ry="9" fill="#fff" opacity=".6" transform="rotate(-30 -20 -26)"/>') +
        svg('', 'left:26%;bottom:-3%;width:min(30vw,380px)', '0 0 300 150', '<g fill="#b6ff00">' + spl + '</g><path d="M60 110C20 70 70 20 110 62C150 20 200 70 160 110C140 130 110 146 110 146C110 146 80 130 60 110Z" fill="none" stroke="#b6ff00" stroke-width="7" stroke-linecap="round" transform="translate(40 -10) scale(.9)"/>');
    },
    zara: function () {
      var rays = '', i, a, R = 200;
      for (i = 0; i < 21; i++) { a = Math.PI + (i + .5) * Math.PI / 21; rays += '<polygon points="0,0 ' + (Math.cos(a - .05) * R).toFixed(1) + ',' + (Math.sin(a - .05) * R).toFixed(1) + ' ' + (Math.cos(a + .05) * R).toFixed(1) + ',' + (Math.sin(a + .05) * R).toFixed(1) + '"/>'; }
      var arcs = ['#f26b6b', '#f9a65a', '#f7d24a', '#8ccf7a', '#6fb1e8', '#a690e6'].map(function (c, k) { var rr = 118 - k * 15; return '<path d="M' + (130 - rr) + ' 130A' + rr + ' ' + rr + ' 0 0 1 ' + (130 + rr) + ' 130" fill="none" stroke="' + c + '" stroke-width="15"/>'; }).join('');
      var dol = '<g><path d="M6 78C36 22 112 4 166 34C180 42 192 38 200 28C198 48 184 60 168 62C140 90 70 100 6 78Z" fill="url(#gDol)" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><path d="M92 24C98 6 112 0 128 4C116 12 114 22 116 32Z" fill="url(#gDol)"/><path d="M68 76C74 92 86 100 98 98C92 88 90 80 92 74Z" fill="url(#gDol)"/><circle cx="168" cy="40" r="3.2" fill="#1d2a6b"/><path d="M6 78C-6 70-10 52-4 40C4 54 14 62 24 66Z" fill="url(#gDol)"/></g>';
      var cloud = '<path d="M20 70C4 70 4 44 26 44C28 22 62 16 72 36C84 24 112 30 112 52C128 52 134 70 118 72Z" fill="#fff" opacity=".6"/>';
      return svg('', 'left:50%;top:-3%;width:min(86vw,900px);transform:translateX(-50%)', '-210 -10 420 215', '<g fill="url(#gSun)" opacity=".85">' + rays + '</g><path d="M-62 0A62 62 0 0 1 62 0Z" fill="#ffb54a"/>') +
        svg('', 'left:-2%;bottom:6%;width:min(34vw,440px)', '0 0 260 135', arcs) +
        svg('', 'right:-1%;top:14%;width:min(26vw,320px)', '0 0 200 100', dol, ' style="transform:rotate(-8deg)"') +
        svg('', 'left:6%;top:24%;width:min(17vw,230px);transform:scaleX(-1) rotate(-12deg)', '0 0 200 100', dol) +
        svg('', 'right:8%;top:46%;width:min(22vw,280px)', '0 0 140 90', cloud) + svg('', 'left:34%;top:8%;width:min(16vw,200px)', '0 0 140 90', cloud) +
        svg('', 'left:3%;top:6%;width:min(10vw,120px)', '-50 -50 100 100', use('dDaisy', 'rotate(10)')) + svg('', 'right:4%;bottom:7%;width:min(15vw,190px)', '-50 -50 100 100', use('dDaisy', 'rotate(-20)')) +
        svg('', 'left:26%;bottom:-4%;width:min(12vw,150px)', '-50 -50 100 100', use('dDaisy')) + svg('', 'right:22%;bottom:-6%;width:min(9vw,110px)', '-50 -50 100 100', use('dDaisy', 'rotate(40)')) + svg('', 'right:36%;top:6%;width:min(7vw,86px)', '-50 -50 100 100', use('dDaisy', 'rotate(70)')) +
        svg('', 'right:15%;top:34%;width:26px', '-20 -30 40 50', use('dDrop')) + svg('', 'left:44%;top:68%;width:20px', '-20 -30 40 50', use('dDrop')) + svg('', 'left:12%;top:60%;width:22px', '-20 -30 40 50', use('dDrop'));
    },
    rosalia: function () {
      var rays = '', i, a;
      for (i = 0; i < 44; i++) { a = i * Math.PI * 2 / 44; var r1 = 112, r2 = i % 2 ? 160 : 192; rays += '<line x1="' + (Math.cos(a) * r1).toFixed(1) + '" y1="' + (Math.sin(a) * r1).toFixed(1) + '" x2="' + (Math.cos(a) * r2).toFixed(1) + '" y2="' + (Math.sin(a) * r2).toFixed(1) + '"/>'; }
      var halo = '<g fill="none" stroke="#d4ab55" stroke-linecap="round" stroke-linejoin="round"><circle r="100" stroke-width="5"/><circle r="92" stroke-width="1.6"/><g stroke-width="1.8">' + rays + '</g><path d="M-100 0C-132-30-100-84-62-70C-84-60-88-40-72-28M100 0C132-30 100-84 62-70C84-60 88-40 72-28" stroke-width="4"/><path d="M-30-96L-22-128L0-112L22-128L30-96" stroke-width="4"/><path d="M-100 0C-124 30-100 70-70 66M100 0C124 30 100 70 70 66" stroke-width="3"/></g>';
      var wave = function (y, h, n, w, off) { var d = 'M0 ' + 200, x = 0, k; d += ' V' + y; for (k = 0; k < n; k++) { x = k * w + off; d += ' Q' + (x + w / 2) + ' ' + (y - h) + ' ' + (x + w) + ' ' + y; } return d + ' V200Z'; };
      var feather = '<g><path d="M10 120C20 60 80 10 150 4C150 60 100 130 10 120Z" fill="#fbf4e4"/><path d="M10 120C60 90 110 50 150 4" stroke="#d9cdb4" stroke-width="2" fill="none"/></g>';
      return svg('', 'left:50%;top:6%;width:min(92vw,900px);transform:translateX(-50%);opacity:.5', '-200 -200 400 400', halo) +
        svg('', 'left:0;bottom:-2px;width:100%;height:min(26vh,230px)', '0 0 1200 200', '<path d="' + wave(120, 50, 12, 100, -10) + '" fill="url(#gRuf)"/><path d="' + wave(150, 40, 9, 140, 20) + '" fill="#7d0a12" opacity=".9"/><path d="M0 120Q50 70 100 120T200 120T300 120T400 120T500 120T600 120T700 120T800 120T900 120T1000 120T1100 120T1200 120" fill="none" stroke="#e85a62" stroke-opacity=".45" stroke-width="3"/>', ' preserveAspectRatio="none"') +
        svg('', 'left:-2%;top:-3%;width:min(30vw,380px);transform:rotate(-6deg)', '0 0 220 150', '<rect width="220" height="150" fill="url(#pLace)" opacity=".92"/>') +
        svg('', 'right:-2%;bottom:16%;width:min(26vw,330px);transform:rotate(8deg)', '0 0 220 150', '<rect width="220" height="150" fill="url(#pLace)" opacity=".92"/>');
    },
    grimes: function () {
      var castle = '<path d="M0 220V118H26V92H36V70L47 38L58 70V92H80V132H112V102H122V82H150V120H190V150H232V128H262V170H322V192H430V204H600V220Z" fill="#0e0c14" opacity=".92"/><g fill="#b9a0e3" opacity=".7"><path d="M42 118h10v22h-10zM126 108h8v18h-8zM100 148h8v16h-8z"/></g>';
      var dish = '<g fill="#0e0c14"><path d="M20 70A76 76 0 0 0 150 40L84 12Z"/><path d="M82 52L58 140H64L88 66ZM90 56L120 140H126L96 66Z"/><rect x="40" y="136" width="100" height="8"/></g><path d="M20 70L150 40" stroke="#b9a0e3" stroke-width="3"/>';
      var vine = '<path d="M0 90C40 60 60 120 100 80S160 100 200 70S260 90 300 60" fill="none" stroke="#0e0c14" stroke-width="4" stroke-linecap="round"/>' + [[22, 74], [60, 98], [96, 84], [136, 92], [176, 82], [222, 82], [262, 78]].map(function (p, k) { return '<path d="M' + p[0] + ' ' + p[1] + 'l' + (k % 2 ? 5 : -5) + ' ' + (k % 2 ? 14 : -14) + 'l7 -3Z" fill="#0e0c14"/>'; }).join('');
      return svg('', 'left:-1%;bottom:-2px;width:min(52vw,640px)', '0 0 600 220', castle) +
        svg('', 'right:-1%;bottom:-2px;width:min(24vw,300px)', '0 0 160 150', dish) +
        svg('', 'left:3%;top:8%;width:min(11vw,140px)', '0 0 100 100', '<path d="M62 0A50 50 0 1 0 62 100A38 38 0 1 1 62 0Z" fill="#efe5cf"/>') +
        svg('', 'left:min(10vw,120px);top:18%;width:min(22vw,260px);transform:rotate(-14deg);opacity:.9', '0 0 200 270', use('dWing')) +
        svg('', 'right:min(10vw,120px);top:12%;width:min(22vw,260px);transform:scaleX(-1) rotate(-14deg);opacity:.9', '0 0 200 270', use('dWing')) +
        svg('', 'right:12%;top:16%;width:min(7vw,86px)', '-50 -50 100 100', use('dSpark', '', '#8fd9b6')) + svg('', 'left:28%;top:10%;width:min(5vw,60px)', '-50 -50 100 100', use('dSpark', '', '#efe5cf')) +
        svg('', 'right:30%;bottom:30%;width:min(4vw,46px)', '-50 -50 100 100', use('dSpark', '', '#b9a0e3')) + svg('', 'left:40%;bottom:34%;width:min(6vw,70px)', '-50 -50 100 100', use('dSpark', '', '#8fd9b6')) +
        svg('', 'left:34%;bottom:-3px;width:min(40vw,500px);opacity:.85', '0 0 300 130', vine);
    },
    reem: function () {
      var star = function (st, c) { return svg('', st, '-50 -50 100 100', '<polygon fill="' + c + '" stroke="#0d0d0d" stroke-width="2.5" stroke-linejoin="round" points="' + starPts(0, 0, 48, 20, 5, -Math.PI / 2) + '"/>'); };
      return star('left:5%;top:10%;width:min(11vw,140px);transform:rotate(-14deg)', '#f5c518') + star('right:8%;top:8%;width:min(8vw,100px);transform:rotate(18deg)', '#f5c518') +
        star('left:12%;bottom:12%;width:min(7vw,86px);transform:rotate(10deg)', '#f5c518') + star('right:6%;bottom:16%;width:min(12vw,150px);transform:rotate(-8deg)', '#f5c518') +
        svg('', 'right:14%;top:30%;width:min(12vw,150px)', '-50 -55 100 100', use('dScrib')) + svg('', 'left:3%;top:46%;width:min(9vw,110px);transform:rotate(14deg)', '-50 -55 100 100', use('dScrib')) +
        svg('', 'left:44%;bottom:6%;width:min(7vw,90px);transform:rotate(-20deg)', '-50 -55 100 100', use('dScrib'));
    }
  };

  /* ------------------------------------------------------------------ build */
  var IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>';
  var TIX = 'https://9lxbkc.zid.store/products/';
  var TICKET = '<svg class="tix__ico" viewBox="0 0 28 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M2 4h24v4a2.2 2.2 0 0 0 0 4v4H2v-4a2.2 2.2 0 0 0 0-4z"/><path d="M19 4v2M19 9v2M19 14v2" stroke-linecap="round"/></svg>';
  var WEB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>';
  var PLAY = '<svg class="tr__p" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  function cardHTML(e) {
    return '<a class="ev-card ev-card--' + e.id + '" href="#' + e.id + '" data-go="' + e.id + '"><span class="ev-card__img"><img src="assets/events/' + e.id + '-poster.jpg" alt="" loading="lazy"></span>' +
      '<span class="ev-card__name" data-e="' + e.id + '" data-k="title"></span><span class="ev-card__date" data-e="' + e.id + '" data-k="when"></span></a>';
  }
  function roomHTML(e) {
    var tr = (window.EV_TRACKS || {})[e.id] || [], total = tr.reduce(function (a, t) { return a + t.ms; }, 0), id = e.id;
    var cd = e.cd && e.up ? '<div class="bj-cd" data-id="' + id + '"><div class="bj-cd__row">' + ['d', 'h', 'm', 's'].map(function (u, i) {
      return (i ? '<span class="bj-sep" aria-hidden="true"><svg viewBox="0 0 20 30"><polygon points="10,0 20,12 10,30 0,12" fill="url(#gCrys)" stroke="#fff" stroke-opacity=".7"/></svg></span>' : '') + '<div class="bj-t"><b data-u="' + u + '" aria-hidden="true">00</b><i data-i18n="cd_' + u + '"></i></div>';
    }).join('') + '</div><p class="bj-cd__live" hidden data-i18n="ev_live"></p><p class="bj-cd__over" hidden data-i18n="ev_over"></p><span class="sr" role="status"></span></div>' : '';
    var soon = !e.t && !e.d ? ' is-soon' : '';
    return '<section class="room room--' + id + '" id="' + id + '" data-ev="' + id + '" aria-labelledby="h-' + id + '">' +
      '<div class="room__tear" aria-hidden="true"></div>' +
      '<div class="room__hero">' +
        '<video class="room__vid" muted loop playsinline preload="none" poster="assets/events/' + id + '-v.jpg" data-src="assets/events/' + id + '.mp4" aria-hidden="true" tabindex="-1"></video>' +
        '<div class="room__shade"></div><div class="room__deco" aria-hidden="true">' + DECO[id]() + '</div>' +
        '<div class="room__title">' +
          '<span class="room__tag">' + '<span data-i18n="' + (e.up ? 'ev_tag_up' : 'ev_tag_past') + '"></span></span>' +
          '<h2 class="room__h" id="h-' + id + '"><span class="room__name" data-e="' + id + '" data-k="name"></span> <span class="room__night" data-e="' + id + '" data-k="night"></span></h2>' +
          '<p class="room__host" data-i18n="ev_host"></p>' +
          '<p class="room__date' + soon + '" data-e="' + id + '" data-k="when"></p>' + cd +
          '<div class="room__cta">' + (e.up ? '<a class="rbtn rbtn--tix" href="' + TIX + '" target="_blank" rel="noopener">' + TICKET + '<span data-i18n="ev_tix"></span></a>' : '') + '<a class="rbtn' + (e.up ? ' rbtn--alt' : '') + '" href="#' + id + '-about" data-i18n="ev_to_about"></a><a class="rbtn rbtn--alt" href="#' + id + '-songs" data-i18n="ev_to_songs"></a></div>' +
        '</div>' +
      '</div>' +
      '<div class="room__body" id="' + id + '-about">' +
        '<figure class="room__poster"><button class="pz" type="button" data-src="assets/events/' + id + '-poster.jpg" data-i18n-attr="aria-label:ev_poster"><img src="assets/events/' + id + '-poster.jpg" alt="" loading="lazy"></button></figure>' +
        '<div class="room__about">' +
          '<figure class="room__portrait"><img src="assets/events/' + id + '-about.jpg" alt="" loading="lazy"></figure>' +
          '<div class="room__txt"><h3><span data-i18n="ev_about"></span> <span data-e="' + id + '" data-k="name"></span></h3><p class="room__bio" data-e="' + id + '" data-k="bio"></p>' +
            '<div class="room__links"><a class="lnk" href="' + e.ig + '" target="_blank" rel="noopener">' + IG + '<span data-i18n="ev_ig"></span><small dir="ltr">' + e.igh + '</small></a>' +
            (e.web ? '<a class="lnk" href="' + e.web + '" target="_blank" rel="noopener">' + WEB + '<span data-i18n="ev_web"></span><small dir="ltr">' + e.webh + '</small></a>' : '') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="room__songs" id="' + id + '-songs" data-sp="' + e.sp + '">' +
        '<div class="songs__head"><h3 data-i18n="' + (e.up ? 'ev_songs_up' : 'ev_songs_past') + '"></h3><p data-i18n="' + (e.up ? 'ev_songs_pu' : 'ev_songs_pp') + '"></p>' +
          '<p class="songs__meta" data-count="' + tr.length + '" data-ms="' + total + '"></p>' +
          '<div class="songs__btns"><a class="rbtn" href="https://open.spotify.com/playlist/' + e.sp + '" target="_blank" rel="noopener" data-i18n="ev_open_sp"></a><button class="rbtn rbtn--alt" type="button" data-play data-i18n="ev_play"></button>' + (e.songlist ? '<button class="rbtn rbtn--alt pz" type="button" data-src="' + e.songlist + '" data-i18n="ev_songlist"></button>' : '') + '</div></div>' +
        '<div class="songs__grid"><ol class="tl">' + tr.map(function (t, i) {
          return '<li><a class="tr" href="https://open.spotify.com/track/' + t.id + '" target="_blank" rel="noopener"><span class="tr__n" data-n="' + (i + 1) + '"></span><span class="tr__m"><b>' + esc(t.t) + '</b><i>' + esc(t.a) + ' · ' + esc(t.al) + ', ' + t.y + '</i></span><span class="tr__t" data-ms="' + t.ms + '"></span>' + PLAY + '</a></li>';
        }).join('') + '</ol><div class="spot" hidden><p class="spot__msg" data-i18n="ev_noplay" hidden></p></div></div>' +
      '</div>' +
      '<div class="room__end" aria-hidden="true"></div>' +
    '</section>';
  }

  var active = '';
  function fill() {
    var l = L();
    $$('[data-e]').forEach(function (el) {
      var e = EV.filter(function (x) { return x.id === el.getAttribute('data-e'); })[0], k = el.getAttribute('data-k');
      el.textContent = k === 'when' ? when(e) : (e[k] ? e[k][l] : '');
    });
    $$('.tr__n').forEach(function (n) { n.textContent = SYNC.num(SYNC.pad(+n.getAttribute('data-n'))); });
    $$('.tr__t').forEach(function (n) { n.textContent = mmss(+n.getAttribute('data-ms')); });
    $$('.songs__meta').forEach(function (m) { m.textContent = T('ev_songs_n', { n: SYNC.num(m.getAttribute('data-count')) }) + ' · ' + dur(+m.getAttribute('data-ms')); });
    $$('.ev-dots a').forEach(function (a) { var e = EV.filter(function (x) { return x.id === a.getAttribute('data-id'); })[0]; a.setAttribute('aria-label', e.title[l]); a.setAttribute('title', e.title[l]); });
    tickCd();
  }

  /* countdowns: one per dated night that is still upcoming */
  function tickCd() {
    $$('.bj-cd').forEach(function (root) {
      var e = EV.filter(function (x) { return x.id === root.getAttribute('data-id'); })[0]; if (!e || !e.t) return;
      var ms = e.t - Date.now(), live = ms <= 0;
      $('.bj-cd__row', root).hidden = live; $('.bj-cd__live', root).hidden = !live; $('.bj-cd__over', root).hidden = true;
      if (ms > 0) {
        var s = Math.floor(ms / 1000), v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
        $$('.bj-t b', root).forEach(function (b) { b.textContent = SYNC.num(SYNC.pad(v[b.getAttribute('data-u')])); });
        var txt = SYNC.num(v.d) + ' ' + T('cd_d') + ' ' + SYNC.num(v.h) + ' ' + T('cd_h') + ' ' + SYNC.num(v.m) + ' ' + T('cd_m');
        var sr = $('.sr', root); if (sr.textContent !== txt && v.s === 0) sr.textContent = txt;
      }
    });
  }

  /* ------------------------------------------------------------------ behaviour */
  /* The Spotify player. It loads when someone presses "Play it here". Where a page can't embed other sites (this preview), it says so. */
  var blocked = false;
  function showNoPlayer(h) { $$('iframe', h).forEach(function (f) { f.remove(); }); $('.spot__msg', h).hidden = false; h.classList.add('is-msg'); h.hidden = false; }
  document.addEventListener('securitypolicyviolation', function (ev) {
    if (/frame|child|default/.test(ev.violatedDirective || '') && /spotify/.test(ev.blockedURI || '')) {
      blocked = true; $$('.spot[data-want]').forEach(showNoPlayer);
    }
  });
  function togglePlayer(songs, btn) {
    var h = $('.spot', songs); if (!h) return;
    if (h.getAttribute('data-want') && !blocked) { h.hidden = !h.hidden; return; }
    h.setAttribute('data-want', '1');
    if (blocked) { showNoPlayer(h); return; }
    var f = document.createElement('iframe');
    f.src = 'https://open.spotify.com/embed/playlist/' + songs.getAttribute('data-sp') + '?utm_source=generator&theme=0';
    f.title = 'Spotify'; f.width = '100%'; f.height = '352'; f.frameBorder = '0';
    f.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
    h.appendChild(f); h.hidden = false;
    setTimeout(function () { if (blocked) showNoPlayer(h); }, 900);
  }

  function setActive(id) {
    if (id === active) return; active = id;
    document.body.setAttribute('data-room', id);
    var e = EV.filter(function (x) { return x.id === id; })[0];
    document.documentElement.style.setProperty('--room-accent', e ? e.dot : '');
    $$('.ev-dots a').forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('data-id') === id); });
    $('#evDots').classList.toggle('is-show', !!id);
  }

  /* Draw the two lists. Called at start and again whenever a night flips from upcoming to past. */
  var obs = [];
  function render() {
    var up = EV.filter(function (e) { return e.up; }), past = EV.filter(function (e) { return !e.up; }).sort(function (a, b) { return when0(b) - when0(a); });
    $('#cardsUp').innerHTML = up.map(cardHTML).join(''); $('#cardsPast').innerHTML = past.map(cardHTML).join('');
    $('#roomsUp').innerHTML = up.map(roomHTML).join(''); $('#roomsPast').innerHTML = past.map(roomHTML).join('');
    $('#upcoming').hidden = !up.length;
    var order = up.concat(past);
    $('#evDots').innerHTML = order.map(function (e) { return '<a href="#' + e.id + '" data-id="' + e.id + '" style="--c:' + e.dot + '"><i></i></a>'; }).join('');
    SYNC.apply(document); fill();
    watch();
  }

  /* rooms: play video only while visible, load the player near the songs, track the active room */
  function watch() {
    obs.forEach(function (o) { o.disconnect(); }); obs = []; active = '';
    var vids = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { if (!v.src) v.src = v.getAttribute('data-src'); if (!calm) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
        else v.pause();
      });
    }, { rootMargin: '300px 0px' });
    $$('.room__vid').forEach(function (v) { vids.observe(v); });
    var act = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { setActive(en.target.getAttribute('data-ev') || ''); en.target.classList.add('is-in'); } else if (active === en.target.getAttribute('data-ev')) setActive(''); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    $$('.room').forEach(function (r) { act.observe(r); });
    var inn = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); inn.unobserve(en.target); } }); }, { threshold: .2 });
    $$('.room__hero').forEach(function (r) { inn.observe(r); });
    obs.push(vids, act, inn);
  }

  function init() {
    var d = document.createElement('div'); d.innerHTML = defs(); document.body.insertBefore(d.firstChild, document.body.firstChild);
    // hero wall: two rows of posters drifting in opposite directions
    var imgs = function (list) { var h = list.map(function (e) { return '<img src="assets/events/' + e.id + '-poster.jpg" alt="">'; }).join(''); return h + h; };
    $('#wallA').innerHTML = imgs(EV); $('#wallB').innerHTML = imgs(EV.slice().reverse());

    render();
    document.addEventListener('syncit:lang', function () { fill(); });
    setInterval(function () { if (refreshUp()) render(); else tickCd(); }, 1000);

    // lightbox for posters and the printed song list
    var lb = $('#evLb'), lbi = $('#evLbImg');
    document.addEventListener('click', function (ev) {
      var b = ev.target.closest && ev.target.closest('.pz'); if (!b) return;
      lbi.src = b.getAttribute('data-src'); if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
    });
    document.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-play]'); if (b) togglePlayer(b.closest('.room__songs'), b); });
    $('#evLbX').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (ev) { if (ev.target === lb) lb.close(); });

    // arriving on a #night link
    if (location.hash.length > 1) { var t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(function () { t.scrollIntoView(); }, 60); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
