/** Airplane-style ding-dong chime using Web Audio API */
export function playDingDong(): void {
  try {
    const ctx = new AudioContext();

    function tone(freq: number, start: number, dur: number) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.28, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      osc.start(start);
      osc.stop(start + dur);
    }

    const now = ctx.currentTime;
    // Classic two-tone chime: F5 (698 Hz) then D5 (587 Hz)
    tone(698.46, now, 0.9);
    tone(587.33, now + 0.45, 0.9);

    // Close ctx after sounds finish
    setTimeout(() => ctx.close(), 2000);
  } catch {
    // Ignore if AudioContext not available (e.g., SSR)
  }
}
