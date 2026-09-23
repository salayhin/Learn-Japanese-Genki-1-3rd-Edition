# 0004 — The assessment is ordered by age of material, not by topic

## Context

The week-9 assessment closes the nine-week path. The obvious design is a test per lesson, or
a test per skill, scored out of a total. Both are wrong for this purpose.

The session has no gate behind it — there is no Lesson 6 in this plan to unlock — so a
pass/fail total would be decoration. Its only real output is **the syllabus for month three**,
which means every number on the page has to be actionable or it shouldn't be there.

## Decision

Six tests, run **oldest material first, newest last**, with the age of each block printed on
its card:

| Test | Material | Age at test time |
|---|---|---|
| 1 | Kana, the week-3 gate's three drills | ~6 weeks |
| 2 | 43 kanji, Lessons 3–5 | ~4 to 1 weeks |
| 3 | 20 verbs, past and past negative | ~4 weeks |
| 4 | 16 adjectives, both classes | 4 days |
| 5 | 13 grammar questions | all nine weeks |
| 6 | Cold single-pass read of the Lesson 3 passage | ~3 weeks since last read |

The page states outright that **a high score on test 4 predicts almost nothing**, and that the
informative numbers are at the top.

## Why

Fluency strength and storage strength diverge, and the gap is widest exactly where a learner
is most likely to be fooled. Lesson 5 finished four days before the assessment. It will feel
fluent and score well, and neither fact is evidence of retention. Lesson 3's verbs, four weeks
cold, are the opposite: a clean score there is real.

If the tests were ordered by topic or scored as one total, those two numbers would be averaged
together and the signal would be destroyed. Ordering by age, labelling the age, and telling the
learner how to weight the result turns the scoresheet from a grade into a diagnostic.

This also fixes the single most likely misreading of the results — *"verbs are harder than
adjectives for me"* — which is a conclusion about difficulty drawn from what is actually a
fact about elapsed time.

## Consequences

- **Speed became the standard, and this is stated as a reversal.** At the
  [week-3 gate](../lessons/week-03-kana-gate.html) the standard was accuracy and explicitly
  *not* speed. At week 9 accuracy is assumed and time is the measurement, because decoding
  competes with comprehension for working memory. The page argues this rather than asserting it.
- **The kana drills are byte-identical to the gate's** (`HIRA`/`KATA`/`EXTRA`/`ALT` copied,
  verified by diff) so the two sets of times compare directly. Only the targets tightened:
  55/60/40 → 50/55/35. If either page's sets are ever edited, both must be — see
  [NOTES.md](../NOTES.md).
- **The kanji test allows four misses; nothing else allows any.** 43 characters over seven
  weeks is a thin diet and gaps there are the expected result, not a failure. The remedy is a
  month-three habit, not a repeated day.
- **Test 6 is given no target time, deliberately.** A cold first pass has no matched precedent
  — the week-7 pass-4 and pass-5 times came after three prior readings with audio. Inventing a
  comparison would have been worse than admitting there isn't one. What the number *can* do is
  show whether the repeated-reading gain survived three weeks, which is the transfer effect the
  [Gorsuch, Taguchi and Umehara study](../reference/genki1-roadmap.html#n1) actually measured.
- **Every verdict branch ends in a specific action**, and none of them is a failure. Six
  branches, each naming what changes in month three.

Related: [[0001-two-month-scope-reality-check]], [[0003-generic-beginner-path]].
