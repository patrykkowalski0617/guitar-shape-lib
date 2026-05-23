export class BassNoteGenerator {
  createBassNote(
    context: AudioContext,
    time: number,
    frequency: number,
    volume: number,
    bpm: number,
  ): AudioNode[] {
    const mainGain = context.createGain();
    mainGain.gain.setValueAtTime(0, time);
    mainGain.gain.linearRampToValueAtTime(volume * 0.1, time + 0.01);

    const noteDuration = (60.0 / bpm) * 0.9;
    mainGain.gain.setValueAtTime(volume * 0.005, time + 0.0005);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, time + noteDuration);

    const osc = context.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, time);
    osc.connect(mainGain);

    const subOsc = context.createOscillator();
    const subGain = context.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(frequency / 2, time);
    subGain.gain.setValueAtTime(0.2, time);
    subOsc.connect(subGain);
    subGain.connect(mainGain);

    mainGain.connect(context.destination);

    osc.start(time);
    osc.stop(time + noteDuration + 0.05);
    subOsc.start(time);
    subOsc.stop(time + noteDuration + 0.05);

    return [osc, subOsc];
  }
}
