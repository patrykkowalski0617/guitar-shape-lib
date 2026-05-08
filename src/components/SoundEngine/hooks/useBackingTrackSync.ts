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

  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const baseChordId = useControlsStore((state) => state.baseChordId);

  const baseScaleId =
    baseChordId != null ? BASE_CHORDS[baseChordId].baseScaleId : undefined;
  const scaleTemplate =
    baseScaleId != null ? SCALE_SEMITONE_TEMPLATES[baseScaleId] : undefined;

  const { baseChordCoordinates } = useBaseChordShapes();
  const shapeCoordinates = useShapeCoordinates(shapeVariantLocationData);

  useEffect(() => {
    const canCalculate =
      shapeVariantLocationData &&
      tuneKeyId &&
      baseChordId &&
      scaleTemplate &&
      baseChordCoordinates &&
      shapeCoordinates.length > 0;

    if (!canCalculate) return;

    const baseChordMatch = findMatchingBaseChordCoordinates({
      baseChordCoordinates,
      shapeCoordinates,
    });

    if (!baseChordMatch) return;

    const { baseStringIndex, baseFretIndex } = baseChordMatch;
    const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
    const baseChordOffsetFromC =
      BASE_CHORDS[baseChordId].semitoneOffsetFromMajorScaleRoot - 12;

    let bassNoteFretIndex =
      baseFretIndex + tuneKeyOffset + baseChordOffsetFromC;

    const octave = 12;
    const maxFret = 24;

    if (bassNoteFretIndex < 0) bassNoteFretIndex += octave;
    else if (bassNoteFretIndex > maxFret) bassNoteFretIndex -= octave;

    const stringConfig = STRINGS_CONFIG[baseStringIndex];
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
    shapeVariantLocationData,
    tuneKeyId,
    baseChordId,
    baseChordCoordinates,
    shapeCoordinates,
    scaleTemplate,
    setBackgingtrackNoteIds,
    currentBackingtrackIds,
  ]);
};
