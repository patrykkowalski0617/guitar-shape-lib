import { useEffect } from "react";
import { useDataKeyStore, useMusicStore } from "@/store";
import { SCALE_SEMITONE_TEMPLATES } from "@/data";
import { useUnifiedMusicKey } from "@/hooks";
import { harmonizeBassNote } from "../utils/harmonizeBassNote";
import { useBaseChord } from "@/hooks/baseChord/useBaseChord";
import { changeOctaveOfNoteId } from "@/utils";

export const useBackingTrackSync = () => {
  const baseChordBassNoteId = useMusicStore((s) => s.baseChordBassNoteId);
  const setBackingtrackNoteIds = useMusicStore((s) => s.setBackingtrackNoteIds);

  const guitarShapeVariantDataKeys = useMusicStore(
    (s) => s.guitarShapeVariantDataKeys,
  );
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((s) => s.baseChordDataKey);

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

    const harmonyNoteIds = harmonizeBassNote(
      baseChordBassNoteId,
      scaleTemplate,
    );
    const bassNoteNoteId = changeOctaveOfNoteId(baseChordBassNoteId);
    const allHarmonyNoteIds = [bassNoteNoteId, ...harmonyNoteIds];
    setBackingtrackNoteIds(allHarmonyNoteIds);
  }, [
    guitarShapeVariantDataKeys,
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    baseChordSemitoneOffsetFromMajorRoot,
    unifiedMusicKeySemitonOffsetFromC,
    scaleTemplate,
    setBackingtrackNoteIds,
    baseChordBassNoteId,
  ]);
};
