import { useEffect } from "react";
import { useDataKeyStore, useMusicStore } from "@/store";
import { SCALE_SEMITONE_TEMPLATES } from "@/data";
import { useUnifiedMusicKey } from "@/hooks";
import { harmonizeBassNote } from "../utils/harmonizeBassNote";
import { useBaseChord } from "@/hooks/baseChord/useBaseChord";
import { decrementOctaveOfNoteId } from "@/utils";

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

  const guitarShapeVariantDataKeys = useMusicStore(
    (state) => state.guitarShapeVariantDataKeys,
  );
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);

  const baseChord = useBaseChord(baseChordDataKey);
  const baseChordSemitoneOffsetFromMajorRoot =
    baseChord?.semitoneOffsetFromMajorRoot;

  const unifiedMusicKey = useUnifiedMusicKey();
  const unifiedMusicKeySemitonOffsetFromC = unifiedMusicKey?.semitonOffsetFromC;

  const baseScaleDataKey = baseChord?.baseScaleDataKey;

  const scaleTemplate =
    baseScaleDataKey != null
      ? SCALE_SEMITONE_TEMPLATES[baseScaleDataKey].template
      : undefined;

  useEffect(() => {
    if (!scaleTemplate) return;
    if (!baseChordBassNoteId) return;

    const timeout = setTimeout(() => {
      const harmonyNoteIds = harmonizeBassNote(
        baseChordBassNoteId,
        scaleTemplate,
      );
      const bassNoteNoteId = decrementOctaveOfNoteId(baseChordBassNoteId);
      const allHarmonyNoteIds = [bassNoteNoteId, ...harmonyNoteIds];
      const isDifferent =
        JSON.stringify(currentBackingtrackIds) !==
        JSON.stringify(allHarmonyNoteIds);

      if (isDifferent) {
        setBackgingtrackNoteIds(allHarmonyNoteIds);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [
    guitarShapeVariantDataKeys,
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
