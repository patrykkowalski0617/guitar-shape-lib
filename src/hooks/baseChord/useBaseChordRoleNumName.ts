import { BASE_CHORDS, type BaseChordDataKey } from "@/data";

export const getBaseChordRoleNumName = (
  baseChordDataKey: BaseChordDataKey,
  isMajorMode: boolean,
): string => {
  const chord = BASE_CHORDS[baseChordDataKey];
  if (isMajorMode) {
    return "majorRoleNumName" in chord ? chord.majorRoleNumName : "";
  }
  return "minorRoleNumName" in chord ? chord.minorRoleNumName : "";
};
