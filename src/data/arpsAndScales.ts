import { getSemitones } from "./intervals";

export const majorScale = getSemitones(["_1", "_M2", "_M3", "_4", "_5", "_M6", "_M7"]);
export const minorScale = getSemitones(["_1", "_M2", "_m3", "_4", "_5", "_m6", "_m7"]);
export const hramonicMinorScale = getSemitones(["_1", "_M2", "_m3", "_4", "_5", "_m6", "_M7"]);
