# Learn Japanese — Genki I (3rd edition)

A nine-week study path for **Genki I**, designed around a real constraint: **45–50 minutes a
day, weekdays only, nothing at the weekend.** Eleven interactive lesson pages with retrieval
quizzes and timed drills, a week-by-week roadmap, and complete kana reference charts.

Written for someone starting from **zero Japanese** — no prior kana, no prior grammar.

---

## What nine weeks actually buys

**Genki I has twelve lessons. This covers five of them, and that is the honest number.**

45 sessions × ~50 minutes is about 37 hours. Three of the nine weeks go to the writing
system, because you cannot read a textbook written in kana until you can read kana. That
leaves six weeks for grammar, which is five lessons at a pace you'll retain.

Any plan promising all twelve lessons in two months is quietly assuming you'll skip the
retention work. This one doesn't, and the roadmap says so on its first screen. Lesson 6 —
the て-form, the highest-leverage thing in elementary Japanese — is mapped out as the opening
of month three.

---

## The books are not in this repository

This repo contains **teaching materials, not the textbook.** Genki I is a copyrighted
commercial work published by The Japan Times, and nothing from it is reproduced here — no
scans, no vocabulary lists, no dialogues, no exercise text.

Every page teaches the grammar in its own words with its own examples and cites **printed
book page numbers**, so the material works with any legally obtained copy, print or ebook.

| You need | ISBN |
|---|---|
| Genki I Textbook, 3rd edition | 978-4-7890-1730-5 |
| Genki I Workbook, 3rd edition | 978-4-7890-1731-2 |

Audio is free from [**OTO Navi**](https://apps.apple.com/us/app/oto-navi-sound-navigator/id1490391845),
the publisher's own app. Several sessions depend on it — install it before week 1.

The publisher's official site, [**GENKI 3rd Edition**](https://genki3.japantimes.co.jp/en/),
has a free [Self-study Room](https://genki3.japantimes.co.jp/en/student/): dialogue and
sentence-pattern videos, the official vocabulary apps, and online drills.

---

## Getting started

The lessons are self-contained HTML with no build step and no dependencies.

```bash
git clone git@github.com:salayhin/Learn-Japanese-Genki-1-3rd-Edition.git
cd Learn-Japanese-Genki-1-3rd-Edition
open index.html          # macOS   (Linux: xdg-open · Windows: start)
```

> **The quizzes and drills need a browser to run.** Clicking a `.html` link below on
> GitHub shows you its source, not the lesson. Clone the repo, or enable GitHub Pages on it
> for a browsable version.

Then read [**the roadmap**](reference/genki1-roadmap.html) — particularly the box about
scope — and open [week 1, day 1](lessons/week-01-hiragana.html).

---

## The path

### Phase 0 · The writing system — weeks 1–3, 13 sessions

| Week | Sessions | Page |
|---|---|---|
| 1 | 5 | [Hiragana, end to end](lessons/week-01-hiragana.html) — all 46, as a grid rather than an alphabet |
| 2 | 4 | [Katakana, end to end](lessons/week-02-katakana.html) — 20 derivable from hiragana, 22 in families, 6 memorised |
| 2 | 1 | [Katakana in whole words](lessons/week-02-katakana-in-words.html) — most of them are English in disguise |
| 3 | 2 | [Marks and beats](lessons/week-03-marks-and-beats.html) — voicing, and why Japanese is beat-timed |
| 3 | 1 | [**The kana gate**](lessons/week-03-kana-gate.html) — five tests. 100% accuracy required; speed explicitly not the standard |

### Phase 1 · Genki Lessons 1–5 — weeks 3–9, 31 sessions

| Week | Lesson | Pages |
|---|---|---|
| 3–4 | [1 · New Friends](lessons/week-03-lesson-01-new-friends.html) | `X は Y です`, question `か`, `の` |
| 4–5 | [2 · Shopping](lessons/week-04-lesson-02-shopping.html) | こそあど, counting in ten-thousands, `じゃないです` |
| 5–7 | [3 · Making a Date](lessons/week-05-lesson-03-making-a-date.html) | verb groups, `ます`, particles を・で・に・へ · **first 15 kanji** |
| 7–8 | [4 · The First Date](lessons/week-07-lesson-04-first-date.html) | `あります/います` and the particle flip, past tense · **days of the week** |
| 8–9 | [5 · A Trip to Okinawa](lessons/week-08-lesson-05-okinawa.html) | adjectives both tenses, `好き/きらい`, `〜ましょう`, counting |

### Week 9 · [Assessment](lessons/week-09-assessment.html)

Six tests, no new material, run **oldest material first**. A score on four-day-old material
measures fluency strength and predicts little; a score on four-week-old material measures
storage strength and predicts everything. The page says so, and tells you how to weight your
own scoresheet accordingly.

### Reference

- [**The full nine-week roadmap**](reference/genki1-roadmap.html) — session template, milestones, what to cut when you fall behind
- [Complete kana charts](reference/kana-charts.html) — 104 readings per script, printable
- [Kana look-alikes](reference/kana-confusables.html) — the シ/ツ/ン/ソ grid and everything else that catches people

---

## How the lessons work

Each page tells you which book pages to open, teaches the ideas that page won't, and then
makes you **retrieve** them. Two widgets do that, and they are deliberately not the same tool:

| | Measures | Format |
|---|---|---|
| [`quiz.js`](assets/quiz.js) | **Accuracy** | Multiple choice, immediate feedback, missed items requeue |
| [`drill.js`](assets/drill.js) | **Automaticity** | Free-typed and timed, reports time per item, re-runs only your misses |

Every option within a question is length-matched, so formatting can never leak the answer —
for kana that means the options are single glyphs with the romaji in the prompt.

**The reading protocol** is five passes over one passage with audio, on the last day of each
lesson block. That's from
[Gorsuch, Taguchi & Umehara (2015)](https://eric.ed.gov/?id=EJ1075950), who found that
re-reading the same passage with an audio model improved both speed and comprehension — and
that the gains **transferred to passages the learners had never seen.** Re-reading one
passage five times beats reading five passages once.

---

## Why it's built this way

Non-obvious design decisions are written down as short records, closer to ADRs than notes:

1. [Why the plan doesn't cover all twelve lessons](learning-records/0001-two-month-scope-reality-check.md)
2. [Why katakana is a script to learn, not a gap to patch](learning-records/0002-katakana-is-from-scratch.md)
3. [Why the plan is generic, dateless, and starts from zero](learning-records/0003-generic-beginner-path.md)
4. [Why the assessment is ordered by age of material](learning-records/0004-assessment-measures-storage-not-fluency.md)

Two conventions worth knowing if you read the source:

- **"Lesson N" always means Genki's lesson**, never an internal one. Our pages are numbered
  by week instead — `week-08-lesson-05-okinawa.html` — so the folder sorts in study order.
- **No dates, no weekday names.** Weeks and day numbers only, so the path starts whenever you
  start it.

---

## Layout

```
index.html              Course home — the nine weeks, linked
reference/              Roadmap, kana charts, look-alike guide
lessons/                Eleven lesson pages, keyed by week
assets/                 course.css · quiz.js · drill.js
learning-records/       Design decisions and the reasoning behind them
MISSION.md              Why this is being learned and what success looks like
RESOURCES.md            Vetted external sources, and the gaps where none exist
NOTES.md                Working notes, session log, naming conventions
```

---

## Licence

These materials are shared for personal study. **Genki I and all rights in it belong to
The Japan Times** — buy the books.
