import { useEffect } from "react";
import { useControlsStore, useMusicStore } from "@/store";
import { getNotes } from "@/utils";
import {
  BASE_CHORDS,
  SCALE_SEMITONE_TEMPLATES,
  UNIFIED_MUSIC_KEYS,
} from "@/data";
import { useBaseChordShapes } from "../../Fretboard/FretboardCell/hooks/useBaseChordShapes";
import { findMatchingBaseChordCoordinates } from "../../Fretboard/FretboardCell/helpers/findMatchingBaseChordCoordinates";
import { STRINGS_CONFIG } from "../../Fretboard/constants";
import { useShapeCoordinates } from "@/components/Fretboard/FretboardCell/hooks";
import { harmonizeBassNote } from "../utils/harmonizeBassNote";

import type { NoteId } from "@/utils";

export const useBackingTrackSync = () => {
  const setBackgingtrackNoteIds = useMusicStore(
    (state) => state.setBackgingtrackNoteIds,
  );
  const currentBackingtrackIds = useMusicStore(
    (state) => state.backgingtrackNoteIds,
  );

  const shapeVariantDataKeys = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);

  const baseScaleDataKey =
    baseChordDataKey != null
      ? BASE_CHORDS[baseChordDataKey].baseScaleDataKey
      : undefined;
  const scaleTemplate =
    baseScaleDataKey != null
      ? SCALE_SEMITONE_TEMPLATES[baseScaleDataKey]
      : undefined;

  const { baseChordCoordinates } = useBaseChordShapes();
  const shapeCoordinates = useShapeCoordinates(shapeVariantDataKeys);

  useEffect(() => {
    const canCalculate =
      shapeVariantDataKeys &&
      unifiedMusicKeysDataKey &&
      baseChordDataKey &&
      scaleTemplate &&
      baseChordCoordinates &&
      shapeCoordinates.length > 0;

    if (!canCalculate) return;

    const baseChordMatch = findMatchingBaseChordCoordinates({
      baseChordCoordinates,
      shapeCoordinates,
    });

    if (!baseChordMatch) return;

    const { baseStringIndexes, baseFretIndex } = baseChordMatch;
    const musicKeyOffset =
      UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].offsetFromC;
    const baseChordOffsetFromC =
      BASE_CHORDS[baseChordDataKey].semitoneOffsetFromMajorRoot - 12;

    let bassNoteFretIndex =
      baseFretIndex + musicKeyOffset + baseChordOffsetFromC;

    const octave = 12;
    const maxFret = 24;

    if (bassNoteFretIndex < 0) bassNoteFretIndex += octave;
    else if (bassNoteFretIndex > maxFret) bassNoteFretIndex -= octave;

    const stringConfig = STRINGS_CONFIG[baseStringIndexes];
    const notes = getNotes({
      firstNote: stringConfig.firstNoteInRow,
      length: 25,
      firstOctave: stringConfig.firstNoteOctaveNumber,
    });

    const rootNoteId = notes[bassNoteFretIndex]?.noteId as NoteId;

    if (rootNoteId) {
      const harmonyIds = harmonizeBassNote(
        rootNoteId,
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
    baseChordCoordinates,
    shapeCoordinates,
    scaleTemplate,
    setBackgingtrackNoteIds,
    currentBackingtrackIds,
  ]);
};
