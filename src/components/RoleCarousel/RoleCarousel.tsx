import { BASE_CHORDS } from "@/data";
import { useControllersStore } from "@/store";
import { MiniCarousel } from "../ui/MiniCarousel/MiniCarousel";

const RoleCarousel = () => {
  const activeChordId = useControllersStore((state) => state.baseChordDataKey);
  const chordKeys = Object.keys(BASE_CHORDS);

  return (
    <MiniCarousel
      items={chordKeys}
      activeId={activeChordId}
      label="Functions"
      activeLabel="Current Function"
      getItemId={(key) => key}
      renderItem={(key) => {
        const chord = BASE_CHORDS[key as keyof typeof BASE_CHORDS];
        return (
          <>
            {chord.roleName} ({chord.modeExtendedName})
          </>
        );
      }}
    />
  );
};

export default RoleCarousel;
