import { type JSX, useMemo } from "react";
import * as S from "./parts";
import { majorScale, UNIFIED_MUSIC_KEYS, NOTES_SHARP } from "@/utils";
import { notes, numberOfKeys } from "./helpers/constants";
import { useControlsStore } from "@/store/useControlsStore";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import { BoardScrollWrapper, BoardWrapper } from "../customUI/Boards/parts";
import KeyboardKey from "./KeyboardKey/KeyboardKey";
import { useMusicStore } from "@/store/useMusicStore";
import shapes from "@/utils/shapes";
import { useTutorialHover } from "../TutorialBox/helpers/useTutorialHover";
import { useSettingsStore } from "@/store/useSettingsStore";

const KEY_SHAPE_MAP: Record<number, S.KeyShape> = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B",
};

export default function Keyboard(): JSX.Element {
  const { fullScaleMetadata } = useActiveScale();
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeOffset = useControlsStore((state) => state.currentShapeOffset);
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  const shapeSemitones = useMemo(() => {
    if (!currentShapeId || currentShapeOffset === null) return [];

    return shapes[currentShapeId].intervals.map(
      (intervalValue) => (intervalValue + currentShapeOffset) % 12,
    );
  }, [currentShapeId, currentShapeOffset]);

  const tutorialHover_keyboard = useTutorialHover("keyboard");
  const tutorialHover_scaleTemplate = useTutorialHover("scale-template");

  return (
    <BoardScrollWrapper>
      <BoardWrapper>
        <div {...tutorialHover_scaleTemplate}>
          <ScaleTemplate />
        </div>
        <div {...tutorialHover_keyboard}>
          <S.Keyboard $numberOfKeys={numberOfKeys}>
            {notes.map((note, index) => {
              const noteIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
              const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

              const scaleDegree = fullScaleMetadata.find(
                (m) => m.noteId === note.noteId && m.isVisible,
              );

              const isPartOfShape = !!(
                shapeSemitones.includes((noteIndex - templateOffset + 12) % 12) &&
                scaleDegree?.role &&
                scaleDegree.role !== "none"
              );

              return (
                <KeyboardKey
                  key={note.noteId}
                  note={note}
                  index={index}
                  noteIndex={noteIndex}
                  isHighlighted={!!scaleDegree}
                  isShapeNote={isPartOfShape}
                  scaleDegree={scaleDegree}
                  isFlatKey={isFlatKey}
                  isActive={activeNoteId === note.noteId}
                  onHover={setActiveNoteId}
                  onLeave={() => setActiveNoteId(null)}
                  keyShape={KEY_SHAPE_MAP[noteIndex]}
                  majorScale={majorScale}
                  areAnimationsOn={areAnimationsOn}
                />
              );
            })}
          </S.Keyboard>
        </div>
      </BoardWrapper>
    </BoardScrollWrapper>
  );
}
