// Funniest Autocorrect Fail — make.fun entry (program/v1, Node 22, stdlib only).
//
// Writes one original autocorrect-fail line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The gate requires UTF-8 text of 1 to 199 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fail: a birthday wish where "presents" became "peasants".
// One word swapped, the whole wish turns into an insult — exactly the
// kind of slip a phone keyboard makes on its own.
const ENTRY_TEXT = "Happy birthday! Hope your day is full of cake and peasants";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const text = ENTRY_TEXT + "\n";
  if (text.trim().length < 1 || text.trim().length > 199) {
    throw new Error(`entry length out of range: ${text.trim().length}`);
  }
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  // Round-trip check: what landed on disk must be exactly what we wrote.
  const back = readFileSync(join(outDir, "entry.txt"), "utf8");
  if (back !== text) {
    throw new Error("entry.txt round-trip mismatch");
  }
}

main();
