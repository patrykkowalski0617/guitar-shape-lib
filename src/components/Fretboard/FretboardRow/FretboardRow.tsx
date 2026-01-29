import * as S from "./parts";
import { useControlsStore } from "@/store/useControlsStore";
import { useDevStore } from "@/store/useDevStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { type JSX, useRef } from "react";
import { useFretboardDevEditor } from "../helpers/useFretboardDevEditor";
import { useShapeVariantIterator } from "../helpers/useShapeVariantIterator";
import { useShapeNotes } from "../helpers/useShapeNotes";
import { useTuneSharpNoteNames } from "../helpers/useTuneSharpNoteNames";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { numberOfFrets } from "../helpers/constants";
import FretCell from "../FretCell/FretCell";
import type { STRINGS_CONFIG } from "../helpers/constants";

type StringConfig = (typeof STRINGS_CONFIG)[number];

export type FretboardNoteName = StringConfig["noteName"];
export type FretboardOctave = StringConfig["octaveNumber"];

type FretboardRowProps = {
  stringIndex: number;
  noteName: FretboardNoteName;
  octaveNumber: FretboardOctave;
};

export default function FretboardRow({
  stringIndex,
  noteName,
  octaveNumber,
}: FretboardRowProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.currentShapeSemitoneOffsetFromC,
  );
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const lockedRoleId = useMusicStore((state) => state.lockedRoleId);
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);
  const currentShapeVariantLocationData = useMusicStore(
    (state) => state.currentShapeVariantLocationData,
  );
  const lockedShapeVariantLocationData = useMusicStore(
    (state) => state.lockedShapeVariantLocationData,
  );
  const NOTES_SHARP = getNotes({ firstNote: currentKeyId }).map(
    ({ sharpNoteName }) => sharpNoteName,
  );

  const shapeRootSharpNote =
    currentShapeSemitoneOffsetFromC !== null
      ? NOTES_SHARP[currentShapeSemitoneOffsetFromC % 12]
      : null;

  const { isDevMode } = useDevStore();
  const { onDevClick, isDevNote } = useFretboardDevEditor();

  const { setNextShapeVariantLocationData } = useShapeVariantIterator();

  const { isNoteInShape } = useShapeNotes(currentShapeVariantLocationData);
  const { isNoteInShape: isLockedShapeNote } = useShapeNotes(lockedShapeVariantLocationData);

  const sharpNoteNamesInTune = useTuneSharpNoteNames();

  useHorizontalScroll(scrollRef);

  return (
    <S.FretboardRow>
      {getNotes({
        firstNote: noteName,
        length: numberOfFrets,
        firstOctave: octaveNumber,
      }).map((noteData, fretIndex) => {
        const isShapeRootNoteWithVariants =
          shapeRootSharpNote === noteData.sharpNoteName && stringIndex > 1;
        const isCurrentDevNote = isDevNote(stringIndex, fretIndex);

        const isTuneNote = sharpNoteNamesInTune.includes(noteData.sharpNoteName);

        return (
          <FretCell
            key={`${stringIndex}-${fretIndex}`}
            noteData={noteData}
            stringIndex={stringIndex}
            fretIndex={fretIndex}
            isShapeNote={isNoteInShape([stringIndex, fretIndex])}
            isShapeRootNote={shapeRootSharpNote === noteData.sharpNoteName}
            isShapeRootNoteWithVariants={isShapeRootNoteWithVariants}
            isTuneNote={isTuneNote}
            isActive={activeNoteId === noteData.noteId}
            isLockedNote={isLockedShapeNote([stringIndex, fretIndex])}
            lockedRoleId={lockedRoleId}
            currentRoleId={currentRoleId}
            isFlatTune={isFlatTune}
            isDevNote={isCurrentDevNote}
            onHover={setActiveNoteId}
            onLeave={() => setActiveNoteId(null)}
            onClick={() => {
              if (isDevMode) onDevClick(stringIndex, fretIndex);
              if (isShapeRootNoteWithVariants) {
                setNextShapeVariantLocationData(stringIndex, fretIndex);
              }
            }}
            areAnimationsOn={areAnimationsOn}
          />
        );
      })}
    </S.FretboardRow>
  );
}
