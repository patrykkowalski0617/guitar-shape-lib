declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export class AudioContextManager {
  private context: AudioContext | null = null;

  async getContext(): Promise<AudioContext> {
    if (!this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext!)();
    }
    if (this.context.state === "suspended") {
      await this.context.resume();
    }
    return this.context;
  }

  getCurrentContext(): AudioContext | null {
    return this.context;
  }

  close() {
    if (this.context) {
      this.context.close();
      this.context = null;
    }
  }
}
