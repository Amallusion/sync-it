/* Sync it — chess engine wrapper.
   Order of attempts: Stockfish 19 (WebAssembly, lite, single thread) -> Stockfish 19 (asm.js) -> a small built-in engine,
   so the board still plays if a browser blocks workers or WebAssembly.
   Needs js/engine/chess.min.js (chess.js) loaded first. */
(function () {
  'use strict';
  var BASE = 'js/engine/';
  var state = { kind: '', worker: null, chain: Promise.resolve(), ready: null };

  function spawn(file, wait) {
    return new Promise(function (resolve, reject) {
      var w;
      try { w = new Worker(BASE + file); } catch (e) { return reject(e); }
      var done = false, timer = setTimeout(function () { if (!done) { done = true; try { w.terminate(); } catch (e) {} reject(new Error('timeout')); } }, wait);
      w.onerror = function () { if (!done) { done = true; clearTimeout(timer); try { w.terminate(); } catch (e) {} reject(new Error('worker')); } };
      w.onmessage = function (e) {
        var s = String(e.data);
        if (s === 'uciok') w.postMessage('isready');
        else if (s === 'readyok' && !done) { done = true; clearTimeout(timer); w.onmessage = null; w.onerror = null; resolve(w); }
      };
      w.postMessage('uci');
    });
  }

  function init() {
    if (state.ready) return state.ready;
    state.ready = spawn('stockfish-19-lite-single.js', 9000)
      .then(function (w) { state.worker = w; state.kind = 'wasm'; return state.kind; })
      .catch(function () { return spawn('stockfish-19-asm.js', 20000).then(function (w) { state.worker = w; state.kind = 'asm'; return state.kind; }); })
      .catch(function () { state.kind = 'js'; return state.kind; });
    return state.ready;
  }

  /* score parsing: returns centipawns from the side to move's point of view; mates become large numbers */
  function parseInfo(s) {
    var mpv = /multipv (\d+)/.exec(s), cp = /score cp (-?\d+)/.exec(s), mate = /score mate (-?\d+)/.exec(s), pv = / pv (\S+)/.exec(s), dp = /depth (\d+)/.exec(s);
    if (!pv || (!cp && !mate)) return null;
    return { i: mpv ? +mpv[1] : 1, depth: dp ? +dp[1] : 0, move: pv[1], cp: cp ? +cp[1] : (mate[1] > 0 ? 10000 - mate[1] * 10 : -10000 - mate[1] * 10) };
  }

  /* ---------- the small built-in engine (only used if Stockfish can't start) ---------- */
  var VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
  function material(ch) {
    var b = ch.board(), s = 0, r, c, p;
    for (r = 0; r < 8; r++) for (c = 0; c < 8; c++) { p = b[r][c]; if (p) s += (p.color === 'w' ? 1 : -1) * (VAL[p.type] + (p.type === 'p' ? (p.color === 'w' ? 7 - r : r) * 4 : 0) + ((c > 1 && c < 6 && r > 1 && r < 6) ? 6 : 0)); }
    return s;
  }
  function nega(ch, d, a, b) {
    if (ch.isCheckmate()) return -99000 - d;
    if (ch.isDraw()) return 0;
    if (d === 0) return (ch.turn() === 'w' ? 1 : -1) * material(ch);
    var ms = ch.moves({ verbose: true }), i, v;
    ms.sort(function (x, y) { return (y.captured ? 1 : 0) - (x.captured ? 1 : 0); });
    for (i = 0; i < ms.length; i++) {
      ch.move(ms[i]); v = -nega(ch, d - 1, -b, -a); ch.undo();
      if (v >= b) return b;
      if (v > a) a = v;
    }
    return a;
  }
  function fallback(fen, o) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var ch = new Chess(fen), ms = ch.moves({ verbose: true }), out = [];
        ms.forEach(function (m) { ch.move(m); out.push({ move: m.from + m.to + (m.promotion || ''), cp: -nega(ch, 1, -1e6, 1e6) + Math.round(Math.random() * 12) }); ch.undo(); });
        out.sort(function (x, y) { return y.cp - x.cp; });
        var lines = out.slice(0, o.multipv || 1).map(function (l, i) { l.i = i + 1; return l; });
        resolve({ best: lines.length ? lines[0].move : null, lines: lines, kind: 'js' });
      }, 30);
    });
  }

  /* o: { skill, elo, multipv, depth, movetime } */
  function run(fen, o) {
    return init().then(function () {
      if (state.kind === 'js') return fallback(fen, o);
      return new Promise(function (resolve) {
        var w = state.worker, lines = {}, finished = false;
        var guard = setTimeout(function () { if (!finished) { w.postMessage('stop'); } }, (o.movetime || 1500) + 6000);
        w.onmessage = function (e) {
          var s = String(e.data);
          if (s.indexOf('info') === 0) { var p = parseInfo(s); if (p) lines[p.i] = p; }
          else if (s.indexOf('bestmove') === 0) {
            finished = true; clearTimeout(guard); w.onmessage = null;
            var best = s.split(' ')[1], arr = Object.keys(lines).map(function (k) { return lines[k]; }).sort(function (a, b) { return a.i - b.i; });
            if (best === '(none)') best = null;
            resolve({ best: best, lines: arr, kind: state.kind });
          }
        };
        if (o.elo) { w.postMessage('setoption name UCI_LimitStrength value true'); w.postMessage('setoption name UCI_Elo value ' + o.elo); }
        else w.postMessage('setoption name UCI_LimitStrength value false');
        w.postMessage('setoption name Skill Level value ' + (o.skill == null ? 20 : o.skill));
        w.postMessage('setoption name MultiPV value ' + (o.multipv || 1));
        w.postMessage('position fen ' + fen);
        w.postMessage(o.depth ? 'go depth ' + o.depth : 'go movetime ' + (o.movetime || 600));
      });
    });
  }

  window.SFE = {
    init: init,
    kind: function () { return state.kind; },
    /* searches are queued so a hint can never collide with the opponent's move */
    search: function (fen, o) { var p = state.chain.then(function () { return run(fen, o || {}); }); state.chain = p.catch(function () {}); return p; },
    cancel: function () { if (state.worker && state.kind !== 'js') { try { state.worker.postMessage('stop'); } catch (e) {} } },
    newGame: function () { if (state.worker && state.kind !== 'js') { try { state.worker.postMessage('ucinewgame'); } catch (e) {} } }
  };
})();
