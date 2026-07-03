class AudioManager {

  private backgroundMusic: HTMLAudioElement | null = null;

  private musicVolume = 0.30;

  private effectsVolume = 0.80;

  /* ----------------------------
     Música de fondo
  ----------------------------- */

  loadMusic(src: string) {

    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }

    this.backgroundMusic = new Audio(src);

    this.backgroundMusic.loop = true;

    this.backgroundMusic.volume = this.musicVolume;

  }

  playMusic() {

    if (!this.backgroundMusic) return;

    this.backgroundMusic.play().catch(() => {});

  }

  pauseMusic() {

    this.backgroundMusic?.pause();

  }

  stopMusic() {

    if (!this.backgroundMusic) return;

    this.backgroundMusic.pause();

    this.backgroundMusic.currentTime = 0;

  }

  resumeMusic() {

    this.backgroundMusic?.play().catch(() => {});

  }

  setMusicVolume(volume: number) {

    this.musicVolume = volume;

    if (this.backgroundMusic) {

      this.backgroundMusic.volume = volume;

    }

  }

  /* ----------------------------
     Efectos
  ----------------------------- */

  playEffect(src: string, volume?: number) {

    const audio = new Audio(src);

    audio.volume = volume ?? this.effectsVolume;

    audio.play().catch(() => {});

  }

  setEffectsVolume(volume: number) {

    this.effectsVolume = volume;

  }

  getMusicVolume() {

    return this.musicVolume;

  }

  getEffectsVolume() {

    return this.effectsVolume;

  }

}

export default new AudioManager();