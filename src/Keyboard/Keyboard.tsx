import { type JSX } from "react";
import * as S from "@/components/Keyboard/parts";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
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
              return (
                <KeyboardKey
                  isActive={note.noteId === activeNoteId}
                  //
                  key={note.noteId}
                  note={note}
                  isHighlighted={false}
                  isShapeNote={false}
                  isFlatKey={isFlatKey}
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
