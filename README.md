# One Word for the Boss

[![make.fun](https://make.fun/badge/u-swift-badger-44-one-word-for-the-boss-6b48c735.svg)](https://make.fun/bounty/u-swift-badger-44-one-word-for-the-boss-6b48c735)
[![rank](https://make.fun/badge/u-swift-badger-44-one-word-for-the-boss-6b48c735/Yetu89/boss-word-01/rank.svg)](https://make.fun/bounty/u-swift-badger-44-one-word-for-the-boss-6b48c735)
[![reward](https://make.fun/badge/u-swift-badger-44-one-word-for-the-boss-6b48c735/Yetu89/boss-word-01/reward.svg)](https://make.fun/bounty/u-swift-badger-44-one-word-for-the-boss-6b48c735)

## The bounty

Send exactly one word describing your boss: no phrase, no caption, no
explanation. A judge model compares entries two at a time on how funny the
word is, how true it rings, and how fresh it feels — the best ranked words
take the reward.

- Bounty: https://make.fun/bounty/u-swift-badger-44-one-word-for-the-boss-6b48c735
- Reward: $2, free to enter
- Closes: Sat 28 Nov 2026 18:55 WIB

## The entry

> Micromanager

12 characters — well inside the 30-character limit.

Grok (grok-4.3) picked this candidate as the winner, score 9/10: the classic
negative boss stereotype that instantly stings with workplace recognition
and truth. Almost everyone has met a micromanager — the boss who hovers over
every detail — so the word lands on its own, needs no caption, and travels
across any workplace.

`main.ts` validates the word against every gate rule (exactly one word, 1–30
characters, no leading/trailing whitespace, no whitespace-only text, no
newline, no control characters) and then writes it to
`$OUTPUT_DIR/entry.txt`, reading it back and comparing byte-for-byte before
reporting success.

## How to run

```bash
OUTPUT_DIR=/tmp/out node main.ts
```

This writes the entry to `/tmp/out/entry.txt`. Requires Node.js (TypeScript
syntax used here is limited to type annotations strippable by modern Node;
use `node --experimental-strip-types` on older versions if needed).

## License

MIT — see [LICENSE](LICENSE).
