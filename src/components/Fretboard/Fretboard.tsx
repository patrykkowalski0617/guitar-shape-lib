import { useEffect, type JSX } from "react";
import * as S from "./parts";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { numberOfFrets, STRINGS_FIRST_NOTES } from "./helpers/constants";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { BoardScrollWrapper, BoardWrapper, TutorialStickyIcons } from "../Boards/parts";
import FretCell from "./FretCell/FretCell";
import { useFretboardDevEditor } from "./helpers/useFretboardDevEditor";
import { useFretboardShapes } from "./helpers/useFretboardShapes";
import FretboardInfoRow from "./FretboardInfoRow/FretboardInfoRow";
import { useDevStore } from "@/store/useDevStore";
import shapes, { type Shapes } from "@/utils/shapes";
import { useSettingsStore } from "@/store/useSettingsStore";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { useTuneSharpNoteNames } from "./helpers/useTuneSharpNoteNames";

export default function Fretboard(): JSX.Element {
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
  const activeShapePoint = useMusicStore((state) => state.activeShapePoint);
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  const NOTES_SHARP = getNotes({ firstNote: currentKeyId }).map(
    ({ sharpNoteName }) => sharpNoteName,
  );

  const shapeRootSharpNote =
    currentShapeSemitoneOffsetFromC !== null
      ? NOTES_SHARP[currentShapeSemitoneOffsetFromC % 12]
      : null;

  const { isDevMode } = useDevStore();
  const { onDevClick, isDevNote } = useFretboardDevEditor();
  const { showShape, isPointInShape, currentVariantId } = useFretboardShapes();
  const shapeData = currentShapeId ? (shapes as Shapes)[currentShapeId as string] : null;

  const sharpNoteNamesInTune = useTuneSharpNoteNames();

  useEffect(() => {
    if (isDevMode && currentVariantId) {
      console.log("Variant ID:", currentVariantId);
    }
  }, [currentVariantId, isDevMode]);

  return (
    <BoardScrollWrapper>
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
                    const isShapeNote = isPointInShape(stringIndex, fretIndex);
                    const isCurrentDevNote = isDevNote(stringIndex, fretIndex);
                    const isLockedNote = !!lockedShape?.some(
                      (p) => p.s === stringIndex && p.f === fretIndex,
                    );
                    const isTuneNote = sharpNoteNamesInTune.includes(note.sharpNoteName);

                    const isCurrentActiveRoot =
                      isShapeRootNote &&
                      activeShapePoint?.stringIdx === stringIndex &&
                      activeShapePoint?.fretIdx === fretIndex;

                    return (
                      <FretCell
                        key={`${stringIndex}-${fretIndex}`}
                        note={note}
                        fretIndex={fretIndex}
                        isHighlighted={isShapeRootNote}
                        currentRoleId={currentRoleId}
                        isFlatTune={isFlatTune}
                        isActive={activeNoteId === note.noteId}
                        isShapeRootNote={isShapeRootNote}
                        isTuneNote={isTuneNote}
                        numberOfFrets={numberOfFrets}
                        onHover={setActiveNoteId}
                        onLeave={() => setActiveNoteId(null)}
                        isShapeNote={isShapeNote}
                        isLockedNote={isLockedNote}
                        lockedRoleId={lockedRoleId}
                        isDevNote={isCurrentDevNote}
                        variants={isShapeRootNote ? variantsForThisString : []}
                        isCurrentActiveRoot={isCurrentActiveRoot}
                        onClick={() => {
                          if (isDevMode) onDevClick(stringIndex, fretIndex);
                          if (isShapeRootNote) showShape(stringIndex, fretIndex);
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
