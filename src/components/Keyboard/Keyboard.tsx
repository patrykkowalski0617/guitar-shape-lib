import { type JSX, useRef } from "react";
import * as S from "@/components/Keyboard/parts";
import { majorScale, NOTES_SHARP, UNIFIED_MUSIC_KEYS } from "@/utils";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import {
  BoardScrollWrapper,
  BoardWrapper,
  TutorialStickyIcons,
} from "@/components/BoardsWrapper/parts";
import KeyboardKey from "./KeyboardKey/KeyboardKey";
import { useScaleLogic } from "./helpers/useScaleLogic";
import { keyboardNotes, numberOfKeys } from "./helpers/constants";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { useKeyboardScroll } from "./helpers/useKeyboardScroll";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;
  const { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  useHorizontalScroll(scrollRef);
  useKeyboardScroll(scrollRef, [currentRoleId, currentKeyId, isMajorMode]);

  const scrollTargetId =
    keyboardNotes.find((n) => currentRoleId && currentRoleNoteIds?.includes(n.noteId))?.noteId ||
    keyboardNotes.find((n) => currentScaleNoteIds.includes(n.noteId))?.noteId;

  return (
    <BoardScrollWrapper ref={scrollRef}>
      <TutorialStickyIcons>
        <TutorialPopover {...TUTORIAL_CONTENT.KEYBOARD} />
      </TutorialStickyIcons>
      <BoardWrapper>
        <ScaleTemplate />
        <S.Keyboard $numberOfKeys={numberOfKeys}>
          {keyboardNotes.map((note) => {
            //- Key color (white/black) and shape
            const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
            const isWhiteKey = majorScale.includes(noteOctaveIndex);
            const keyShape = KEY_SHAPE_MAP[noteOctaveIndex];
            const isScrollTarget = note.noteId === scrollTargetId;

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
                data-role-highlight={isScrollTarget}
              />
            );
          })}
        </S.Keyboard>
      </BoardWrapper>
    </BoardScrollWrapper>
  );
}
