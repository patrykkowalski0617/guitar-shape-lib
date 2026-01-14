import { getNotes } from "@/utils";
import { numberOfFrets, STRINGS_FIRST_NOTES } from "./helpers/constants";
import NoteLabel from "../customUI/NoteLabel/NoteLabel";

export default function Fretboard() {
  return (
    <>
      {STRINGS_FIRST_NOTES.map((firstNote) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {getNotes({ firstNote, length: numberOfFrets }).map((_, index) => {
              return (
                <div key={index}>
                  <NoteLabel
                    isHighlighted={true}
                    index={index}
                    firstNote={firstNote}
                    isFlatKey={false}
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
