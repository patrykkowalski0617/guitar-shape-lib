import { type JSX, useRef, useState } from "react";
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
import shapes from "@/utils/shapes";
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
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.currentShapeSemitoneOffsetFromC,
  );
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const lockedShape = useMusicStore((state) => state.lockedShape);
  const lockedRoleId = useMusicStore((state) => state.lockedRoleId);
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);
  const [clickedCell, setClickedCell] = useState<{ stringIndex: number; fretIndex: number } | null>(
    null,
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
  const { isNoteInShape } = useShapeNotes();

  const shapeData = currentShapeId ? shapes[currentShapeId] : null;

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
              const variantsForThisString = shapeData
                ? Object.entries(shapeData.shapesCoordinates)
                    .filter(([, coords]) => coords.length > 0 && coords[0][0] === stringIndex)
                    .map(([id]) => ({ id }))
                : [];

              return (
                <S.FretboardRow key={`${stringIndex}-${noteName}`}>
                  {getNotes({
                    firstNote: noteName,
                    length: numberOfFrets,
                    firstOctave: octaveNumber,
                  }).map((note, fretIndex) => {
                    const isShapeRootNote = shapeRootSharpNote === note.sharpNoteName;
                    const isCurrentDevNote = isDevNote(stringIndex, fretIndex);
                    const isLockedNote = !!lockedShape?.some(
                      (p) => p.s === stringIndex && p.f === fretIndex,
                    );
                    const isTuneNote = sharpNoteNamesInTune.includes(note.sharpNoteName);

                    const isCurrentActiveRoot =
                      isShapeRootNote &&
                      clickedCell?.stringIndex === stringIndex &&
                      clickedCell?.fretIndex === fretIndex;

                    return (
                      <FretCell
                        key={`${stringIndex}-${fretIndex}`}
                        note={note}
                        stringIndex={stringIndex}
                        isHighlighted={isShapeRootNote}
                        currentRoleId={currentRoleId}
                        isFlatTune={isFlatTune}
                        isShapeRootNote={isShapeRootNote}
                        isTuneNote={isTuneNote}
                        isActive={activeNoteId === note.noteId}
                        onHover={setActiveNoteId}
                        onLeave={() => setActiveNoteId(null)}
                        isShapeNote={isNoteInShape([stringIndex, fretIndex])}
                        isLockedNote={isLockedNote}
                        lockedRoleId={lockedRoleId}
                        isDevNote={isCurrentDevNote}
                        variants={isShapeRootNote ? variantsForThisString : []}
                        isCurrentActiveRoot={isCurrentActiveRoot}
                        onClick={() => {
                          if (isDevMode) onDevClick(stringIndex, fretIndex);
                          if (isShapeRootNote)
                            setNextShapeVariantLocationData(stringIndex, fretIndex);
                          setClickedCell({ stringIndex, fretIndex });
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
