import { getSemitones } from "../intervals/intervals";

export const majorScale = getSemitones(["_1", "_M2", "_M3", "_4", "_5", "_M6", "_M7"]);

// common template of semitones for both: minor and major scale
export const MINOR_MAJOR_TEMPLATE_STEPS = getSemitones([
  "_1",
  "_M2",
  "_m3",
  "_4",
  "_5",
  "_m6",
  "_m7",
  "_8",
  "_M9",
]);
export const MINOR_MAJOR_TEMPLATE_STEPS_2octaves = getSemitones([
  "_1",
  "_M2",
  "_m3",
  "_4",
  "_5",
  "_m6",
  "_m7",
  "_8",
  "_M9",
  "_m10",
  "_11",
  "_12",
  "_m13",
  "_m14",
]).concat([24, 26]);

export const MINOR_MAJOR_TEMPLATE_STEPS_2octaves_Subdomi = getSemitones([
  "_1",
  "_M2",
  "_m3",
  "_4",
  "_5",
  "_m6",
  "_m7",
  "_8",
  "_M9",
  "_m10",
  "_11",
  "_12",
  "_m13",
  "_m14",
]).concat([24, 26, 27, 29]);

export const MINOR_MAJOR_TEMPLATE_STEPS_2octaves_Domi = getSemitones([
  "_1",
  "_M2",
  "_m3",
  "_4",
  "_5",
  "_m6",
  "_m7",
  "_8",
  "_M9",
  "_m10",
  "_11",
  "_12",
  "_m13",
  "_m14",
]).concat([24, 26, 27, 29, 31]);
