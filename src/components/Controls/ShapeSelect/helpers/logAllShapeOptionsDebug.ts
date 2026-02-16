import { shapes, type Shapes, roles, type RoleId, UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredShapeOptions } from "./shapeHelpers";

type UnifiedKeyId = keyof typeof UNIFIED_MUSIC_KEYS;

export const logAllShapeOptionsDebug = () => {
  const configs = [
    { isMajor: true, key: "C" as UnifiedKeyId, label: "MAJOR (C)" },
    { isMajor: false, key: "C" as UnifiedKeyId, label: "MINOR (Am)" },
  ] as const;

  const roleIds = Object.keys(roles) as RoleId[];

  console.group("🔍 SHAPE SELECTION DEBUG DUMP");

  configs.forEach(({ isMajor, key, label }) => {
    console.group(`🎼 MODE: ${label}`);

    const keyNotes = getNotes({ firstNote: key }).map(({ sharpNoteName, flatNoteName }) =>
      UNIFIED_MUSIC_KEYS[key].isFlatTune ? flatNoteName : sharpNoteName,
    );

    roleIds.forEach((roleId) => {
      const rawOptions = getFilteredShapeOptions(roleId, isMajor);
      const roleLabel = roles[roleId].label;

      if (rawOptions.length === 0) return;

      console.group(`${roleLabel}`);

      rawOptions.forEach(({ shapeId, offset }) => {
        const shape = shapes[shapeId as keyof Shapes];
        const rootNote = keyNotes[offset % 12];

        console.log(
          `%c${rootNote}%c ${shape.label} %c${shape.type}%c`,
          "color: #f59e0b; font-weight: bold; font-size: 1.1em",
          "color: inherit; font-weight: bold",
          "color: #10b981",
          "color: #6b7280; font-size: 0.8em",
        );
      });

      console.groupEnd();
    });

    console.groupEnd();
  });

  console.groupEnd();
};
