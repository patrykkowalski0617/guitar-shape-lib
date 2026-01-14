import { getNotes } from "@/utils";
import { numberOfFrets, STRINGS_FIRST_NOTES } from "./helpers/constants";
import NoteLabel from "../customUI/NoteLabel/NoteLabel";

export default function Fretboard() {
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
              return (
                <div key={index} style={{ height: "60px", margin: "5px" }}>
                  {noteId}
                  <NoteLabel
                    isHighlighted={true}
                    index={index}
                    flatNoteName={flatNoteName}
                    sharpNoteName={sharpNoteName}
                    isFlatKey={false}
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
