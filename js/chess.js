/* Sync it — Chess page.
   A board you can play on (click, tap or drag), three opponents from the Sync it family, a friend mode for two people at one table,
   clocks, hints and take-backs. Rules come from chess.js, the opponents' moves from Stockfish (see chess-engine.js).
   Each family member has their own lines for the moments in a game (the Q table below). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var t = function (k, v) { return SYNC.t(k, v); };
  var lang = function () { return SYNC.lang(); };
  var FILES = 'abcdefgh', VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  var NAMES = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' };

  /* ---------------- text ---------------- */
  SYNC.extend({
    en: {
      ch_script: 'at Sync it', ch_h1: 'Chess',
      ch_sub: 'Pull up a chair. Play the Sync it family any time, or sit across from a real opponent on Wednesday night.',
      ch_cta_play: 'Play the family', ch_cta_wed: 'Wednesday Blitz',
      ch_play_h: 'The table is set', ch_play_s: 'Choose who sits across from you, pick a clock, and make your first move.',
      ch_board_label: 'Chess board', ch_who: 'Who do you want to play?', ch_colour: 'You play', ch_clock: 'Clock',
      ch_white: 'White', ch_black: 'Black', ch_random: 'Surprise me',
      ch_blitz: 'Blitz', ch_blitz_s: '3 min + 2 sec', ch_rapid: 'Rapid', ch_rapid_s: '10 min', ch_classic: 'Classic', ch_classic_s: 'No clock',
      ch_start: 'Start the game', ch_friend: 'A friend', ch_friend_d: 'Two people, one board. Pass it across the table.', ch_friend_n: 'Same table',
      ch_you: 'You', ch_strength: 'Strength', ch_moves: 'Moves',
      ch_hint: 'Hint', ch_undo: 'Take back', ch_flip: 'Flip board', ch_resign: 'Resign', ch_resign_q: 'Sure?', ch_new: 'New game',
      ch_your_move: 'Your move', ch_thinking: '{n} is thinking…', ch_turn_w: 'White to move', ch_turn_b: 'Black to move', ch_check: 'Check',
      ch_hint_is: 'Hint: {m}', ch_hint_wait: 'Looking for a good move…',
      ch_w_wins: 'White wins', ch_b_wins: 'Black wins', ch_you_win: 'You win', ch_nwins: '{n} wins', ch_draw: 'Draw',
      ch_r_mate: 'Checkmate', ch_r_resign: 'Resignation', ch_r_time: 'On time', ch_r_stale: 'Stalemate', ch_r_rep: 'Threefold repetition', ch_r_mat: 'Not enough pieces to mate', ch_r_50: 'Fifty-move rule',
      ch_rematch: 'Rematch', ch_change: 'Change opponent',
      ch_promote: 'Promote to', ch_engine_js: 'Your browser couldn’t start the full engine, so the family is playing at a lower level today.',
      ch_n_kicker: 'With Gambit, at Sync it', ch_n_h1: 'Blitz Chess', ch_n_h2: 'Tournament',
      ch_n_lead: 'Real boards, real clocks, real people across the table. Every Wednesday at Sync it.',
      ch_f1a: 'Every Wednesday', ch_f1b: 'Same table, every week.', ch_f2a: '20 participants only', ch_f2b: 'A small field keeps every game close.', ch_f3a: 'Win a free show ticket', ch_f3b: 'First prize is a night at one of our shows.',
      ch_next: 'Next tournament: {d}', ch_today: 'The tournament is today.', ch_poster_view: 'View the poster', ch_close: 'Close',
      ch_ph1: 'Players at a Wednesday tournament', ch_ph2: 'A game in progress in front of the red curtain', ch_cap: 'A Wednesday at Sync it',
      ch_over_l: 'Game over'
    },
    ar: {
      ch_script: 'في سينك إت', ch_h1: 'الشطرنج',
      ch_sub: 'اسحب كرسيًا. العب ضد عائلة سينك إت في أي وقت، أو اجلس أمام خصم حقيقي مساء الأربعاء.',
      ch_cta_play: 'العب ضد العائلة', ch_cta_wed: 'بليتز الأربعاء',
      ch_play_h: 'الطاولة جاهزة', ch_play_s: 'اختر من يجلس أمامك، واختر الساعة، وابدأ بنقلتك الأولى.',
      ch_board_label: 'رقعة الشطرنج', ch_who: 'مع من تريد أن تلعب؟', ch_colour: 'تلعب بـ', ch_clock: 'الساعة',
      ch_white: 'الأبيض', ch_black: 'الأسود', ch_random: 'فاجئني',
      ch_blitz: 'بليتز', ch_blitz_s: '٣ دقائق + ٢ ثانية', ch_rapid: 'سريع', ch_rapid_s: '١٠ دقائق', ch_classic: 'كلاسيكي', ch_classic_s: 'بلا ساعة',
      ch_start: 'ابدأ اللعبة', ch_friend: 'صديق', ch_friend_d: 'شخصان ورقعة واحدة. مرّرها عبر الطاولة.', ch_friend_n: 'على الطاولة نفسها',
      ch_you: 'أنت', ch_strength: 'المستوى', ch_moves: 'النقلات',
      ch_hint: 'تلميح', ch_undo: 'تراجع', ch_flip: 'اقلب الرقعة', ch_resign: 'استسلم', ch_resign_q: 'متأكد؟', ch_new: 'لعبة جديدة',
      ch_your_move: 'دورك', ch_thinking: '{n} يفكّر…', ch_turn_w: 'دور الأبيض', ch_turn_b: 'دور الأسود', ch_check: 'كش',
      ch_hint_is: 'تلميح: {m}', ch_hint_wait: 'أبحث عن نقلة جيدة…',
      ch_w_wins: 'فاز الأبيض', ch_b_wins: 'فاز الأسود', ch_you_win: 'فزت', ch_nwins: 'فاز {n}', ch_draw: 'تعادل',
      ch_r_mate: 'كش مات', ch_r_resign: 'استسلام', ch_r_time: 'بانتهاء الوقت', ch_r_stale: 'جمود', ch_r_rep: 'تكرار ثلاث مرات', ch_r_mat: 'لا قطع كافية للكش مات', ch_r_50: 'قاعدة الخمسين نقلة',
      ch_rematch: 'مباراة أخرى', ch_change: 'غيّر الخصم',
      ch_promote: 'رقّه إلى', ch_engine_js: 'تعذّر على متصفحك تشغيل المحرّك الكامل، فتلعب العائلة اليوم بمستوى أخفّ.',
      ch_n_kicker: 'مع غامبِت، في سينك إت', ch_n_h1: 'بطولة', ch_n_h2: 'شطرنج بليتز',
      ch_n_lead: 'رقع حقيقية وساعات حقيقية وأشخاص حقيقيون أمامك. كل أربعاء في سينك إت.',
      ch_f1a: 'كل أربعاء', ch_f1b: 'الطاولة نفسها كل أسبوع.', ch_f2a: '٢٠ مشاركًا فقط', ch_f2b: 'عدد صغير يُبقي كل مباراة متقاربة.', ch_f3a: 'اربح تذكرة عرض مجانية', ch_f3b: 'الجائزة الأولى ليلة في أحد عروضنا.',
      ch_next: 'البطولة القادمة: {d}', ch_today: 'البطولة اليوم.', ch_poster_view: 'عرض الملصق', ch_close: 'إغلاق',
      ch_ph1: 'لاعبون في بطولة يوم الأربعاء', ch_ph2: 'مباراة جارية أمام الستارة الحمراء', ch_cap: 'مساء أربعاء في سينك إت',
      ch_over_l: 'انتهت اللعبة'
    }
  });

  /* ---------------- the family ---------------- */
  var FAM = {
    othman: {
      img: 'assets/chess/othman.jpg', rating: 800,
      name: { en: 'Osman', ar: 'عثمان' },
      tag: { en: 'Warm, loud and forgiving. A good first game.', ar: 'ودود وصاخب ويتسامح مع الأخطاء. بداية جيدة.' },
      prof: { skill: 1, depth: 3, multipv: 4, pick: [0.42, 0.30, 0.17, 0.11], random: 0.08, delay: [700, 1300] }
    },
    emmy: {
      img: 'assets/chess/emmy.jpg', rating: 1400,
      name: { en: 'Emmy', ar: 'إيمي' },
      tag: { en: 'Every move is a performance, and she plays to win.', ar: 'كل نقلة عرض، وهي تلعب لتفوز.' },
      prof: { elo: 1320, movetime: 250, multipv: 1, delay: [800, 1600] }
    },
    haya: {
      img: 'assets/chess/haya.jpg', rating: 2000,
      name: { en: 'Haya', ar: 'هيا' },
      tag: { en: 'She makes you feel welcome, then quietly plays the strongest move on the board.', ar: 'تشعرك بالترحيب، ثم تلعب بهدوء أقوى نقلة على الرقعة.' },
      prof: { elo: 2000, movetime: 650, multipv: 1, delay: [900, 1700] }
    }
  };

  /* The lines. Keys:
     start, rematch · castleYou, castleHe · takePawn (you take a pawn) · blunder · great · youCheck, heCheck
     heQueen (she/he takes your queen) · heLostQueen (you take theirs) · heLosing, heWinning · slow (you take too long) · opening · heWins, youWin */
  var Q = {
    othman: {
      start: ['Come on, my friend. Let’s see what you’ve got!', 'هيّا يا صديقي، أرني ما عندك!'],
      castleYou: ['Getting your king somewhere safe? I respect that.', 'تُؤمّن ملكك؟ أحترم هذا.'],
      castleHe: ['Everybody behind me. Even the king.', 'الجميع خلفي. حتى الملك!'],
      takePawn: ['Little guy did his job. Now watch what happens.', 'الصغير أدّى دوره. والآن شاهد ما سيحدث.'],
      blunder: ['Whoa! You sure you wanna leave that there?', 'يا للعجب! هل أنت متأكد أنك تريد ترك هذه القطعة هناك؟'],
      heQueen: ['Big target. Couldn’t miss it.', 'هدف كبير. لا يمكن أن أخطئه.'],
      youCheck: ['Ha! You got my attention now.', 'ها! الآن لفتّ انتباهي.'],
      heCheck: ['Heads up! Your king needs backup.', 'انتبه! ملكك يحتاج إلى مساندة.'],
      great: ['Now THAT’S a move! You been holding out on me?', 'هذه نقلة حقًّا! هل كنت تخفي هذا عني؟'],
      heLosing: ['Still standing, my friend. Still standing.', 'ما زلت صامدًا يا صديقي. ما زلت صامدًا.'],
      heWins: ['Nowhere left to run. Good game, my friend!', 'لا مفرّ لك. لعبة جميلة يا صديقي!'],
      youWin: ['You earned that one. Same board, rematch?', 'تستحق هذا الفوز. على الرقعة نفسها، مباراة أخرى؟']
    },
    emmy: {
      start: ['Your debut starts now! Let’s make it iconic.', 'ظهورك الأول يبدأ الآن! لنجعله أيقونيًا.'],
      slow: ['Building suspense? I love a dramatic entrance.', 'تبني التشويق؟ أحب الدخول الدرامي.'],
      castleHe: ['My king’s backstage. VIP access only!', 'ملكي خلف الكواليس. الدخول للمميزين فقط!'],
      blunder: ['Oops! Shall we pretend that was choreography?', 'عفوًا! هل نتظاهر بأن هذه كانت رقصة مدروسة؟'],
      heQueen: ['Sorry, darling. This stage only fits one diva.', 'آسفة يا عزيزي. هذا المسرح يتّسع لديفا واحدة فقط.'],
      great: ['Wait that was YOUR move? Main character moment!', 'مهلًا، هذه نقلتك أنت؟ لحظة بطل الحكاية!'],
      youCheck: ['Ooh, a plot twist! Now I’m paying attention.', 'أوه، مفاجأة في الحبكة! الآن صار عندي اهتمام.'],
      heCheck: ['Spotlight’s on your king!', 'الأضواء على ملكك!'],
      heLostQueen: ['My queen! We rehearsed this!', 'ملكتي! لقد تدرّبنا على هذا!'],
      heLosing: ['Every pop star needs a comeback arc.', 'كل نجم بوب يحتاج إلى عودة قوية.'],
      heWins: ['And that’s the finale! You were a lovely audience.', 'وهذه هي الخاتمة! كنت جمهورًا رائعًا.'],
      youWin: ['You stole the show! Encore? ✨', 'لقد سرقت العرض! هل نعيد؟ ✨']
    },
    haya: {
      start: ['There you are. Come, sit with me. Let’s play.', 'ها أنت. تعال اجلس معي. لنلعب.'],
      opening: ['Make yourself at home. Just keep an eye on your pieces.', 'اعتبر نفسك في بيتك. فقط انتبه إلى قطعك.'],
      slow: ['Take your time, dear. The board isn’t going anywhere.', 'خذ وقتك. الرقعة لن تذهب إلى أي مكان.'],
      blunder: ['Ah, I see what you wanted to do. Watch that square next time.', 'آه، فهمت ما كنت تريد فعله. انتبه لذلك المربع في المرة القادمة.'],
      heQueen: ['You left your queen with me. I’ll take good care of her.', 'تركت ملكتك عندي. سأعتني بها جيدًا.'],
      castleHe: ['Everyone tucked in. Now, where were we?', 'الجميع في أماكنهم. أين كنا؟'],
      great: ['Oh, that’s lovely. You’ve given me something to think about.', 'أوه، هذه جميلة. أعطيتني ما أفكر فيه.'],
      youCheck: ['You saw it! Good. Now let’s see what comes next.', 'رأيتها! جيد. لنرَ ما سيأتي بعد ذلك.'],
      heCheck: ['Your king needs you, dear.', 'ملكك يحتاج إليك.'],
      heWinning: ['One move at a time. There’s still a game to play.', 'خطوة بخطوة. ما زالت هناك لعبة نلعبها.'],
      heWins: ['That’s mate. Stay a moment, we can look at it together.', 'هذا كش مات. ابقَ قليلًا، يمكننا أن ننظر إليه معًا.'],
      youWin: ['You outplayed me. I hope you’re proud of that, I am.', 'لقد تفوّقت عليّ. أتمنى أن تكون فخورًا بنفسك، وأنا كذلك.'],
      rematch: ['Of course. There’s always a seat for you here.', 'بالطبع. هناك دائمًا مقعد لك هنا.']
    }
  };
  /* which line wins when several fit the same turn (first = most important) */
  var ORDER = ['heQueen', 'heLostQueen', 'blunder', 'great', 'youCheck', 'heCheck', 'castleHe', 'castleYou', 'takePawn', 'heLosing', 'heWinning', 'opening'];
  var MAXN = { heQueen: 3, heLostQueen: 3, blunder: 3, great: 3, youCheck: 2, heCheck: 2, castleHe: 1, castleYou: 1, takePawn: 2, heLosing: 2, heWinning: 2, opening: 1, slow: 2 };
  var TIMES = { blitz: { base: 180, inc: 2 }, rapid: { base: 600, inc: 0 }, classic: null };

  /* ---------------- state ---------------- */
  var S = {
    fam: 'othman', colour: 'w', time: 'blitz', mode: 'ai',
    ch: null, me: 'w', flipped: false, started: false, over: null,
    sel: null, targets: [], last: null, hint: null, kb: 'e2', drag: null,
    token: 0, thinking: false, baseline: 0, said: {}, lastSpeak: -9, pend: {}, idleT: 0, hintBusy: false,
    clk: { w: 0, b: 0, inc: 0, on: false, at: 0 }, resignT: 0, rematch: false, anim: null
  };
  var el = {};

  function other(c) { return c === 'w' ? 'b' : 'w'; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function famName(id) { return FAM[id].name[lang()] || FAM[id].name.en; }
  function bottom() { return S.flipped ? other(S.me) : S.me; }
  function sqName(r, c) { return FILES[c] + (8 - r); }
  function fmt(ms) {
    if (ms < 0) ms = 0;
    var s = Math.ceil(ms / 1000), m = Math.floor(s / 60);
    if (ms < 10000) return SYNC.num('0:' + SYNC.pad(Math.floor(ms / 1000)) + '.' + Math.floor((ms % 1000) / 100));
    return SYNC.num(m + ':' + SYNC.pad(s % 60));
  }
  function pieceSVG(color, type, cls) {
    return '<svg class="pc pc-' + color + (cls ? ' ' + cls : '') + '" viewBox="0 0 100 100" aria-hidden="true"><use href="#pc-' + type.toUpperCase() + '"/></svg>';
  }

  /* ---------------- speech ---------------- */
  function say(key, force) {
    if (S.mode !== 'ai') return false;
    var q = Q[S.fam][key];
    if (!q) return false;
    var n = (S.ch ? S.ch.history().length : 0);
    if (!force) {
      if ((S.said[key] || 0) >= (MAXN[key] || 99)) return false;
      if (n - S.lastSpeak < 3) return false;
    }
    S.said[key] = (S.said[key] || 0) + 1; S.lastSpeak = n;
    var line = q[lang() === 'ar' ? 1 : 0];
    el.talkTxt.textContent = line; el.talkTxt.dataset.k = key; S.curKey = key;
    el.talkBubble.classList.remove('pop'); void el.talkBubble.offsetWidth; el.talkBubble.classList.add('pop');
    return true;
  }
  function speakPending() {
    var keys = ORDER.filter(function (k) { return S.pend[k]; });
    S.pend = {};
    for (var i = 0; i < keys.length; i++) { if (say(keys[i])) return; }
  }
  function armIdle() {
    clearTimeout(S.idleT);
    if (S.mode !== 'ai' || !Q[S.fam].slow) return;
    S.idleT = setTimeout(function () {
      if (S.started && !S.over && S.ch.turn() === S.me && !S.thinking) say('slow');
    }, 38000);
  }
  function refreshLine() {
    if (S.curKey && Q[S.fam] && Q[S.fam][S.curKey]) el.talkTxt.textContent = Q[S.fam][S.curKey][lang() === 'ar' ? 1 : 0];
  }

  /* ---------------- board ---------------- */
  function legalFrom(sq) { return S.started && !S.over ? S.ch.moves({ square: sq, verbose: true }) : []; }
  function canMove() { return S.started && !S.over && !S.thinking && !S.promoting && (S.mode === 'two' || S.ch.turn() === S.me); }
  function kingSq(color) {
    var b = S.ch.board(), r, c;
    for (r = 0; r < 8; r++) for (c = 0; c < 8; c++) if (b[r][c] && b[r][c].type === 'k' && b[r][c].color === color) return sqName(r, c);
    return null;
  }
  function pieceName(p) { return (p.color === 'w' ? t('ch_white') : t('ch_black')) + ' ' + NAMES[p.type]; }

  function renderBoard() {
    var b = S.ch.board(), bot = bottom(), h = '', i, j, r, c, p, sq, cls, inCheck = S.ch.isCheck() ? kingSq(S.ch.turn()) : null;
    for (i = 0; i < 8; i++) for (j = 0; j < 8; j++) {
      r = bot === 'w' ? i : 7 - i; c = bot === 'w' ? j : 7 - j;
      p = b[r][c]; sq = sqName(r, c);
      cls = 'sq ' + ((r + c) % 2 ? 'd' : 'l');
      if (S.last && (S.last.from === sq || S.last.to === sq)) cls += ' is-last';
      if (S.sel === sq) cls += ' is-sel';
      if (S.targets.indexOf(sq) > -1) cls += p ? ' is-cap' : ' is-tg';
      if (inCheck === sq) cls += ' is-check';
      if (S.hint && (S.hint.from === sq || S.hint.to === sq)) cls += ' is-hint';
      if (S.kbOn && S.kb === sq) cls += ' is-kb';
      h += '<div class="' + cls + '" role="gridcell" data-s="' + sq + '" aria-label="' + sq + (p ? ', ' + pieceName(p) : '') + '">' +
        (j === 0 ? '<i class="rk">' + SYNC.num(8 - r) + '</i>' : '') + (i === 7 ? '<i class="fl">' + FILES[c] + '</i>' : '') +
        (p ? pieceSVG(p.color, p.type) : '') + '</div>';
    }
    el.board.innerHTML = h;
    el.board.classList.toggle('is-idle', !S.started);
    // slide the piece that just moved
    if (S.anim) {
      var a = S.anim; S.anim = null;
      var to = $('.sq[data-s="' + a.to + '"] .pc', el.board), fr = $('.sq[data-s="' + a.from + '"]', el.board), tt = $('.sq[data-s="' + a.to + '"]', el.board);
      if (to && fr && tt && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var fb = fr.getBoundingClientRect(), tb = tt.getBoundingClientRect();
        to.style.transition = 'none'; to.style.transform = 'translate(' + (fb.left - tb.left) + 'px,' + (fb.top - tb.top) + 'px)'; to.style.zIndex = 5;
        void to.getBoundingClientRect(); to.style.transition = 'transform .22s cubic-bezier(.3,.7,.2,1)'; to.style.transform = 'none';
        setTimeout(function () { to.style.zIndex = ''; to.style.transition = ''; }, 260);
      }
    }
  }

  function captured() {
    var by = { w: [], b: [] }, sc = { w: 0, b: 0 };
    S.ch.history({ verbose: true }).forEach(function (m) { if (m.captured) { by[m.color].push(m.captured); sc[m.color] += VAL[m.captured]; } });
    ['w', 'b'].forEach(function (c) { by[c].sort(function (x, y) { return VAL[y] - VAL[x]; }); });
    return { by: by, diff: sc.w - sc.b };
  }
  function renderBars() {
    var cap = S.ch ? captured() : { by: { w: [], b: [] }, diff: 0 };
    var bot = bottom(), top = other(bot);
    [['pTop', top], ['pBot', bot]].forEach(function (x) {
      var c = x[1], isOpp = S.mode === 'ai' && c !== S.me, av, nm, sub = '', avc = '';
      if (isOpp) { av = '<img src="' + FAM[S.fam].img + '" alt="">'; nm = famName(S.fam); sub = '<span class="pbar__r">' + t('ch_strength') + ' ~' + SYNC.num(FAM[S.fam].rating) + '</span>'; }
      else { av = '<span class="pbar__pc">' + pieceSVG(c, 'k') + '</span>'; avc = c === 'b' ? ' pbar__av--b' : ''; nm = S.mode === 'two' ? (c === 'w' ? t('ch_white') : t('ch_black')) : t('ch_you'); }
      var capH = cap.by[c].map(function (ty) { return pieceSVG(other(c), ty, 'pc--s'); }).join('');
      var lead = (c === 'w' ? cap.diff : -cap.diff);
      el[x[0]].innerHTML = '<div class="pbar__av' + (isOpp ? ' is-fam' : avc) + '">' + av + '</div><div class="pbar__who"><b>' + nm + '</b>' + (sub || '<span class="pbar__cap">' + capH + (lead > 0 ? '<em>+' + SYNC.num(lead) + '</em>' : '') + '</span>') + '</div>' +
        (isOpp && S.started ? '<span class="pbar__cap pbar__cap--r">' + capH + (lead > 0 ? '<em>+' + SYNC.num(lead) + '</em>' : '') + '</span>' : '') +
        '<div class="pbar__clock" data-c="' + c + '"' + (TIMES[S.time] && S.started ? '' : ' hidden') + '>' + fmt(S.clk[c]) + '</div>';
      el[x[0]].classList.toggle('is-turn', S.started && !S.over && S.ch.turn() === c);
    });
    updateClocks();
  }
  function updateClocks() {
    var tn = S.ch && S.started && !S.over ? S.ch.turn() : null;
    $$('.pbar__clock').forEach(function (n) {
      var c = n.dataset.c, v = S.clk[c];
      if (S.clk.on && c === tn) v -= (performance.now() - S.clk.at);
      n.textContent = fmt(v); n.classList.toggle('is-low', TIMES[S.time] && v < 30000 && v > 0 && S.started && !S.over);
    });
  }
  function renderMoves() {
    var hist = S.ch.history(), h = '', i;
    for (i = 0; i < hist.length; i += 2) {
      h += '<li><span class="mn">' + SYNC.num(i / 2 + 1) + '.</span><span class="mv" dir="ltr">' + hist[i] + '</span><span class="mv" dir="ltr">' + (hist[i + 1] || '') + '</span></li>';
    }
    el.moveList.innerHTML = h; el.moves.scrollTop = el.moves.scrollHeight;
  }
  function renderStatus() {
    var s;
    if (!S.started) s = '';
    else if (S.over) s = '';
    else if (S.hintBusy) s = t('ch_hint_wait');
    else if (S.hintText) s = S.hintText;
    else if (S.thinking) s = t('ch_thinking', { n: famName(S.fam) });
    else if (S.mode === 'two') s = t(S.ch.turn() === 'w' ? 'ch_turn_w' : 'ch_turn_b') + (S.ch.isCheck() ? ' · ' + t('ch_check') : '');
    else s = t('ch_your_move') + (S.ch.isCheck() ? ' · ' + t('ch_check') : '');
    el.status.textContent = s;
    el.srLive.textContent = s;
    el.btnHint.disabled = !(S.started && !S.over && !S.thinking && !S.hintBusy && (S.mode === 'ai' ? S.ch.turn() === S.me : true));
    el.btnUndo.disabled = !(S.started && !S.over && S.ch.history().length > (S.mode === 'ai' && S.me === 'b' ? 1 : 0));
    el.btnResign.disabled = !(S.started && !S.over);
  }
  function renderAll() { renderBoard(); renderBars(); renderStatus(); }

  /* ---------------- clocks ---------------- */
  function startClocks() {
    var tc = TIMES[S.time];
    S.clk = { w: tc ? tc.base * 1000 : 0, b: tc ? tc.base * 1000 : 0, inc: tc ? tc.inc * 1000 : 0, on: false, at: 0 };
  }
  function syncClock(mover) {
    var tc = TIMES[S.time]; if (!tc) return;
    var n = performance.now();
    if (S.clk.on) { S.clk[mover] -= (n - S.clk.at); S.clk[mover] += S.clk.inc; }
    S.clk.at = n;
    if (!S.clk.on && S.ch.history().length >= 2) S.clk.on = true;     // clocks start once both sides have moved
  }
  setInterval(function () {
    if (!S.started || S.over || !S.clk.on || !TIMES[S.time]) return;
    var tn = S.ch.turn(), v = S.clk[tn] - (performance.now() - S.clk.at);
    updateClocks();
    if (v <= 0) { S.clk[tn] = 0; S.clk.on = false; finish({ winner: other(tn), reason: 'time' }); }
  }, 100);

  /* ---------------- game flow ---------------- */
  function resetGame() {
    S.token++; SFE.cancel(); clearTimeout(S.idleT);
    S.ch = new Chess(); S.sel = null; S.targets = []; S.last = null; S.hint = null; S.hintText = ''; S.over = null; S.thinking = false; S.promoting = null;
    S.baseline = 0; S.said = {}; S.lastSpeak = -9; S.pend = {}; S.curKey = ''; S.hintBusy = false;
  }
  function startGame(rematch) {
    S.mode = S.fam === 'friend' ? 'two' : 'ai';
    resetGame(); startClocks();
    S.me = S.mode === 'two' ? 'w' : (S.colour === 'r' ? (Math.random() < .5 ? 'w' : 'b') : S.colour);
    S.flipped = false; S.started = true; S.rematch = !!rematch;
    SFE.newGame();
    el.setup.hidden = true; el.game.hidden = false; el.over.hidden = true; el.promo.hidden = true;
    el.talk.hidden = S.mode !== 'ai';
    if (S.mode === 'ai') {
      el.talkImg.src = FAM[S.fam].img; el.talkImg.alt = famName(S.fam);
      say(rematch && Q[S.fam].rematch ? 'rematch' : 'start', true); S.lastSpeak = -9;
    }
    renderAll(); renderMoves(); armIdle();
    el.btnResign.classList.remove('is-sure'); $('#resignTxt').textContent = t('ch_resign');
    if (S.mode === 'ai' && S.ch.turn() !== S.me) setTimeout(engineTurn, 500);
    if (window.innerWidth < 960) el.board.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  function toSetup() {
    resetGame(); S.started = false; S.mode = S.fam === 'friend' ? 'two' : 'ai';
    S.me = S.colour === 'b' ? 'b' : 'w'; S.flipped = false;
    el.setup.hidden = false; el.game.hidden = true; el.over.hidden = true; el.promo.hidden = true;
    startClocks(); renderAll(); renderSetup();
  }

  function playMove(from, to, promo, byEngine) {
    var m;
    try { m = S.ch.move({ from: from, to: to, promotion: promo }); } catch (e) { return null; }
    if (!m) return null;
    var n = S.ch.history().length, mine = !byEngine && S.mode === 'ai';
    syncClock(m.color);
    S.last = { from: m.from, to: m.to }; S.anim = { from: m.from, to: m.to }; S.sel = null; S.targets = []; S.hint = null; S.hintText = ''; S.kbOn = false;
    clearTimeout(S.idleT);
    if (S.mode === 'ai') {
      if (byEngine) {
        if (m.flags.indexOf('k') > -1 || m.flags.indexOf('q') > -1) S.pend.castleHe = 1;
        if (m.captured === 'q') S.pend.heQueen = 1;
        if (S.ch.isCheck() && !S.ch.isCheckmate()) S.pend.heCheck = 1;
      } else {
        if (m.flags.indexOf('k') > -1 || m.flags.indexOf('q') > -1) S.pend.castleYou = 1;
        if (m.captured === 'p') S.pend.takePawn = 1;
        if (m.captured === 'q') S.pend.heLostQueen = 1;
        if (S.ch.isCheck() && !S.ch.isCheckmate()) S.pend.youCheck = 1;
        if (n === (S.me === 'w' ? 3 : 4)) S.pend.opening = 1;
      }
    }
    renderAll(); renderMoves();
    var end = gameEnd();
    if (end) { finish(end); return m; }
    if (S.mode === 'ai') {
      if (mine) engineTurn(); else { speakPending(); armIdle(); renderStatus(); }
    }
    return m;
  }
  function gameEnd() {
    var ch = S.ch;
    if (ch.isCheckmate()) return { winner: other(ch.turn()), reason: 'mate' };
    if (ch.isStalemate()) return { winner: null, reason: 'stale' };
    if (ch.isInsufficientMaterial()) return { winner: null, reason: 'mat' };
    if (ch.isThreefoldRepetition()) return { winner: null, reason: 'rep' };
    if (ch.isDrawByFiftyMoves()) return { winner: null, reason: '50' };
    return null;
  }
  function finish(res) {
    S.over = res; S.token++; SFE.cancel(); clearTimeout(S.idleT); S.thinking = false; S.clk.on = false; S.sel = null; S.targets = []; S.hint = null; S.hintText = '';
    var title, why = t({ mate: 'ch_r_mate', resign: 'ch_r_resign', time: 'ch_r_time', stale: 'ch_r_stale', rep: 'ch_r_rep', mat: 'ch_r_mat', '50': 'ch_r_50' }[res.reason]);
    if (!res.winner) title = t('ch_draw');
    else if (S.mode === 'ai') title = res.winner === S.me ? t('ch_you_win') : t('ch_nwins', { n: famName(S.fam) });
    else title = t(res.winner === 'w' ? 'ch_w_wins' : 'ch_b_wins');
    if (S.mode === 'ai' && res.winner) { S.pend = {}; say(res.winner === S.me ? 'youWin' : 'heWins', true); }
    S.pend = {};
    el.over.innerHTML = '<div class="over__card"><p class="over__k">' + t('ch_over_l') + '</p><h3>' + title + '</h3><p class="over__why">' + why + '</p>' +
      '<div class="over__btns"><button class="btn btn--gold" type="button" id="ovRe">' + t('ch_rematch') + '</button><button class="btn btn--ghost" type="button" id="ovCh">' + t('ch_change') + '</button></div></div>';
    el.over.hidden = false;
    $('#ovRe').addEventListener('click', function () { startGame(true); });
    $('#ovCh').addEventListener('click', toSetup);
    setTimeout(function () { var b = $('#ovRe'); if (b) b.focus({ preventScroll: true }); }, 50);
    renderAll();
  }

  /* ---------------- the opponent's turn ---------------- */
  function engineTurn() {
    if (S.over || !S.started) return;
    var tok = ++S.token, prof = FAM[S.fam].prof, t0 = performance.now(), fen = S.ch.fen(), plies = S.ch.history().length;
    S.thinking = true; renderStatus();
    SFE.search(fen, prof).then(function (res) {
      var wait = Math.max(0, rnd(prof.delay[0], prof.delay[1]) - (performance.now() - t0));
      setTimeout(function () {
        if (tok !== S.token || S.over) return;
        var lines = res.lines || [], best = lines[0], mv = res.best, chosen;
        if (S.ch.turn() === S.me) return;
        // how good was the move you just made? (compare the position before and after, from your side)
        if (best && plies >= 3 && S.mode === 'ai') {
          var after = -best.cp, delta = after - S.baseline;
          if (delta <= -220 && S.baseline > -450) S.pend.blunder = 1;
          else if (delta >= 140 && after > -100) S.pend.great = 1;
        }
        if (prof.pick && lines.length > 1) {                    // Osman: a friendly, forgiving player
          var r = Math.random(), acc = 0, k = 0, w = prof.pick;
          for (k = 0; k < Math.min(w.length, lines.length); k++) { acc += w[k]; if (r < acc) break; }
          mv = lines[Math.min(k, lines.length - 1)].move;
          if (plies > 6 && Math.random() < prof.random) { var all = S.ch.moves({ verbose: true }); var rm = pick(all); mv = rm.from + rm.to + (rm.promotion ? 'q' : ''); }
        }
        if (!mv) { var any = S.ch.moves({ verbose: true }); if (!any.length) return; mv = any[0].from + any[0].to + (any[0].promotion ? 'q' : ''); }
        chosen = lines.filter(function (l) { return l.move === mv; })[0];
        var cpEng = chosen ? chosen.cp : (lines.length ? lines[lines.length - 1].cp - 150 : 0);
        S.baseline = -cpEng;
        if (cpEng <= -300) S.pend.heLosing = 1;
        if (cpEng >= 300) S.pend.heWinning = 1;
        S.thinking = false;
        var m = playMove(mv.slice(0, 2), mv.slice(2, 4), mv.length > 4 ? mv[4] : undefined, true);
        if (!m) { // an engine move we could not play: fall back to any legal move
          var lm = S.ch.moves({ verbose: true }); if (lm.length) playMove(lm[0].from, lm[0].to, lm[0].promotion ? 'q' : undefined, true);
        }
      }, wait);
    });
  }

  /* ---------------- input ---------------- */
  function squareAt(x, y) {
    var r = el.board.getBoundingClientRect(), s = r.width / 8;
    var c = Math.floor((x - r.left) / s), rk = Math.floor((y - r.top) / s);
    if (c < 0 || c > 7 || rk < 0 || rk > 7) return null;
    var bot = bottom();
    return bot === 'w' ? FILES[c] + (8 - rk) : FILES[7 - c] + (rk + 1);
  }
  function pieceOn(sq) { return S.ch.get(sq); }
  function ownTurnPiece(p) { return p && p.color === S.ch.turn() && (S.mode === 'two' || p.color === S.me); }

  function select(sq) {
    S.sel = sq; S.targets = legalFrom(sq).map(function (m) { return m.to; }); S.hint = null; S.hintText = ''; renderBoard(); renderStatus();
  }
  function tryMove(from, to) {
    var moves = legalFrom(from).filter(function (m) { return m.to === to; });
    if (!moves.length) return false;
    if (moves[0].promotion) { askPromo(from, to, moves[0].color); return true; }
    playMove(from, to);
    return true;
  }
  function askPromo(from, to, color) {
    S.promoting = { from: from, to: to };
    el.promo.innerHTML = '<div class="promo__card"><p>' + t('ch_promote') + '</p><div class="promo__row">' + ['q', 'r', 'b', 'n'].map(function (ty) {
      return '<button type="button" data-p="' + ty + '" aria-label="' + NAMES[ty] + '">' + pieceSVG(color, ty) + '</button>';
    }).join('') + '</div></div>';
    el.promo.hidden = false;
    var f = $('button', el.promo); if (f) f.focus({ preventScroll: true });
  }
  function clickSquare(sq) {
    if (!canMove()) return;
    var p = pieceOn(sq);
    if (S.sel && S.sel !== sq && S.targets.indexOf(sq) > -1) { tryMove(S.sel, sq); return; }
    if (ownTurnPiece(p)) { if (S.sel === sq) { S.sel = null; S.targets = []; renderBoard(); } else select(sq); }
    else if (S.sel) { S.sel = null; S.targets = []; renderBoard(); }
  }

  function bindBoard() {
    var down = null;
    el.board.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      var sqEl = e.target.closest('.sq'); if (!sqEl) return;
      var sq = sqEl.dataset.s; S.kbOn = false;
      if (!canMove()) return;
      var p = pieceOn(sq), startSel = S.sel;
      if (ownTurnPiece(p) && !(S.sel && S.targets.indexOf(sq) > -1)) {
        if (S.sel !== sq) select(sq);
        down = { sq: sq, x: e.clientX, y: e.clientY, drag: false, type: e.pointerType, wasSel: startSel === sq, p: p };
        if (e.pointerType !== 'touch') { try { el.board.setPointerCapture(e.pointerId); } catch (er) {} }
      } else { down = { sq: sq, tap: true, type: e.pointerType }; }
    });
    el.board.addEventListener('pointermove', function (e) {
      if (!down || down.tap || down.type === 'touch') return;
      if (!down.drag && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) {
        down.drag = true;
        var g = document.createElement('div'); g.className = 'ghost'; g.innerHTML = pieceSVG(down.p.color, down.p.type);
        var sz = el.board.getBoundingClientRect().width / 8; g.style.width = g.style.height = (sz * 1.05) + 'px';
        document.body.appendChild(g); down.ghost = g;
        var src = $('.sq[data-s="' + down.sq + '"] .pc', el.board); if (src) src.style.opacity = '.25';
      }
      if (down.drag) { down.ghost.style.left = e.clientX + 'px'; down.ghost.style.top = e.clientY + 'px'; }
    });
    function up(e) {
      if (!down) return;
      var d = down; down = null;
      if (d.ghost) d.ghost.remove();
      if (d.tap) { clickSquare(d.sq); return; }
      var to = squareAt(e.clientX, e.clientY);
      if (d.drag) { if (to && to !== d.sq && S.targets.indexOf(to) > -1) tryMove(d.sq, to); else renderBoard(); return; }
      // a plain click on your own piece: it is already selected, a second click puts it down
      if (d.wasSel) { S.sel = null; S.targets = []; renderBoard(); }
    }
    el.board.addEventListener('pointerup', up);
    el.board.addEventListener('pointercancel', function () { if (down && down.ghost) down.ghost.remove(); down = null; renderBoard(); });

    // keyboard: arrows move around the board, Enter or Space picks up and puts down
    el.board.addEventListener('focus', function () { if (!S.kbOn) { S.kbOn = true; renderBoard(); } });
    el.board.addEventListener('blur', function () { S.kbOn = false; renderBoard(); });
    el.board.addEventListener('keydown', function (e) {
      var k = e.key, f = FILES.indexOf(S.kb[0]), r = +S.kb[1], bw = bottom() === 'w';
      var map = { ArrowLeft: bw ? [-1, 0] : [1, 0], ArrowRight: bw ? [1, 0] : [-1, 0], ArrowUp: bw ? [0, 1] : [0, -1], ArrowDown: bw ? [0, -1] : [0, 1] };
      if (map[k]) { e.preventDefault(); f = Math.max(0, Math.min(7, f + map[k][0])); r = Math.max(1, Math.min(8, r + map[k][1])); S.kb = FILES[f] + r; S.kbOn = true; renderBoard(); var p = pieceOn(S.kb); el.srLive.textContent = S.kb + (p ? ', ' + pieceName(p) : ''); }
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); clickSquare(S.kb); S.kbOn = true; renderBoard(); }
      else if (k === 'Escape') { S.sel = null; S.targets = []; renderBoard(); }
    });
    el.promo.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-p]'); if (!b || !S.promoting) return;
      var pr = S.promoting; S.promoting = null; el.promo.hidden = true; playMove(pr.from, pr.to, b.dataset.p);
    });
  }

  /* ---------------- buttons ---------------- */
  function hint() {
    if (el.btnHint.disabled) return;
    S.hintBusy = true; S.hint = null; S.hintText = ''; renderStatus();
    var tok = S.token, fen = S.ch.fen();
    SFE.search(fen, { skill: 20, movetime: 700, multipv: 1 }).then(function (res) {
      S.hintBusy = false;
      if (tok !== S.token || S.over || S.ch.fen() !== fen || !res.best) { renderStatus(); return; }
      var mv = res.best, probe = new Chess(fen), m;
      try { m = probe.move({ from: mv.slice(0, 2), to: mv.slice(2, 4), promotion: mv[4] }); } catch (e) { renderStatus(); return; }
      S.hint = { from: mv.slice(0, 2), to: mv.slice(2, 4) }; S.hintText = t('ch_hint_is', { m: m.san });
      renderBoard(); renderStatus();
    });
  }
  function undo() {
    if (el.btnUndo.disabled) return;
    S.token++; SFE.cancel(); S.thinking = false; S.promoting = null; el.promo.hidden = true;
    if (S.mode === 'ai') {
      if (S.ch.turn() !== S.me) S.ch.undo();            // they were still thinking: take back only your move
      else { S.ch.undo(); S.ch.undo(); }                // otherwise take back their reply and your move
    } else S.ch.undo();
    var h = S.ch.history({ verbose: true }), lm = h[h.length - 1];
    S.last = lm ? { from: lm.from, to: lm.to } : null; S.sel = null; S.targets = []; S.hint = null; S.hintText = ''; S.baseline = 0;
    if (S.clk.on) S.clk.at = performance.now();
    renderAll(); renderMoves(); armIdle();
    if (S.mode === 'ai' && S.ch.turn() !== S.me) engineTurn();
  }
  function resign() {
    if (el.btnResign.disabled) return;
    if (!el.btnResign.classList.contains('is-sure')) {
      el.btnResign.classList.add('is-sure'); $('#resignTxt').textContent = t('ch_resign_q');
      clearTimeout(S.resignT); S.resignT = setTimeout(function () { el.btnResign.classList.remove('is-sure'); $('#resignTxt').textContent = t('ch_resign'); }, 3000);
      return;
    }
    clearTimeout(S.resignT); el.btnResign.classList.remove('is-sure'); $('#resignTxt').textContent = t('ch_resign');
    var loser = S.mode === 'ai' ? S.me : S.ch.turn();
    finish({ winner: other(loser), reason: 'resign' });
  }

  /* ---------------- setup panel ---------------- */
  function renderSetup() {
    var L = lang(), h = '';
    ['othman', 'emmy', 'haya'].forEach(function (id) {
      var f = FAM[id], on = S.fam === id;
      h += '<button class="fam__c' + (on ? ' is-on' : '') + '" type="button" role="radio" aria-checked="' + on + '" data-f="' + id + '">' +
        '<span class="fam__av"><img src="' + f.img + '" alt=""></span><span class="fam__t"><b>' + famName(id) + '</b><span class="fam__r">' + t('ch_strength') + ' ~' + SYNC.num(f.rating) + '</span>' +
        '<span class="fam__d">' + (f.tag[L] || f.tag.en) + '</span></span></button>';
    });
    h += '<button class="fam__c fam__c--friend' + (S.fam === 'friend' ? ' is-on' : '') + '" type="button" role="radio" aria-checked="' + (S.fam === 'friend') + '" data-f="friend">' +
      '<span class="fam__av fam__av--two"><span class="l">' + pieceSVG('b', 'k') + '</span><span class="r">' + pieceSVG('w', 'k') + '</span></span><span class="fam__t"><b>' + t('ch_friend') + '</b><span class="fam__r">' + t('ch_friend_n') + '</span><span class="fam__d">' + t('ch_friend_d') + '</span></span></button>';
    el.fam.innerHTML = h;
    var cols = [['w', 'ch_white'], ['b', 'ch_black'], ['r', 'ch_random']];
    el.segColour.innerHTML = cols.map(function (c) { return '<button type="button" role="radio" aria-checked="' + (S.colour === c[0]) + '" class="' + (S.colour === c[0] ? 'is-on' : '') + '" data-c="' + c[0] + '"' + (S.fam === 'friend' ? ' disabled' : '') + '>' + t(c[1]) + '</button>'; }).join('');
    var tm = [['blitz', 'ch_blitz', 'ch_blitz_s'], ['rapid', 'ch_rapid', 'ch_rapid_s'], ['classic', 'ch_classic', 'ch_classic_s']];
    el.segTime.innerHTML = tm.map(function (c) { return '<button type="button" role="radio" aria-checked="' + (S.time === c[0]) + '" class="' + (S.time === c[0] ? 'is-on' : '') + '" data-t="' + c[0] + '"><b>' + t(c[1]) + '</b><span>' + t(c[2]) + '</span></button>'; }).join('');
    if (SFE.kind() === 'js') { el.engNote.hidden = false; el.engNote.textContent = t('ch_engine_js'); }
  }

  /* ---------------- Wednesday ---------------- */
  function nextWed() {
    var n = SYNC.now(), delta = (3 - n.dow + 7) % 7, node = $('#nextWed');
    if (delta === 0) { node.textContent = t('ch_today'); return; }
    var d = new Date(Date.UTC(n.y, n.m - 1, n.d + delta));
    var s = d.toLocaleDateString(lang() === 'ar' ? 'ar-SA-u-ca-gregory-nu-arab' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
    node.textContent = t('ch_next', { d: s });
  }
  function checks() {
    var h = '', i; for (i = 0; i < 62; i++) h += '<i></i>';
    $('.ch-night__checks').innerHTML = h;
  }

  /* ---------------- boot ---------------- */
  function init() {
    ['board', 'promo', 'over', 'pTop', 'pBot', 'setup', 'game', 'moves', 'moveList', 'status', 'srLive', 'btnHint', 'btnUndo', 'btnFlip', 'btnResign', 'talk', 'talkImg', 'talkTxt', 'talkBubble', 'segColour', 'segTime', 'engNote'].forEach(function (id) { el[id] = document.getElementById(id); });
    el.fam = document.getElementById('famPick');
    SYNC.apply(document);
    S.ch = new Chess(); startClocks(); renderAll(); renderSetup(); nextWed();
    bindBoard();

    el.fam.addEventListener('click', function (e) { var b = e.target.closest('[data-f]'); if (!b) return; S.fam = b.dataset.f; S.mode = S.fam === 'friend' ? 'two' : 'ai'; renderSetup(); renderBars(); });
    el.segColour.addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (!b || b.disabled) return; S.colour = b.dataset.c; S.me = S.colour === 'b' ? 'b' : 'w'; S.flipped = false; renderSetup(); renderAll(); });
    el.segTime.addEventListener('click', function (e) { var b = e.target.closest('[data-t]'); if (!b) return; S.time = b.dataset.t; renderSetup(); });
    $('#btnStart').addEventListener('click', function () { startGame(false); });
    el.btnHint.addEventListener('click', hint);
    el.btnUndo.addEventListener('click', undo);
    el.btnFlip.addEventListener('click', function () { S.flipped = !S.flipped; renderAll(); });
    el.btnResign.addEventListener('click', resign);
    $('#btnNew').addEventListener('click', toSetup);

    var lb = $('#chLb');
    $('#posterBtn').addEventListener('click', function () { $('#chLbImg').src = 'assets/chess/poster.jpg'; if (lb.showModal) lb.showModal(); });
    $('#chLbX').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    checks();

    document.addEventListener('syncit:lang', function () { renderSetup(); renderAll(); nextWed(); refreshLine(); if (!el.over.hidden && S.over) { var o = S.over; finish(o); } });
    SFE.init().then(function () { if (SFE.kind() === 'js') renderSetup(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
