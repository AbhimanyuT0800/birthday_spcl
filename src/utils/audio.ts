// Web Audio API Synthesizer for high-fidelity birthday sounds without external MP3 files

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmTimeout: ReturnType<typeof setTimeout> | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  // Soft sparkle or chime
  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.12, this.ctx!.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + i * 0.08);
        osc.stop(this.ctx!.currentTime + i * 0.08 + 0.6);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Party pop
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // Ignore
    }
  }

  // Fanfare when countdown hits 0 or cake is cut
  public playFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      // G4, C5, E5, G5, C6 triumph
      const chords = [
        { f: 392.00, t: 0, d: 0.15 },
        { f: 523.25, t: 0.15, d: 0.15 },
        { f: 659.25, t: 0.3, d: 0.2 },
        { f: 783.99, t: 0.5, d: 0.35 },
        { f: 1046.50, t: 0.85, d: 0.9 },
      ];

      chords.forEach(({ f, t, d }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + t);

        gain.gain.setValueAtTime(0.18, this.ctx!.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + t + d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + t);
        osc.stop(this.ctx!.currentTime + t + d);
      });
    } catch {
      // Ignore
    }
  }

  // Happy Birthday Chime Melody
  public playHappyBirthdayTheme() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Note frequencies: C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
      const songNotes = [
        { f: 261.63, d: 0.3 }, // Hap-
        { f: 261.63, d: 0.2 }, // py
        { f: 293.66, d: 0.5 }, // birth-
        { f: 261.63, d: 0.5 }, // day
        { f: 349.23, d: 0.5 }, // to
        { f: 329.63, d: 0.8 }, // you!

        { f: 261.63, d: 0.3 }, // Hap-
        { f: 261.63, d: 0.2 }, // py
        { f: 293.66, d: 0.5 }, // birth-
        { f: 261.63, d: 0.5 }, // day
        { f: 392.00, d: 0.5 }, // to
        { f: 349.23, d: 0.8 }, // you!

        { f: 261.63, d: 0.3 }, // Hap-
        { f: 261.63, d: 0.2 }, // py
        { f: 523.25, d: 0.5 }, // birth-
        { f: 440.00, d: 0.5 }, // day
        { f: 349.23, d: 0.5 }, // dear
        { f: 329.63, d: 0.5 }, // best-
        { f: 293.66, d: 0.8 }, // ie!

        { f: 466.16, d: 0.3 }, // Hap-
        { f: 466.16, d: 0.2 }, // py
        { f: 440.00, d: 0.5 }, // birth-
        { f: 349.23, d: 0.5 }, // day
        { f: 392.00, d: 0.5 }, // to
        { f: 349.23, d: 1.1 }, // you!
      ];

      let currentTime = this.ctx.currentTime + 0.1;
      songNotes.forEach(note => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        // Warm electric piano tone (blended triangle)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, currentTime);

        gain.gain.setValueAtTime(0.18, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.002, currentTime + note.d * 0.95);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(currentTime);
        osc.stop(currentTime + note.d);

        currentTime += note.d * 1.05;
      });
    } catch {
      // Audio playback interrupted
    }
  }

  // Gentle Background music loop (Cute music box / lofi chords)
  public startBgm() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.playBgmLoop();
  }

  private playBgmLoop() {
    if (!this.isBgmPlaying || this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Sweet nostalgic 4-chord progression: Cmaj7 -> Am7 -> Fmaj7 -> G7
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 261.63, 329.63, 349.23], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G7
    ];

    chords.forEach((chord, step) => {
      const startTime = this.ctx!.currentTime + step * 1.8;
      chord.forEach((freq, noteIdx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime + noteIdx * 0.05);

        gain.gain.setValueAtTime(0.04, startTime + noteIdx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.7);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime + noteIdx * 0.05);
        osc.stop(startTime + 1.75);
      });
    });

    this.bgmTimeout = setTimeout(() => {
      if (this.isBgmPlaying) {
        this.playBgmLoop();
      }
    }, 4 * 1800);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.setMuted(false);
      this.startBgm();
      return true;
    }
  }

  public isMusicPlaying(): boolean {
    return this.isBgmPlaying;
  }
}

export const sounds = new SoundManager();
