import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type NoteName,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import { getNotes, type NoteObject } from "@/utils";

interface GetBaseChordNameProps {
  baseChordDataKey: BaseChordDataKey;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  isExtendedName?: boolean;
  getEnharmonicNoteName: (
    note: NoteObject,
    options: { unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey },
  ) => NoteName;
}

export const getBaseChordName = ({
  baseChordDataKey,
  unifiedMusicKeysDataKey,
  isExtendedName = true,
  getEnharmonicNoteName,
}: GetBaseChordNameProps): string => {
  const baseChord = BASE_CHORDS[baseChordDataKey];
  const totalOffset =
    UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC +
    baseChord.semitoneOffsetFromMajorRoot;

  const notes = getNotes({ length: 24 });
  const noteName = getEnharmonicNoteName(notes[totalOffset], {
    unifiedMusicKeysDataKey,
  });

  return `${noteName}${isExtendedName ? ` ${baseChord.modeExtendedName}` : ""}`;
};
