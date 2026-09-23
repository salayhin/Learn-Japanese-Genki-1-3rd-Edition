/* ===========================================================================
   vocab.js — progressive enhancement for the vocabulary reference tables.

   The table is plain HTML and is fully readable without this file; all this
   adds is a retrieval mode. Press the button to hide every meaning, then tap
   a row to reveal just that one — so the list can be re-read as a lookup, or
   self-tested as a quiz, without being two different things on the page.

   Markup it expects:

     <div class="vocab-block">
       <table class="vocab" data-vocab>
         <tr class="grp"><td colspan="2">Group name</td></tr>
         <tr><td class="w">ことば</td><td class="m">meaning</td></tr>
       </table>
     </div>

   Usage: just include the script. It enhances every [data-vocab] on the page.
   ========================================================================= */

(function () {
  'use strict';

  var SHOW = 'Hide meanings &mdash; test yourself';
  var HIDE = 'Show all meanings';

  function enhance(table) {
    var block = table.closest ? table.closest('.vocab-block') : table.parentNode;
    if (!block) block = table.parentNode;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'vocab-btn';

    var hint = document.createElement('p');
    hint.className = 'vocab-hint';

    var hidden = false;

    function clearRevealed() {
      var rows = table.querySelectorAll('tr.revealed');
      for (var i = 0; i < rows.length; i++) rows[i].classList.remove('revealed');
    }

    function render() {
      table.classList.toggle('hide-en', hidden);
      btn.innerHTML = hidden ? HIDE : SHOW;
      hint.innerHTML = hidden
        ? 'Tap any row to reveal that one. Say the meaning <em>before</em> you tap &mdash; '
          + 'the guess is what builds the memory, not the answer.'
        : '';
      if (!hidden) clearRevealed();
    }

    btn.addEventListener('click', function () {
      hidden = !hidden;
      render();
    });

    table.addEventListener('click', function (e) {
      if (!hidden) return;
      var row = e.target;
      while (row && row.tagName !== 'TR') row = row.parentNode;
      if (!row || row.classList.contains('grp')) return;
      row.classList.toggle('revealed');
    });

    block.insertBefore(hint, table);
    block.insertBefore(btn, hint);
    render();
  }

  function init() {
    var tables = document.querySelectorAll('table[data-vocab]');
    for (var i = 0; i < tables.length; i++) enhance(tables[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
