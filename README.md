# Learn Japanese — Genki I (3rd edition)

A complete nine-week study path for **Genki I**, built for 45–50 minutes a day on weekdays
only. Interactive lesson pages with retrieval quizzes and timed drills, a roadmap, and kana
reference charts.

**[Open the course →](index.html)** *(clone and open `index.html` in a browser)*

## The books are not in this repository

This repo contains **teaching materials, not the textbook**. Genki I is a copyrighted
commercial work published by The Japan Times, and no part of the book — no scans, no
vocabulary lists, no dialogues, no exercise text — is reproduced here.

Every page cites **printed book page numbers**, so the material works with any legally
obtained copy, print or ebook. You need:

| | ISBN |
|---|---|
| Genki I Textbook, 3rd edition | 978-4-7890-1730-5 |
| Genki I Workbook, 3rd edition | 978-4-7890-1731-2 |

Audio is free from **OTO Navi**, the publisher's own app (iOS / Android).

## What's here

```
index.html                  Course home — start here
reference/                  The nine-week roadmap, kana charts, look-alike guide
lessons/                    Twelve lesson pages, keyed by week
assets/                     Shared stylesheet, quiz widget, timed-drill widget
learning-records/           Design decisions and why they were made
MISSION.md  RESOURCES.md  NOTES.md
```

## The path

Nine weeks, 45 weekday sessions, roughly 37 hours.

| Weeks | | |
|---|---|---|
| 1–3 | **Phase 0** — the writing system | Hiragana, katakana, voicing marks, beats, and a gate you have to pass before Genki starts |
| 3–9 | **Phase 1** — Genki Lessons 1–5 | Greetings through adjectives, 43 kanji, three timed readings |
| 9 | **Assessment** | Six tests, no new material, ordered oldest-first |

It does **not** cover all twelve lessons, and the roadmap says so on its first screen. Any
plan claiming to finish Genki I in two months at this pace is not being honest with you.
Lesson 6 — the て-form, the highest-leverage thing in elementary Japanese — is mapped out as
the start of month three.

## How the lessons work

Each page teaches the grammar in its own words with its own examples, tells you which book
pages to open, and then makes you retrieve it:

- **`quiz.js`** — multiple choice, for *accuracy*. Options are length-matched so formatting
  can't leak the answer; missed items requeue.
- **`drill.js`** — free-typed and timed, for *automaticity*. Reports time per item and offers
  to re-run only your misses.

Those are separate skills with separate feedback loops, and the pages never conflate them.

The reading protocol is five passes over a single passage with audio, following Gorsuch,
Taguchi & Umehara (2015) — re-reading one passage five times beats reading five passages
once, and the gains transfer to passages you've never seen.

## Licence

The materials in this repository are shared for personal study. Genki I and all rights in it
belong to The Japan Times.
