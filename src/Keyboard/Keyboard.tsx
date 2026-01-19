import { type JSX } from "react";
import * as S from "@/components/Keyboard/parts";
import { majorScale, NOTES_SHARP, UNIFIED_MUSIC_KEYS } from "@/utils";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useTutorialHover } from "@/components/TutorialBox/helpers/useTutorialHover";
import { notes, numberOfKeys } from "@/components/Keyboard/helpers/constants";
import { BoardScrollWrapper, BoardWrapper } from "@/components/customUI/Boards/parts";
import KeyboardKey from "./KeyboardKey/KeyboardKey";
import { useScaleLogic } from "./helpers/useScaleLogic";

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
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;

  const tutorialHover_keyboard = useTutorialHover("keyboard");

  useScaleLogic();
  return (
    <BoardScrollWrapper>
      <BoardWrapper>
        <div {...tutorialHover_keyboard}>
          <S.Keyboard $numberOfKeys={numberOfKeys}>
            {notes.map((note) => {
              //- Key color (white/black) and shape
              const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
              const isWhiteKey = majorScale.includes(noteOctaveIndex);
              const keyShape = KEY_SHAPE_MAP[noteOctaveIndex];

              return (
                <KeyboardKey
                  //- sync hover effect between fretboard nad keyboard
                  isActive={note.noteId === activeNoteId}
                  //- Key color (white/black) and shape
                  isWhiteKey={isWhiteKey}
                  keyShape={keyShape}
                  //
                  key={note.noteId}
                  note={note}
                  isHighlighted={false}
                  isShapeNote={false}
                  isFlatTune={isFlatTune}
                  onHover={setActiveNoteId}
                  onLeave={() => setActiveNoteId(null)}
                  areAnimationsOn={areAnimationsOn}
                  highlightRole={"none"}
                />
              );
            })}
          </S.Keyboard>
        </div>
      </BoardWrapper>
    </BoardScrollWrapper>
  );
}
