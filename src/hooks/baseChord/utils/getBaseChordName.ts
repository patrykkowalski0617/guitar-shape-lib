import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import { getEnharmonicNoteName, getNotes } from "@/utils";

interface GetBaseChordNameProps {
  baseChordDataKey: BaseChordDataKey;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  isExtendedName?: boolean;
}

export const getBaseChordName = ({
  baseChordDataKey,
  unifiedMusicKeysDataKey,
  isExtendedName = true,
}: GetBaseChordNameProps): string => {
  const baseChord = BASE_CHORDS[baseChordDataKey];
  const totalOffset =
    UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC +
    baseChord.semitoneOffsetFromMajorRoot;

  const notes = getNotes({ length: 24 });
  const noteName = getEnharmonicNoteName(
    notes[totalOffset],
    unifiedMusicKeysDataKey,
  );

  return `${noteName}${isExtendedName ? ` ${baseChord.modeExtendedName}` : ""}`;
};
