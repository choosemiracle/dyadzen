import test from "node:test";
import assert from "node:assert/strict";
import { timingState, formatClock, speakerForRound, listenerForRound, durationSeconds, totalRounds } from "../src/timer.js";

test("beginners get four alternating three-minute rounds", () => {
  assert.equal(totalRounds("gentle"), 4);
  assert.equal(durationSeconds("gentle"), 180);
  assert.equal(speakerForRound(0), "A");
  assert.equal(speakerForRound(1), "B");
  assert.equal(listenerForRound(0), "B");
  assert.equal(timingState(0, "gentle").remaining, 180);
  assert.equal(timingState(180, "gentle").roundIndex, 1);
  assert.equal(timingState(720, "gentle").finished, true);
  assert.equal(timingState(721, "gentle").remaining, 0);
});

test("classic reference structure has eight 5-minute turns", () => {
  assert.equal(totalRounds("classic"), 8);
  assert.equal(durationSeconds("classic"), 300);
  assert.equal(timingState(2399, "classic").finished, false);
  assert.equal(timingState(2400, "classic").finished, true);
});

test("clock formatting is bounded", () => {
  assert.equal(formatClock(0), "00:00");
  assert.equal(formatClock(65), "01:05");
  assert.equal(formatClock(-1), "00:00");
});
