import { useMemo, useCallback } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useDevStore } from "@/store/useDevStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { getNotes, UNIFIED_MUSIC_KEYS, type Note, type NoteSharp } from "@/utils";
import { useFretboardDevEditor } from "../helpers/useFretboardDevEditor";
import { useShapeVariantIterator } from "../helpers/useShapeVariantIterator";
import { useShapeNotes } from "../helpers/useShapeNotes";
import { useInTuneSharpNoteNames } from "../helpers/useInTuneSharpNoteNames";
import { numberOfFrets } from "../helpers/constants";

export const useFretboardRow = (firstNoteInRow: string, octaveNumber: number) => {
  const { currentKeyId, currentShapeSemitoneOffsetFromC, currentRoleId } = useControlsStore();
  const { areAnimationsOn } = useSettingsStore();
  const { isDevMode } = useDevStore();
  const {
    activeNoteId,
    setActiveNoteId,
    lockedRoleId,
    currentShapeVariantLocationData,
    lockedShapeVariantLocationData,
  } = useMusicStore();

  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;
  const NOTES_SHARP = useMemo(
    () => getNotes({ firstNote: currentKeyId }).map((n) => n.sharpNoteName),
    [currentKeyId],
  );
  const shapeRootSharpNote = useMemo(
    () =>
      currentShapeSemitoneOffsetFromC !== null
        ? NOTES_SHARP[currentShapeSemitoneOffsetFromC % 12]
        : null,
    [currentShapeSemitoneOffsetFromC, NOTES_SHARP],
  );
  const rowNotes = useMemo(
    () =>
      getNotes({
        firstNote: firstNoteInRow as Note,
        length: numberOfFrets,
        firstOctave: octaveNumber,
      }),
    [firstNoteInRow, octaveNumber],
  );

  const { onDevClick, isDevNote } = useFretboardDevEditor();
  const { setNextShapeVariantLocationData } = useShapeVariantIterator();
  const { isShapeNote } = useShapeNotes(currentShapeVariantLocationData);
  const { isShapeNote: isLockedShapeNote } = useShapeNotes(lockedShapeVariantLocationData);
  const sharpNoteNamesInTune = useInTuneSharpNoteNames();

  const isTuneNote = useCallback(
    (sharpName: NoteSharp) => sharpNoteNamesInTune.includes(sharpName),
    [sharpNoteNamesInTune],
  );

  return {
    rowNotes,
    state: {
      activeNoteId,
      lockedRoleId,
      currentRoleId,
      isFlatTune,
      shapeRootSharpNote,
      isDevMode,
      areAnimationsOn,
    },
    actions: {
      setActiveNoteId,
      onDevClick,
      isDevNote,
      isShapeNote,
      isLockedShapeNote,
      setNextShapeVariantLocationData,
      isTuneNote,
    },
  };
};
