import { type JSX } from "react";
import * as S from "@/components/Keyboard/parts";
import { UNIFIED_MUSIC_KEYS, NOTES_SHARP } from "@/utils";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useTutorialHover } from "@/components/TutorialBox/helpers/useTutorialHover";
import { notes, numberOfKeys } from "@/components/Keyboard/helpers/constants";
import { BoardScrollWrapper, BoardWrapper } from "@/components/customUI/Boards/parts";
import KeyboardKey from "./KeyboardKey/KeyboardKey";
import { useScaleLogic } from "./helpers/useScaleLogic";

export default function Keyboard(): JSX.Element {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  const tutorialHover_keyboard = useTutorialHover("keyboard");

  useScaleLogic();
  return (
    <BoardScrollWrapper>
      <BoardWrapper>
        <div {...tutorialHover_keyboard}>
          <S.Keyboard $numberOfKeys={numberOfKeys}>
            {notes.map((note) => {
              const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
              return (
                <KeyboardKey
                  key={note.noteId}
                  note={note}
                  noteOctaveIndex={noteOctaveIndex}
                  isHighlighted={false}
                  isShapeNote={false}
                  isFlatKey={isFlatKey}
                  activeNoteId={activeNoteId}
                  onHover={setActiveNoteId}
                  onLeave={() => setActiveNoteId(null)}
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
