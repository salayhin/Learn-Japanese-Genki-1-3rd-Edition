/* ==========================================================================
   quiz.js — reusable retrieval-practice widget.

   Design notes (why it works this way):
   - Retrieval, not recognition-by-elimination: questions are shuffled, and so
     are options, every run. Re-running is a NEW test, not a replay.
   - Immediate feedback, because the feedback loop should be as tight as
     possible. Wrong answers show WHY, then stay in the pool.
   - Missed items are re-queued at the end (a crude Leitner box), so the
     session does not end until every item has been recalled correctly once.

   Usage:
     Quiz.mount('#el', {
       questions: [
         { prompt: 'HTML string', answer: 'shi', options: ['shi','tsu','so','n'],
           explain: 'HTML string shown after answering' }
       ]
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

  function Quiz(root, opts) {
    this.root = root;
    this.all = opts.questions;
    this.title = opts.title || 'Retrieval practice';
    this.total = opts.questions.length;
    this.reset();
    this.render();
  }

  // Called on first build and on every "run again", so a re-run is a genuinely
  // fresh test rather than a replay of the same order.
  Quiz.prototype.reset = function () {
    this.all.forEach(function (q) { q.__seen = false; });
    this.pool = shuffle(this.all);
    this.firstTryHits = 0;
    this.answeredFirstTry = {};
  };

  Quiz.prototype.render = function () {
    this.root.innerHTML = '';
    this.root.className = 'widget';

    var head = el('div', 'widget-head');
    head.appendChild(el('span', null, this.title));
    this.dots = el('div', 'progress-dots');
    head.appendChild(this.dots);
    this.root.appendChild(head);

    this.body = el('div');
    this.root.appendChild(this.body);

    this.drawDots();
    this.next();
  };

  Quiz.prototype.drawDots = function () {
    this.dots.innerHTML = '';
    for (var i = 0; i < this.total; i++) {
      var d = el('i');
      var st = this.answeredFirstTry[i];
      if (st === true) d.className = 'hit';
      else if (st === false) d.className = 'miss';
      this.dots.appendChild(d);
    }
  };

  Quiz.prototype.next = function () {
    if (this.pool.length === 0) return this.finish();

    var q = this.pool[0];
    var self = this;
    this.body.innerHTML = '';

    this.body.appendChild(el('div', 'q-prompt', q.prompt));

    var opts = el('div', 'opts');
    shuffle(q.options).forEach(function (opt) {
      var b = el('button', null, opt);
      b.addEventListener('click', function () { self.answer(q, opt, opts, b); });
      opts.appendChild(b);
    });
    this.body.appendChild(opts);
  };

  Quiz.prototype.answer = function (q, chosen, optsEl, btn) {
    var self = this;
    var ok = chosen === q.answer;
    var qi = q.__i != null ? q.__i : (q.__i = this.total - this.pool.length);

    Array.prototype.forEach.call(optsEl.children, function (b) {
      b.disabled = true;
      if (b.textContent === q.answer) b.className = 'correct';
    });
    if (!ok) btn.className = 'wrong';

    if (q.__seen !== true) {
      q.__seen = true;
      this.answeredFirstTry[qi] = ok;
      if (ok) this.firstTryHits++;
    }
    this.drawDots();

    var fb = el('div', 'feedback ' + (ok ? 'ok' : 'no'));
    fb.innerHTML = (ok ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> ')
                 + (q.explain || '');
    this.body.appendChild(fb);

    // Missed items go to the back of the queue; correct ones leave the pool.
    this.pool.shift();
    if (!ok) this.pool.push(q);

    var nav = el('div');
    nav.style.marginTop = '1rem';
    var b = el('button', 'primary', this.pool.length ? 'Next →' : 'See result');
    b.addEventListener('click', function () { self.next(); });
    nav.appendChild(b);
    this.body.appendChild(nav);
    b.focus();
  };

  Quiz.prototype.finish = function () {
    var self = this;
    var pct = Math.round((this.firstTryHits / this.total) * 100);
    var verdict = pct === 100
      ? 'Clean sweep. This is ready to be spaced — come back to it in 2 days, not today.'
      : pct >= 70
        ? 'Solid. Re-run this tomorrow; the items you missed are the ones that need the spacing.'
        : 'Below 70% on first attempt. Re-read the section above, then re-run — this is the desirable difficulty doing its job, not a failure.';

    this.body.innerHTML = '';
    this.body.appendChild(el('p', null,
      '<strong>' + this.firstTryHits + ' / ' + this.total + '</strong> correct on first attempt (' + pct + '%).'));
    this.body.appendChild(el('p', 'score-line', verdict));

    var b = el('button', null, 'Run again (reshuffled)');
    b.addEventListener('click', function () {
      self.reset();
      self.drawDots();
      self.next();
    });
    this.body.appendChild(b);
  };

  global.Quiz = {
    mount: function (sel, opts) {
      var node = typeof sel === 'string' ? document.querySelector(sel) : sel;
      if (!node) return null;
      opts.questions.forEach(function (q, i) { q.__i = i; q.__seen = false; });
      return new Quiz(node, opts);
    }
  };
})(window);
