import { getNotes } from "@/utils";
import { useEnharmonicNoteName } from "./useEnharmonicNoteName";
import type { Note } from "@/data";

export const useRoleMarkers = (tuneKeyId: Note) => {
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const tuneNotes = getNotes({ firstNote: tuneKeyId });
  const enharmonicTuneNotesNames = tuneNotes.map((note) =>
    getEnharmonicNoteName(note),
  );
  const roleMarkersMap = {
    major: {
      tonic: {
        roleName: "Tonic",
        chordName: enharmonicTuneNotesNames[0],
      },
      subdominant: {
        roleName: "Subdominant",
        chordName: enharmonicTuneNotesNames[5],
      },
      dominant: {
        roleName: "Dominant",
        chordName: enharmonicTuneNotesNames[7],
      },
    },
    minor: {
      tonic: {
        roleName: "Tonic",
        chordName: enharmonicTuneNotesNames[9] + "m",
      },
      subdominant: {
        roleName: "Subdominant",
        chordName: enharmonicTuneNotesNames[2] + "m",
      },
      dominant: {
        roleName: "Dominant",
        chordName: enharmonicTuneNotesNames[4],
      },
    },
  };

  return roleMarkersMap;
};
