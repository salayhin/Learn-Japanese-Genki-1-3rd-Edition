/* ==========================================================================
   drill.js — timed recognition drill for building READING SPEED.

   Why this exists separately from quiz.js:
   Quiz = accuracy (do you know it?). Drill = automaticity (can you retrieve it
   without deliberating?). Reading fluency is an automaticity problem. The
   research line behind this is repeated/timed reading: accuracy first, then
   speed on already-accurate material.
     - Gorsuch, Taguchi & Umehara (2015), Reading Matrix
       https://www.readingmatrix.com/files/13-l624by2v.pdf

   Free-typed answers, not multiple choice: choosing from four options lets you
   work backwards from the options. Typing forces true recall.

   Usage:
     Drill.mount('#el', {
       title: 'Katakana speed',
       items: [ { show: 'シ', answer: ['shi'] }, ... ],
       target: 60          // seconds you are aiming to beat (optional)
     });
   ========================================================================== */

(function (global) {
  'use strict';

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function norm(s) { return String(s).trim().toLowerCase().replace(/[^a-z]/g, ''); }

  function Drill(root, o) {
    this.root = root;
    this.items = o.items;
    this.title = o.title || 'Timed drill';
    this.target = o.target || null;
    this.build();
  }

  Drill.prototype.build = function () {
    var self = this;
    this.root.className = 'widget';
    this.root.innerHTML = '';

    var head = el('div', 'widget-head');
    head.appendChild(el('span', null, this.title));
    this.clock = el('span', 'drill-clock', '—');
    head.appendChild(this.clock);
    this.root.appendChild(head);

    this.body = el('div');
    this.root.appendChild(this.body);

    this.body.appendChild(el('p', null,
      'Type the romaji and press <strong>Enter</strong>. ' + this.items.length +
      ' items, no going back.' +
      (this.target ? ' Target: under <strong>' + this.target + ' seconds</strong>.' : '')));

    var b = el('button', 'primary', 'Start drill');
    b.addEventListener('click', function () { self.start(); });
    this.body.appendChild(b);
  };

  Drill.prototype.start = function () {
    var self = this;
    this.queue = shuffle(this.items);
    this.pos = 0;
    this.misses = [];
    this.t0 = Date.now();

    this.body.innerHTML = '';
    this.stage = el('div', 'drill-stage');
    this.glyph = el('span', 'kana-big');
    this.stage.appendChild(this.glyph);
    this.body.appendChild(this.stage);

    this.input = document.createElement('input');
    this.input.className = 'drill-input';
    this.input.type = 'text';
    this.input.autocapitalize = 'off';
    this.input.autocomplete = 'off';
    this.input.spellcheck = false;
    this.stage.appendChild(this.input);

    this.flash = el('div', 'score-line');
    this.flash.style.minHeight = '1.4rem';
    this.flash.style.marginTop = '.6rem';
    this.stage.appendChild(this.flash);

    this.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') self.submit();
    });

    this.tick = setInterval(function () {
      self.clock.textContent = ((Date.now() - self.t0) / 1000).toFixed(1) + 's';
    }, 100);

    this.show();
    this.input.focus();
  };

  Drill.prototype.show = function () {
    this.glyph.textContent = this.queue[this.pos].show;
    this.input.value = '';
  };

  Drill.prototype.submit = function () {
    var item = this.queue[this.pos];
    var given = norm(this.input.value);
    if (!given) return;

    var accepted = (Array.isArray(item.answer) ? item.answer : [item.answer]).map(norm);
    var ok = accepted.indexOf(given) !== -1;

    if (ok) {
      this.flash.textContent = '';
    } else {
      this.misses.push(item);
      this.flash.innerHTML = '<span style="color:var(--bad)">' + item.show +
        ' = ' + accepted[0] + '</span>';
    }

    this.pos++;
    if (this.pos >= this.queue.length) return this.finish();
    this.show();
  };

  Drill.prototype.finish = function () {
    var self = this;
    clearInterval(this.tick);
    var secs = (Date.now() - this.t0) / 1000;
    var per = secs / this.queue.length;
    var hits = this.queue.length - this.misses.length;

    this.body.innerHTML = '';
    this.body.appendChild(el('p', null,
      '<strong>' + hits + ' / ' + this.queue.length + '</strong> correct in <strong>' +
      secs.toFixed(1) + 's</strong> — ' + per.toFixed(2) + 's per character.'));

    var verdict;
    if (this.misses.length > 0) {
      verdict = 'Accuracy comes before speed. Fix the misses below, then re-run before chasing the clock.';
    } else if (per <= 1.0) {
      verdict = 'Under 1 second per character with no errors — that is recognition, not decoding. This is the fluency threshold.';
    } else if (per <= 2.0) {
      verdict = 'Accurate but still decoding. Re-run daily; the target is under 1.0s per character.';
    } else {
      verdict = 'Accurate but slow. That is fine today — speed is the last thing to arrive. Re-run tomorrow.';
    }
    this.body.appendChild(el('p', 'score-line', verdict));

    if (this.misses.length) {
      var list = this.misses.map(function (m) {
        var a = Array.isArray(m.answer) ? m.answer[0] : m.answer;
        return '<span class="jp" style="font-size:1.5em">' + m.show + '</span> ' + a;
      }).join(' &nbsp;·&nbsp; ');
      var box = el('div', 'rule-box', '<strong>Missed:</strong><br>' + list);
      this.body.appendChild(box);
    }

    var again = el('button', 'primary', 'Run again');
    again.addEventListener('click', function () { self.start(); });
    this.body.appendChild(again);

    if (this.misses.length) {
      var only = el('button', null, 'Drill only the misses');
      only.style.marginLeft = '.5rem';
      only.addEventListener('click', function () {
        self.queue = shuffle(self.misses);
        self.items = self.misses;
        self.start();
      });
      this.body.appendChild(only);
    }
  };

  global.Drill = {
    mount: function (sel, o) {
      var node = typeof sel === 'string' ? document.querySelector(sel) : sel;
      if (!node) return null;
      return new Drill(node, o);
    }
  };
})(window);
