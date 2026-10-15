export function totalRounds(mode) {
  return mode === "classic" ? 8 : 4;
}

export function durationSeconds(mode) {
  return 300;
}

export function speakerForRound(round) {
  return round % 2 === 0 ? "A" : "B";
}

export function listenerForRound(round) {
  return speakerForRound(round) === "A" ? "B" : "A";
}

export function formatClock(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

export function timingState(elapsedSeconds, mode) {
  const duration = durationSeconds(mode);
  const count = totalRounds(mode);
  const capped = Math.max(0, Math.min(elapsedSeconds, duration * count));
  const finished = capped >= duration * count;
  const roundIndex = finished ? count - 1 : Math.floor(capped / duration);
  const remaining = finished ? 0 : Math.ceil(duration - (capped % duration));
  return { finished, roundIndex, remaining, totalSeconds: duration * count, elapsed: capped };
}
