import test from "node:test";
import assert from "node:assert/strict";
import { timingState, formatClock, speakerForRound, listenerForRound, durationSeconds, totalRounds } from "../src/timer.js";

test("beginners default to four alternating five-minute rounds", () => {
  assert.equal(totalRounds("gentle"), 4);
  assert.equal(durationSeconds("gentle"), 300);
  assert.equal(speakerForRound(0), "A");
  assert.equal(speakerForRound(1), "B");
  assert.equal(listenerForRound(0), "B");
  assert.equal(timingState(0, "gentle").remaining, 300);
  assert.equal(timingState(299, "gentle").roundIndex, 0);
  assert.equal(timingState(300, "gentle").roundIndex, 1);
  assert.equal(timingState(1200, "gentle").finished, true);
  assert.equal(timingState(1201, "gentle").remaining, 0);
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
