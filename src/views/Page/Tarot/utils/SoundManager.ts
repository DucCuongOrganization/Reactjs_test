export class SoundManager {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    try {
      // Initialize AudioContext only after user interaction usually,
      // but we can prep the class.
      const AudioContextClass =
        window.AudioContext ||
        (
          window as unknown as Window & {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  }

  private initContext() {
    if (this.audioContext?.state === "suspended") {
      this.audioContext.resume();
    }
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
  }

  public toggleMute(): boolean {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  // --- Sound Effects (SFX) ---

  // Hiệu ứng chọn bài (tiếng chuông gió/ting)
  public playSelectSound() {
    if (this.isMuted || !this.audioContext) return;
    this.initContext();

    const t = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, t); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, t + 0.1); // A6

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5); // Long decay

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start();
    osc.stop(t + 1.5);
  }

  // Hiệu ứng lật bài/xuất hiện kết quả (Woosh + Chime)
  public playRevealSound() {
    if (this.isMuted || !this.audioContext) return;
    this.initContext();
    const t = this.audioContext.currentTime;

    // 1. Low "Boom"
    const oscLow = this.audioContext.createOscillator();
    const gainLow = this.audioContext.createGain();
    oscLow.type = "sine";
    oscLow.frequency.setValueAtTime(100, t);
    oscLow.frequency.exponentialRampToValueAtTime(0.01, t + 1);
    gainLow.gain.setValueAtTime(0.3, t);
    gainLow.gain.exponentialRampToValueAtTime(0.001, t + 1);
    oscLow.connect(gainLow);
    gainLow.connect(this.audioContext.destination);
    oscLow.start();
    oscLow.stop(t + 1);

    // 2. High Sparkles
    [1000, 1500, 2000].forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + i * 0.1);
      gain.gain.setValueAtTime(0.05, t + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1 + i * 0.1);
      osc.connect(gain);
      gain.connect(this.audioContext!.destination);
      osc.start(t + i * 0.1);
      osc.stop(t + 1.5);
    });
  }
}

// Singleton instance
export const soundManager = new SoundManager();
