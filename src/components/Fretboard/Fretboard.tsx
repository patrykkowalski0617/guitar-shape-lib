import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { numberOfFrets, STRINGS_FIRST_NOTES } from "./helpers/constants";
import NoteLabel from "../customUI/NoteLabel/NoteLabel";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";
import { useControlsStore } from "@/store/useControlsStore";
import { transitionStepTime } from "../Keyboard/helpers/constants";

export default function Fretboard() {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;
  const { activeScaleIndices } = useActiveScale();

  return (
    <>
      {STRINGS_FIRST_NOTES.map(({ noteName, octaveNumber }, index) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }} key={`${index}-${noteName}`}>
            {getNotes({
              firstNote: noteName,
              length: numberOfFrets,
              firstOctave: octaveNumber,
            }).map(({ isEnharmonic, flatNoteName, sharpNoteName, noteId }, index) => {
              const scaleDegree = activeScaleIndices.find((s) => s.noteId === noteId);
              const isHighlighted = !!scaleDegree;
              return (
                <div
                  key={index}
                  style={{
                    margin: "3px",
                    fontSize: "12px",
                    background: isHighlighted ? "gold" : "black",
                    display: "flex",
                    justifyContent: "cener",
                    alignItems: "center",
                    transition: `${transitionStepTime}ms`,
                    width: "30px",
                  }}
                >
                  <NoteLabel
                    isHighlighted={isHighlighted}
                    index={index}
                    flatNoteName={flatNoteName}
                    sharpNoteName={sharpNoteName}
                    isFlatKey={isFlatKey}
                    orientation="horizontal"
                    isEnharmonic={isEnharmonic}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
