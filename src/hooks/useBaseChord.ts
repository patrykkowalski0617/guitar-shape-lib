import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import { useDataKeyStore } from "@/store";
import { useEnharmonicNoteName } from "./useEnharmonicNoteName";
import { getNotes } from "@/utils";

interface UseBaseChordProps {
  baseChordDataKey?: BaseChordDataKey;
}

interface GetBaseChordNameProps {
  isExtendedName?: boolean;
  unifiedMusicKeysDataKey?: UnifiedMusicKeysDataKey;
}

export const useBaseChord = ({
  baseChordDataKey: provided_baseChordDataKey,
}: UseBaseChordProps = {}) => {
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const store_baseChordDataKey = useDataKeyStore(
    (state) => state.baseChordDataKey,
  );
  const store_unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const getBaseChordName = ({
    isExtendedName = true,
    unifiedMusicKeysDataKey: provided_unifiedMusicKeysDataKey,
    baseChordDataKey: local_baseChordDataKey,
  }: GetBaseChordNameProps & { baseChordDataKey?: BaseChordDataKey } = {}) => {
    const unifiedMusicKeysDataKey =
      provided_unifiedMusicKeysDataKey ?? store_unifiedMusicKeysDataKey;

    const baseChordDataKey =
      local_baseChordDataKey ??
      provided_baseChordDataKey ??
      store_baseChordDataKey;

    if (!unifiedMusicKeysDataKey || !baseChordDataKey) return "";

    const baseChord = BASE_CHORDS[baseChordDataKey];
    const musicKeyOffset =
      UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].semitonOffsetFromC;
    const chordOffset = baseChord.semitoneOffsetFromMajorRoot;
    const totalOffset = musicKeyOffset + chordOffset;

    const notes = getNotes({ length: 24 });
    const noteName = getEnharmonicNoteName(notes[totalOffset], {
      unifiedMusicKeysDataKey,
    });

    const extension = isExtendedName ? ` ${baseChord.modeExtendedName}` : "";

    return `${noteName}${extension}`;
  };

  return {
    getBaseChordName,
  };
};
