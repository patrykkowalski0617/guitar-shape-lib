import { getNotes } from "@/utils";

export interface UnifiedNote {
  display: string; // np. "C#/Db"
  variants: string[]; // ["C#", "Db"]
}

export const getUnifiedNotes = (length: number): UnifiedNote[] => {
  const sharps = getNotes({ firstNote: "A", length, isFlatKey: false });
  const flats = getNotes({ firstNote: "A", length, isFlatKey: true });

  return sharps.map((sharp, i) => {
    const flat = flats[i];

    // Jeśli nazwy są identyczne (np. "A"), wyświetlamy jedną.
    // Jeśli różne (np. "C#" i "Db"), łączymy je.
    const display = sharp === flat ? sharp : `${sharp}/${flat}`;

    return {
      display,
      variants: Array.from(new Set([sharp, flat])), // Usuwamy duplikaty
    };
  });
};
