import { BASE_CHORDS_MAP } from "@/data";
import { useControlsStore, useMusicStore } from "@/store";

export const useBaseChordSetter = () => {
  // const setRoleId = useControlsStore((state) => state.setRoleId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);

  const setBaseChordId = (BASE_CHORDS_MAP_INDEX: number) => {
    console.log(BASE_CHORDS_MAP_INDEX);

    setActiveNoteId(null);
    if (BASE_CHORDS_MAP_INDEX === -1) {
      // setRoleId("all-matching-key");
      setIsMajorMode(true);
      setShapeVariantLocationData(null);
    } else {
      // setRoleId(BASE_CHORDS_MAP[BASE_CHORDS_MAP_INDEX].role);
      setIsMajorMode(BASE_CHORDS_MAP[BASE_CHORDS_MAP_INDEX].isMajorMode);
    }
  };

  return setBaseChordId;
};
