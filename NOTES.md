# Working notes

## How this learner wants to be taught

*(Seeded from the 2026-09-23 intake. Correct anything I've got wrong.)*

- **Hard time boundary: 45–50 min, weekdays only. No weekend study at all.**
  Do not design anything that assumes "catch up on Saturday." The plan must
  survive contact with a 5-day week. Monday sessions are built retrieval-first
  because of the 2-day gap.
- Asked for a **plan** up front, not just a first lesson — wants to see the whole
  shape of the commitment before starting. Keep the roadmap current; it is the
  document they will check against.
- Goal set is practical, not academic: travel, then living/working in Japan, with
  JLPT N5/N4 as the certificate. Prefer real-world vocabulary (stations, menus,
  shops, forms) over textbook-world vocabulary wherever there's a choice.
- **Self-assessments drift — measure, don't trust.** The learner first put katakana at
  40–50%, then corrected it to under 10%: off by a factor of four, in the direction that
  costs most. The plan was later rewritten to assume zero prior Japanese, which makes the
  question moot, but the lesson stands for anything else they self-report.

## Session log

*No calendar dates — the plan is written in weeks and weekdays so it starts whenever
the learner starts, and so it can be handed to anyone.*

| Week | Day | Covered | Evidence / notes |
|---|---|---------|------------------|
| 1 | 1 | Hiragana Part 1 — vowels + か row, and the grid idea | |
| 1 | 2 | Hiragana Part 2 — さ/た rows, irregulars し ち つ | |
| 1 | 3 | Hiragana Part 3 — な/は rows, irregular ふ | |
| 1 | 4 | Hiragana Part 4 — ま や ら わ ん (16 chars) | |
| 1 | 5 | Hiragana Part 5 — consolidation + look-alikes | **Get the miss-list.** Below ~80% = repeat this day at the start of week 2. |
| 2 | 1 | Katakana Part 1 — the 20 reachable from hiragana | Ask which resemblances felt faint; those move to Part 2. |
| 2 | 2 | Katakana Part 2 — the families (22 chars) | Heaviest session in the plan. |
| 2 | 3 | Katakana Part 3 — consolidation, all 42 | **Get this drill score.** Below ~80% = repeat rather than push on. |
| 2 | 4 | Katakana Part 4 — the four traps シ/ツ/ン/ソ | Placed after acquisition, deliberately. |
| 2 | 5 | Katakana in whole words | Decode rules, abbreviations, 和製英語. **Sort their decode misses**: decoding failure = shaky character (repair), recognition failure = vocabulary (ignore). |
| 3 | 1 | Marks Part 1 — voicing marks | |
| 3 | 2 | Marks Part 2 — beats | |
| 3 | 3 | Kana gate | **Get all five test results, not just failures — the pattern is the diagnostic.** Standard is 100% on tests 1–3; speed is explicitly not the gate. |
| 3 | 4 | Genki Lesson 1 begins | Ask for their self-introduction typed out — the week-one errors are structural (さん on self, reversed の) and invisible from the inside. |
| 4 | 4 | Genki Lesson 2 begins | Ask for the shopping roleplay, both sides. Watch も beside は, この for これ, bare じゃないです, and よ where ね belongs. |
| 7 | 2 | Genki Lesson 4 begins | **The particle flip is the error to hunt**: で where に belongs in an あります sentence, は where が belongs. Both feel right from the inside because Lesson 3 taught them. Also check も is stacking (にも/でも) vs replacing (は/が/を). |
| 8 | 4 | Genki Lesson 5 begins | **Hunt the class errors, in both directions**: `×さむいでした` (tense put on です) and `×げんきかったです` (い-rule on a な-adjective). Both mean the class didn't stick, and neither feels wrong from the inside. Also check 好き sentences for を where が belongs — that one survives for months unless someone points at it. **Get all six reading times (L3, L4, L5 × passes 4 and 5) at this point** — they are the only evidence the plan produced what it promised, and the assessment is the last chance to collect them. |
| 9 | 5 | Assessment | **Get the whole scoresheet, not the failures** — the pattern is the diagnostic and it's the thing hardest to self-read. Three results look identical from the inside and mean different months: fast kana + weak kanji, weak verbs + strong adjectives, clean drills + poor grammar. **Weight the old tests, discount the new ones**: a good Lesson 5 score is 4 days old and measures fluency strength only. Also collect the six reading times + today's cold-read number — last chance, they can't be reconstructed. |
| 5 | 5 | Genki Lesson 3 begins | **Hardest block — 7 days.** Get the daily-routine paragraph (で/に confusion and に stuck on まいにち are the classic errors) **and both 5-pass reading times — they are the baseline every later lesson is measured against and cannot be reconstructed later.** Also: kana speed should hit target around here; if so, drop the warm-up drill to 3 min and give the time to verb conjugation. |

## Naming convention — do not break this

**Every page is keyed by week first**, so the folder sorts in study order and a browser tab
tells you where you are:

- **Phase 0** — `week-NN-topic.html`
- **Phase 1** — `week-NN-lesson-NN-topic.html`, where the week is the one the lesson
  *starts* in (Lesson 1 begins week 3 day 4, so `week-03-lesson-01-new-friends.html`)

`<title>` carries the same key: *Week 2 day 5 · Katakana in Whole Words*,
*Week 3–4 · Lesson 1 — New Friends*. Keep titles and filenames in step.

Three rules:

1. **Never number our own lessons.** The earlier `0001/0002/0003` scheme collided head-on
   with Genki's own lesson numbers — and was inverted against them, since our "Lesson 0001"
   was katakana while Genki 読み書き Lesson 1 is *hiragana*. In this workspace,
   **"Lesson N" always means Genki's lesson.**
2. **Never use weekday names or dates.** Day 1–5, Week 1–9. Keeps the path portable and
   startable on any day.
3. **Roadmap anchors are stable ids**: `#genki-1` … `#genki-5`, `#assessment`. Link to
   those, not to positional anchors. (An earlier `#part1` link pointed at an anchor that
   only existed in a deleted file.)

## Copyright line for Phase 1 lessons

Genki lesson pages teach the **grammar in my own words with my own examples** and cite page
numbers. They do **not** reproduce the book's vocabulary lists, dialogues or exercise text —
the page tells the learner which pages to open and what to do with them. Keep that line.

**The two katakana lessons were consolidated** at the learner's request into what is now
`lessons/week-02-katakana.html` — all 46 in four parts across week 2, which also filled the
gap where two days had no page.

**Roadmap rewritten as a generic beginner path.** At the learner's request it now assumes
**zero prior Japanese** and uses weeks and weekday names instead of dates, so any student can
follow it. Consequences: L0002 was rebuilt to teach all 46 hiragana from scratch (it
previously assumed ~80% known and opened with a gap-finding diagnostic), Phase 0 grew to 13
sessions, and committed scope became **Lessons 1–5** rather than 1–6 — Lesson 6 and the
て-form moved to the continuation map. See
[learning-records/0003-generic-beginner-path.md](learning-records/0003-generic-beginner-path.md).

## Files and the copyright rule

**The published pages must contain no PDF links and no PDF page numbers.** The learner is
not distributing the books. Cite only the page numbers **printed in the book**, which work
in any copy — print or official ebook. Workbook citations are marked "workbook"; everything
else is the textbook. Audio is pointed at OTO Navi (the publisher's free app), never at a file.

**No `.pdf` link of any kind**, including free third-party ones. Tofugu's kana book and
the Gorsuch paper were both re-pointed at HTML pages (the guide page, the ERIC record).
The archive.org Tadoku mirror was dropped in favour of tadoku.org's own free-books page.

*Private, for looking things up in the learner's own local copies only — never put these in
a page:* textbook PDF page = book page + 8 (verified, PDF 44 = book 36); workbook PDF page =
book page + 4 (verified). The full-resolution textbook exceeds 100 MB and cannot be opened
at all; the compressed copy can.

Bash is intermittently blocked by a failing RTK hook integrity check
(`~/.claude/hooks/rtk-rewrite.sh`); `ls` is blocked, `grep`/`sed`/`python3` pass through.
Fix: `rtk init -g --auto-patch`. **Do not use `perl -0pi` with non-ASCII replacements** — it
double-encoded every file once already. Use `python3` with explicit UTF-8.

**Phase 0 was re-cut** after the katakana correction: hiragana moved to week 1, and the
four-traps material moved from the *start* of katakana to its *end* (discrimination is not
acquisition — it was mis-sequenced). Superseded again by the zero-experience rewrite, which
grew Phase 0 to 13 sessions. Lessons 1–5 committed, Lesson 6 a stretch. Reasoning in
[learning-records/0002-katakana-is-from-scratch.md](learning-records/0002-katakana-is-from-scratch.md).

**The nine-week path is complete** — all of Phase 0 (weeks 1–3), Genki Lessons 1–5, and the
week-9 assessment. Nothing outstanding. The next thing to build, if the learner carries on,
is Genki Lesson 6 and the て-form; the assessment page's "month three" section is written as
the brief for it.

**The assessment reuses the week-3 gate's kana sets byte-for-byte** (HIRA/KATA/EXTRA/ALT are
copied, not re-typed) so the two sets of times are genuinely comparable. If either page's
character sets are ever edited, edit both — the whole diagnostic depends on them matching,
and a silent divergence would be invisible to the learner. Targets deliberately differ:
55/60/40 at the gate, 50/55/35 at the assessment, because speed was explicitly *not* the
week-3 standard and *is* the week-9 one.

## Open questions for the learner

- **Is a trip to Japan actually booked, and when?** A date would change the
  ordering — Lesson 10's Useful Expressions 駅で ("At the Station", book p.252)
  and Lesson 2's shopping vocabulary would be worth pulling forward out of
  sequence if there's a deadline.
- **Is JLPT N5 booked or hypothetical?** The exam runs in July and December.
  A December sitting is too soon after this plan ends; July 2027 would fit well
  and would change how much test-format reading practice to fold in.
- **Any interest in communities?** (r/LearnJapanese, WaniKani forums.) Not yet
  asked. If the answer is no, record it in RESOURCES.md and stop proposing them.
- Confirm OTO Navi installed — several later sessions are blocked without it.

## Teaching reminders

- Quizzes in this workspace use **equal-length options** so formatting can't leak
  the answer. For kana this is done by making the options the glyphs themselves
  (always one character) and putting the romaji in the prompt. Keep that pattern.
- `quiz.js` = accuracy, `drill.js` = speed. Don't conflate them; they're separate
  skills with separate feedback loops.
- Bash is currently blocked in this workspace by a failing RTK hook integrity
  check (`~/.claude/hooks/rtk-rewrite.sh`), so lessons can't be auto-opened from
  the CLI. File tools work fine. Fix: `rtk init -g --auto-patch`.
