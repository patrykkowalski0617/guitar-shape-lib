import { getNotes } from "@/utils";
import { useEnharmonicNoteName } from "./enharmonicNoteName/useEnharmonicNoteName";
import type { NoteName } from "@/data";

export const useRoleMarkers = (unifiedMusicKeysDataKey: NoteName) => {
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const tuneNotes = getNotes({ firstNote: unifiedMusicKeysDataKey });
  const enharmonicTuneNotesNames = tuneNotes.map((noteObject) =>
    getEnharmonicNoteName(noteObject),
  );
  const roleMarkersMap = {
    major: {
      BaseChord6: {
        roleName: "BaseChord1",
        chordName: enharmonicTuneNotesNames[0],
      },
      BaseChord2nant: {
        roleName: "BaseChord4nant",
        chordName: enharmonicTuneNotesNames[5],
      },
      dominant: {
        roleName: "BaseChord5nant",
        chordName: enharmonicTuneNotesNames[7],
      },
    },
    minor: {
      BaseChord6: {
        roleName: "BaseChord1",
        chordName: enharmonicTuneNotesNames[9] + "m",
      },
      BaseChord2nant: {
        roleName: "BaseChord4nant",
        chordName: enharmonicTuneNotesNames[2] + "m",
      },
      dominant: {
        roleName: "BaseChord5nant",
        chordName: enharmonicTuneNotesNames[4],
      },
    },
  };

  return roleMarkersMap;
};
