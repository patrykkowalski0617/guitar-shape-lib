import { type JSX, useRef } from "react";
import * as S from "@/components/Piano/parts";
import { majorScale, NOTES_SHARP, UNIFIED_MUSIC_KEYS } from "@/utils";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { InstrumentScrollWrapper, InstrumentWrapper, TutorialStickyIcons } from "@/parts";
import PianoKey from "./PianoKey/PianoKey";
import { useScaleLogic } from "./helpers/useScaleLogic";
import { pianoNotes, numberOfKeys } from "./helpers/constants";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

const TYPE_OF_PIANO_KEY_SHAPE_MAP: Record<number, S.KeyShape> = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B",
};

export default function Piano(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;
  const { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds } = useScaleLogic();

  useHorizontalScroll(scrollRef);

  const scrollTargetId =
    pianoNotes.find((n) => currentRoleId && currentRoleNoteIds?.includes(n.noteId))?.noteId ||
    pianoNotes.find((n) => currentScaleNoteIds.includes(n.noteId))?.noteId;

  return (
    <InstrumentScrollWrapper ref={scrollRef}>
      <TutorialStickyIcons>
        <TutorialPopover {...TUTORIAL_CONTENT.KEYBOARD} />
      </TutorialStickyIcons>
      <InstrumentWrapper>
        <ScaleTemplate />
        <S.Piano $numberOfKeys={numberOfKeys}>
          {pianoNotes.map((note) => {
            //- Key color (white/black) and shape
            const noteOctaveIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
            const isWhitePianoKey = majorScale.includes(noteOctaveIndex);
            const pianoKeyShape = TYPE_OF_PIANO_KEY_SHAPE_MAP[noteOctaveIndex];
            const isScrollTarget = note.noteId === scrollTargetId;

            return (
              <PianoKey
                key={note.noteId}
                //- sync hover effect between fretboard nad piano
                isActive={note.noteId === activeNoteId}
                //- Key color (white/black) and shape
                isWhitePianoKey={isWhitePianoKey}
                pianoKeyShape={pianoKeyShape}
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
        </S.Piano>
      </InstrumentWrapper>
    </InstrumentScrollWrapper>
  );
}
