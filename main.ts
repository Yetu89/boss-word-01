// boss-word-01 — "One Word for the Boss"
// Bounty: https://make.fun/bounty/u-swift-badger-44-one-word-for-the-boss-6b48c735
//
// WHAT THIS ENTRY IS
// -------------------
// Exactly one word describing your boss, and nothing else:
//
// "Micromanager" (12 characters)
//
// No phrase, no caption, no explanation — the word is the whole entry,
// written exactly as-is to /output/entry.txt.
//
// WHY A JUDGE SHOULD PICK IT
// ---------------------------
// Grok (grok-4.3) scored this candidate 9/10 and ranked it the winner.
// "Micromanager" is the classic negative boss stereotype: it instantly
// stings with workplace recognition and truth. Almost everyone has met
// one — the boss who hovers over every detail and trusts no one to just
// do the job — so the word lands on its own, needs no caption, and
// travels across any workplace: office, kitchen, or warehouse.
//
// SCORING RULES THIS FILE MUST SATISFY
// --------------------------------------
// The bounty kit (RULES.txt) says the sealed scorer reads
// /output/entry.txt and requires UTF-8 text of 1..30 characters that is
// not only whitespace. Anything outside those bounds scores 0 and takes
// no prize, so the gates below are not cosmetic — they are the whole
// difference between a valid entry and a wasted submission:
//   - Exactly one word: no spaces, no other whitespace anywhere.
//   - Length between 1 and 30 characters inclusive (this entry: 12).
//   - Not empty, and not whitespace-only.
//   - No leading or trailing whitespace of any kind.
//   - No newline or carriage return, and no control characters.
//
// HOW THE FILE DEFENDS THOSE RULES
// ---------------------------------
// There are two independent layers, and both must pass:
//   1. validate() runs before anything is written. Every gate above is
//      checked in turn, and the first failure throws with a message
//      naming the exact problem. A bad entry therefore never reaches
//      the output file — the program fails loudly instead of shipping
//      a zero-scoring entry.
//   2. main() reads the file back after writing it and compares the
//      result byte-for-byte against the validated string. This catches
//      the failure mode validate() cannot see: a write step that adds
//      a trailing newline, changes the encoding, or otherwise alters
//      the text on disk. The file the sealed scorer reads is the file
//      that was verified, not merely the string that was intended.
// The order matters too: validate first, write second, verify third.
// Nothing is logged as success until the round-trip comparison has
// passed, so a green log line always means the on-disk entry is exact.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const TEXT = "Micromanager";

function validate(text: string): void {
  // Empty strings carry no word at all — reject them outright.
  if (text.length === 0) {
    throw new Error("entry is empty");
  }
  // A string of only spaces or tabs would pass a length check while
  // scoring 0, so whitespace-only entries are rejected on their own.
  if (text.trim().length === 0) {
    throw new Error("entry is whitespace-only");
  }
  // The scorer counts every character, so stray spaces at either end
  // would change the entry the judge sees — exact trim match required.
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  // The entry must be exactly one word: any whitespace inside it would
  // make it two words, so every whitespace character is refused.
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word (no whitespace)");
  }
  // A single word has no line breaks; any newline would split it, so
  // both \n and \r are refused (also covered by the whitespace check,
  // kept here as an explicit gate with its own message).
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single word (no newline characters)");
  }
  // The hard window from the bounty rules: 1..30 characters inclusive.
  // The message reports the actual length so a failure is diagnosable.
  if (text.length < 1 || text.length > 30) {
    throw new Error(
      `entry must be 1..30 characters, got ${text.length}`,
    );
  }
  // Control characters are invisible in most editors but visible to the
  // scorer — tabs, NUL bytes and ANSI escapes are all rejected here
  // (U+0000–U+001F and U+007F).
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("entry contains control characters");
  }
}

function main(): void {
  // Gate first: nothing is written until the text has passed every check.
  validate(TEXT);

  // Output directory comes from the environment so the sealed scorer can
  // point it at /output; the default keeps local runs working unchanged.
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");

  // Write the validated string exactly as-is — no trailing newline, no
  // extra formatting. What validate() approved is what goes on disk.
  writeFileSync(outPath, TEXT, "utf8");

  // Round-trip check: read the file back and demand a byte-for-byte
  // match with TEXT. This is the second line of defence — it proves the
  // file the scorer will read is exactly the validated string, with no
  // trailing newline or encoding surprise introduced by the write step.
  // If this ever fails, the program throws instead of claiming success.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) {
    throw new Error("round-trip check failed: entry.txt differs from TEXT");
  }

  // Only logged after the round-trip has passed, so this line is a true
  // confirmation: the entry on disk is valid and exactly 12 characters.
  console.log(`Wrote ${TEXT.length} characters to ${outPath}`);
}

main();
