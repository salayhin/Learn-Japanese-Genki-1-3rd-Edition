/* ===========================================================================
   flashcards.js — a flip-card reading deck with self-grading.

   The front shows Japanese only. Read it aloud, then flip: the back gives the
   reading (kana + romaji) and the meaning. You grade yourself — "Missed" puts
   the card back into the deck a few cards later, so every session ends with
   each card read correctly at least once. Misses are remembered in this
   browser (localStorage) so the next session can drill just those.

   Markup it expects:

     <div class="widget" data-flashcards></div>
     <script>
       window.FLASHCARDS = [
         // [lesson, kind, japanese, english, kana-reading-if-it-has-kanji]
         [1, 'word', 'がくせい', 'student'],
         [4, 'kanji', '月曜日', 'Monday', 'げつようび'],
         [3, 'sentence', 'まいにち コーヒーを のみます。', 'I drink coffee every day.']
       ];
     </script>
     <script src="../assets/flashcards.js"></script>

   kind is 'word', 'kanji' or 'sentence'. Romaji is generated from the kana,
   so it never has to be typed by hand (and cannot drift from the kana).
   ========================================================================= */

(function () {
  'use strict';

  var STORE = 'genki-reading-misses';
  var KINDS = { word: 'Word', kanji: 'Kanji', sentence: 'Sentence' };
  var AGAIN_GAP = 4;  // a missed card returns this many cards later

  /* --- Kana → romaji (Hepburn, long vowels spelled as written) ----------- */

  var BASE = {
    'あ':'a','い':'i','う':'u','え':'e','お':'o',
    'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
    'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
    'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
    'や':'ya','ゆ':'yu','よ':'yo',
    'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
    'わ':'wa','を':'o','ん':'n',
    'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
    'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
    'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
    'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
    'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o'
  };
  var SMALL_Y = { 'ゃ':'a', 'ゅ':'u', 'ょ':'o' };
  var ASCII = { 'Ｌ':'L', 'Ｔ':'T', '。':'.', '、':',', '？':'?', '！':'!', '　':' ' };

  function toHira(ch) {
    var c = ch.charCodeAt(0);
    // katakana block → hiragana (ヴ and the long mark are handled separately)
    return (c >= 0x30A1 && c <= 0x30F6) ? String.fromCharCode(c - 0x60) : ch;
  }

  function wordToRomaji(word) {
    var out = '';
    var chars = Array.prototype.map.call(word, toHira);
    for (var i = 0; i < chars.length; i++) {
      var ch = chars[i], next = chars[i + 1];

      if (ch === 'ー') {                       // long mark: repeat last vowel
        var m = out.match(/[aeiou]$/);
        if (m) out += m[0];
        continue;
      }
      if (ch === 'っ') {                        // small tsu: double next consonant
        var r = next ? (BASE[next] || '') : '';
        out += r.indexOf('ch') === 0 ? 't' : r.charAt(0);
        continue;
      }
      if (ch === 'ゔ') { out += 'vu'; continue; }

      var rom = BASE[ch];
      if (rom === undefined) { out += ASCII[ch] || ch; continue; }

      if (next && SMALL_Y[next]) {              // きゃ, しょ, じゅ …
        var stem = rom.slice(0, -1);
        out += (/^(sh|ch|j)$/.test(stem) ? stem : stem + 'y') + SMALL_Y[next];
        i++;
        continue;
      }
      if (next && (ch === 'ふ' || ch === 'て' || ch === 'で') && /[ぁぃぅぇぉ]/.test(next)) {
        out += rom.slice(0, -1) + BASE[next];   // ファ, ティ, ディ
        i++;
        continue;
      }
      if (ch === 'ん' && next && /^[aiueoy]/.test(BASE[next] || '')) {
        out += "n'";                            // たんい vs たにい
        continue;
      }
      out += rom;
    }
    return out;
  }

  // Sentences are written with spaces after each particle, Genki-style, so a
  // chunk that ends in は or へ is the topic/direction particle: wa, e.
  function romaji(kana) {
    return kana.split(/\s+/).map(function (chunk) {
      var r = wordToRomaji(chunk);
      if (/は[。、？]?$/.test(chunk) && chunk.length > 1) r = r.replace(/ha([.,?]?)$/, 'wa$1');
      if (/へ[。、？]?$/.test(chunk) && chunk.length > 1) r = r.replace(/he([.,?]?)$/, 'e$1');
      return r;
    }).join(' ');
  }

  /* --- Storage (a convenience only — the page works without it) ---------- */

  function loadMisses() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
  }
  function saveMisses(m) {
    try { localStorage.setItem(STORE, JSON.stringify(m)); } catch (e) { /* private mode */ }
  }

  /* --- Helpers ----------------------------------------------------------- */

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  // Restart a CSS animation class even if it is already applied.
  function play(node, cls) {
    node.classList.remove('fc-turn', 'fc-next');
    void node.offsetWidth;
    node.classList.add(cls);
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* --- The deck ---------------------------------------------------------- */

  function build(root, rows) {
    var cards = rows.map(function (r) {
      return { lesson: r[0], kind: r[1], jp: r[2], en: r[3], kana: r[4] || null };
    });

    var misses = loadMisses();
    var opts = { lessons: { 1: true, 2: true, 3: true, 4: true, 5: true },
                 kinds: { word: true, kanji: true, sentence: true },
                 size: 20, onlyMissed: false };
    var queue = [], done = 0, total = 0, firstTry = 0, missedThis = {}, current = null, flipped = false;

    /* Setup panel */
    var setup = el('div', 'fc-setup');
    root.appendChild(el('div', 'widget-head', '<span>Reading challenge</span><span class="fc-count"></span>'));
    root.appendChild(setup);

    function chipGroup(label, entries, state) {
      var g = el('div', 'fc-group');
      g.appendChild(el('span', 'fc-label', label));
      entries.forEach(function (e) {
        var b = el('button', 'fc-chip', e[1]);
        b.type = 'button';
        b.setAttribute('aria-pressed', state[e[0]] ? 'true' : 'false');
        b.addEventListener('click', function () {
          state[e[0]] = !state[e[0]];
          b.setAttribute('aria-pressed', state[e[0]] ? 'true' : 'false');
          refreshCount();
        });
        g.appendChild(b);
      });
      return g;
    }

    setup.appendChild(chipGroup('Lessons', [[1, 'L1'], [2, 'L2'], [3, 'L3'], [4, 'L4'], [5, 'L5']], opts.lessons));
    setup.appendChild(chipGroup('Cards', [['word', 'Words'], ['kanji', 'Kanji'], ['sentence', 'Sentences']], opts.kinds));

    var sizeGroup = el('div', 'fc-group');
    sizeGroup.appendChild(el('span', 'fc-label', 'Deck'));
    [[10, '10'], [20, '20'], [40, '40'], [0, 'All']].forEach(function (s) {
      var b = el('button', 'fc-chip', s[1]);
      b.type = 'button';
      b.setAttribute('aria-pressed', opts.size === s[0] ? 'true' : 'false');
      b.addEventListener('click', function () {
        opts.size = s[0];
        Array.prototype.forEach.call(sizeGroup.querySelectorAll('.fc-chip'), function (x) {
          x.setAttribute('aria-pressed', 'false');
        });
        b.setAttribute('aria-pressed', 'true');
      });
      sizeGroup.appendChild(b);
    });
    var missBtn = el('button', 'fc-chip', 'Only my misses');
    missBtn.type = 'button';
    missBtn.setAttribute('aria-pressed', 'false');
    missBtn.addEventListener('click', function () {
      opts.onlyMissed = !opts.onlyMissed;
      missBtn.setAttribute('aria-pressed', opts.onlyMissed ? 'true' : 'false');
      refreshCount();
    });
    sizeGroup.appendChild(missBtn);
    setup.appendChild(sizeGroup);

    var startBtn = el('button', 'primary fc-start', 'Start');
    startBtn.type = 'button';
    setup.appendChild(startBtn);

    /* Card stage */
    var stage = el('div', 'fc-stage');
    stage.hidden = true;
    root.appendChild(stage);

    var dots = el('div', 'fc-bar'); var barFill = el('i'); dots.appendChild(barFill);
    var card = el('div', 'fc-card');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Flip card');
    var inner = el('div', 'fc-inner');
    var front = el('div', 'fc-face fc-front');
    var back = el('div', 'fc-face fc-back');
    inner.appendChild(front); inner.appendChild(back); card.appendChild(inner);

    var hint = el('p', 'fc-hint', 'Read it aloud first. Then tap the card, or press <kbd>Space</kbd>.');
    var grade = el('div', 'fc-grade');
    var missed = el('button', 'fc-missed', 'Missed it <kbd>1</kbd>'); missed.type = 'button';
    var got = el('button', 'fc-got', 'Got it <kbd>2</kbd>'); got.type = 'button';
    grade.appendChild(missed); grade.appendChild(got);

    stage.appendChild(dots); stage.appendChild(card); stage.appendChild(hint); stage.appendChild(grade);

    var result = el('div', 'fc-result');
    result.hidden = true;
    root.appendChild(result);

    function pool() {
      return cards.filter(function (c) {
        return opts.lessons[c.lesson] && opts.kinds[c.kind] && (!opts.onlyMissed || misses[c.jp]);
      });
    }
    function refreshCount() {
      var n = pool().length;
      root.querySelector('.fc-count').textContent = n + (n === 1 ? ' card matches' : ' cards match');
      startBtn.disabled = n === 0;
    }

    function start(list) {
      queue = list.slice();
      total = queue.length; done = 0; firstTry = 0; missedThis = {};
      setup.hidden = true; result.hidden = true; stage.hidden = false;
      next();
      card.focus();
    }

    function next() {
      if (!queue.length) return finish();
      current = queue.shift();
      flipped = false;
      card.classList.remove('flipped');
      front.hidden = false;
      back.hidden = true;
      grade.classList.remove('show');
      hint.style.visibility = 'visible';

      var tag = '<span class="fc-tag">L' + current.lesson + ' · ' + KINDS[current.kind] + '</span>';
      front.innerHTML = tag + '<div class="fc-jp fc-' + current.kind + '">' + esc(current.jp) + '</div>';

      var reading = current.kana || current.jp;
      back.innerHTML = tag
        + '<div class="fc-jp-small">' + esc(current.jp) + '</div>'
        + (current.kana ? '<div class="fc-kana">' + esc(current.kana) + '</div>' : '')
        + '<div class="fc-romaji">' + esc(romaji(reading)) + '</div>'
        + '<div class="fc-en">' + esc(current.en) + '</div>';

      barFill.style.width = (100 * done / total) + '%';
      root.querySelector('.fc-count').textContent = (done + 1) + ' / ' + total;
      play(inner, 'fc-next');
    }

    function flip() {
      if (stage.hidden) return;
      flipped = !flipped;
      card.classList.toggle('flipped', flipped);
      front.hidden = flipped;
      back.hidden = !flipped;
      play(inner, 'fc-turn');
      if (flipped) { grade.classList.add('show'); hint.style.visibility = 'hidden'; }
    }

    function mark(ok) {
      if (!flipped || !current) return;
      if (ok) {
        if (!missedThis[current.jp]) { firstTry++; delete misses[current.jp]; }
        done++;
      } else {
        missedThis[current.jp] = current;
        misses[current.jp] = 1;
        queue.splice(Math.min(AGAIN_GAP, queue.length), 0, current);
      }
      saveMisses(misses);
      next();
      if (!stage.hidden) card.focus();  // so Space flips the new card, not the button
    }

    function finish() {
      stage.hidden = true; result.hidden = false;
      var missList = Object.keys(missedThis).map(function (k) { return missedThis[k]; });
      var pct = Math.round(100 * firstTry / total);
      root.querySelector('.fc-count').textContent = 'Done';
      result.innerHTML =
        '<p class="fc-score"><strong>' + firstTry + ' / ' + total + '</strong> read right on the first try (' + pct + '%).</p>'
        + (missList.length
          ? '<p>These took more than one go. They are saved, so <em>Only my misses</em> can bring them back next session:</p>'
            + '<ul class="fc-misslist">' + missList.map(function (c) {
                return '<li><span class="jp">' + esc(c.jp) + '</span> — ' + esc(c.en) + '</li>';
              }).join('') + '</ul>'
          : '<p>Clean run. Next session, add a lesson or switch to <em>All</em>.</p>');
      var row = el('div', 'fc-actions');
      if (missList.length) {
        var again = el('button', 'primary', 'Drill these ' + missList.length + ' again');
        again.type = 'button';
        again.addEventListener('click', function () { start(shuffle(missList.slice())); });
        row.appendChild(again);
      }
      var back2 = el('button', '', 'New deck');
      back2.type = 'button';
      back2.addEventListener('click', function () {
        result.hidden = true; setup.hidden = false; refreshCount();
      });
      row.appendChild(back2);
      result.appendChild(row);
    }

    startBtn.addEventListener('click', function () {
      var p = shuffle(pool());
      start(opts.size ? p.slice(0, opts.size) : p);
    });
    card.addEventListener('click', flip);
    missed.addEventListener('click', function () { mark(false); });
    got.addEventListener('click', function () { mark(true); });

    document.addEventListener('keydown', function (e) {
      if (stage.hidden || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (e.target.tagName === 'BUTTON' && e.target !== card) return;
        e.preventDefault(); flip();
      } else if (e.key === '1' || e.key === 'ArrowLeft') { mark(false); }
      else if (e.key === '2' || e.key === 'ArrowRight') { mark(true); }
    });

    refreshCount();
  }

  function init() {
    var roots = document.querySelectorAll('[data-flashcards]');
    for (var i = 0; i < roots.length; i++) build(roots[i], window.FLASHCARDS || []);
  }

  window.GenkiRomaji = romaji;  // exposed for testing

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
