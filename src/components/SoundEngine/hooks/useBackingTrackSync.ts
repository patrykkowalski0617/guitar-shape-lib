import { useEffect } from "react";
import { useDataKeyStore, useMusicStore } from "@/store";
import { BASE_CHORDS, SCALE_SEMITONE_TEMPLATES } from "@/data";
import { useBaseChord, useUnifiedMusicKey } from "@/hooks";
import { harmonizeBassNote } from "../utils/harmonizeBassNote";
import type { NoteId } from "@/utils";

export const useBackingTrackSync = () => {
  const baseChordBassNoteId = useMusicStore(
    (state) => state.baseChordBassNoteId,
  );
  const setBackgingtrackNoteIds = useMusicStore(
    (state) => state.setBackgingtrackNoteIds,
  );
  const currentBackingtrackIds = useMusicStore(
    (state) => state.backgingtrackNoteIds,
  );

  const shapeVariantDataKeys = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const baseChord = useBaseChord().baseChord;
  const baseChordSemitoneOffsetFromMajorRoot =
    baseChord?.semitoneOffsetFromMajorRoot;

  const unifiedMusicKey = useUnifiedMusicKey();
  const unifiedMusicKeySemitonOffsetFromC = unifiedMusicKey?.semitonOffsetFromC;

  const baseScaleDataKey =
    baseChordDataKey != null
      ? BASE_CHORDS[baseChordDataKey].baseScaleDataKey
      : undefined;
  const scaleTemplate =
    baseScaleDataKey != null
      ? SCALE_SEMITONE_TEMPLATES[baseScaleDataKey]
      : undefined;

  useEffect(() => {
    if (!scaleTemplate) {
      return;
    }

    if (baseChordBassNoteId) {
      const harmonyIds = harmonizeBassNote(
        baseChordBassNoteId,
        scaleTemplate,
      ) as NoteId[];

      const isDifferent =
        JSON.stringify(currentBackingtrackIds) !== JSON.stringify(harmonyIds);

      if (isDifferent) {
        setBackgingtrackNoteIds(harmonyIds);
      }
    }
  }, [
    shapeVariantDataKeys,
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    baseChordSemitoneOffsetFromMajorRoot,
    unifiedMusicKeySemitonOffsetFromC,
    scaleTemplate,
    setBackgingtrackNoteIds,
    currentBackingtrackIds,
    baseChordBassNoteId,
  ]);
};
