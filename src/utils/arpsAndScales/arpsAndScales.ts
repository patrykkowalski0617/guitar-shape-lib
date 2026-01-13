import { getSemitones } from "../intervals/intervals";

export const majorScale = getSemitones(["_1", "_M2", "_M3", "_4", "_5", "_M6", "_M7"]);

// common template of semitones for both: minor and major scale
// prettier-ignore
export const MINOR_MAJOR_TEMPLATE_STEPS = getSemitones(["_1", "_M2", "_m3", "_4", "_5", "_m6", "_m7", "_8", "_M9",]);
