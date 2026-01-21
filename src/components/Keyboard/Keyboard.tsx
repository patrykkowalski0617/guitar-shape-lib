import { type JSX } from "react";
import * as S from "@/components/Keyboard/parts";
import { majorScale, NOTES_SHARP, UNIFIED_MUSIC_KEYS } from "@/utils";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useTutorialHover } from "@/components/TutorialBox/helpers/useTutorialHover";
import { BoardScrollWrapper, BoardWrapper } from "@/components/customUI/Boards/parts";
import KeyboardKey from "./KeyboardKey/KeyboardKey";
import { useScaleLogic } from "./helpers/useScaleLogic";
import { keyboardNotes, numberOfKeys } from "./helpers/constants";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";

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
  const currentRoleId = useControlsStore((state) => state.currentRoleId);

  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;

  const tutorialHover_keyboard = useTutorialHover("keyboard");
  const tutorialHover_scaleTemplate = useTutorialHover("scale-template");

  const { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  return (
    <BoardScrollWrapper>
      <div {...tutorialHover_keyboard}>
        <BoardWrapper>
          <div {...tutorialHover_scaleTemplate}>
            <ScaleTemplate />
          </div>
          <S.Keyboard $numberOfKeys={numberOfKeys}>
            {keyboardNotes.map((note) => {
              //- Key color (white/black) and shape
              const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
              const isWhiteKey = majorScale.includes(noteOctaveIndex);
              const keyShape = KEY_SHAPE_MAP[noteOctaveIndex];

              return (
                <KeyboardKey
                  key={note.noteId}
                  //- sync hover effect between fretboard nad keyboard
                  isActive={note.noteId === activeNoteId}
                  //- Key color (white/black) and shape
                  isWhiteKey={isWhiteKey}
                  keyShape={keyShape}
                  //- specic states
                  isHighlighted={currentScaleNoteIds.includes(note.noteId)}
                  highlightRole={
                    currentRoleId && currentRoleNoteIds?.includes(note.noteId)
                      ? currentRoleId
                      : "none"
                  }
                  //
                  noteId={note.noteId}
                  areAnimationsOn={areAnimationsOn}
                  //- for NoteLabel only
                  isFlatTune={isFlatTune}
                  isShapeNote={currentShapeNoteIds.includes(note.noteId)}
                  flatNoteName={note.flatNoteName}
                  sharpNoteName={note.sharpNoteName}
                  isEnharmonic={note.isEnharmonic}
                  //- actions
                  onHover={setActiveNoteId}
                  onLeave={() => setActiveNoteId(null)}
                />
              );
            })}
          </S.Keyboard>
        </BoardWrapper>
      </div>
    </BoardScrollWrapper>
  );
}
