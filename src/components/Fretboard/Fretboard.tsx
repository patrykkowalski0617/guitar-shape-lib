import { type JSX, useRef } from "react";
import * as S from "./parts";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { numberOfFrets, STRINGS_FIRST_NOTES } from "./helpers/constants";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { BoardScrollWrapper, BoardWrapper, TutorialStickyIcons } from "../BoardsWrapper/parts";
import FretCell from "./FretCell/FretCell";
import { useFretboardDevEditor } from "./helpers/useFretboardDevEditor";
import FretboardInfoRow from "./FretboardInfoRow/FretboardInfoRow";
import { useDevStore } from "@/store/useDevStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { useTuneSharpNoteNames } from "./helpers/useTuneSharpNoteNames";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import { useShapeVariantIterator } from "./helpers/useShapeVariantIterator";
import { useShapeNotes } from "./helpers/useShapeNotes";

export default function Fretboard(): JSX.Element {
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
    <BoardScrollWrapper ref={scrollRef}>
      <TutorialStickyIcons>
        <TutorialPopover {...TUTORIAL_CONTENT.FRETBOARD} />
      </TutorialStickyIcons>
      <BoardWrapper>
        <S.FretboardWrapper>
          <FretboardInfoRow isNumeric />
          <S.Fretboard>
            {STRINGS_FIRST_NOTES.map(({ noteName, octaveNumber }, stringIndex) => {
              return (
                <S.FretboardRow key={`${stringIndex}-${noteName}`}>
                  {getNotes({
                    firstNote: noteName,
                    length: numberOfFrets,
                    firstOctave: octaveNumber,
                  }).map((note, fretIndex) => {
                    const isShapeRootNote = shapeRootSharpNote === note.sharpNoteName;
                    const isCurrentDevNote = isDevNote(stringIndex, fretIndex);

                    const isTuneNote = sharpNoteNamesInTune.includes(note.sharpNoteName);

                    return (
                      <FretCell
                        key={`${stringIndex}-${fretIndex}`}
                        note={note}
                        stringIndex={stringIndex}
                        fretIndex={fretIndex}
                        isHighlighted={isShapeRootNote}
                        currentRoleId={currentRoleId}
                        isFlatTune={isFlatTune}
                        isShapeRootNote={isShapeRootNote}
                        isTuneNote={isTuneNote}
                        isActive={activeNoteId === note.noteId}
                        onHover={setActiveNoteId}
                        onLeave={() => setActiveNoteId(null)}
                        isShapeNote={isNoteInShape([stringIndex, fretIndex])}
                        isLockedNote={isLockedShapeNote([stringIndex, fretIndex])}
                        lockedRoleId={lockedRoleId}
                        isDevNote={isCurrentDevNote}
                        onClick={() => {
                          if (isDevMode) onDevClick(stringIndex, fretIndex);
                          if (isShapeRootNote) {
                            setNextShapeVariantLocationData(stringIndex, fretIndex);
                          }
                        }}
                        areAnimationsOn={areAnimationsOn}
                      />
                    );
                  })}
                </S.FretboardRow>
              );
            })}
          </S.Fretboard>
          <FretboardInfoRow />
        </S.FretboardWrapper>
      </BoardWrapper>
    </BoardScrollWrapper>
  );
}
