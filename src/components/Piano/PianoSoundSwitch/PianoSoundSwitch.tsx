import { useControlsStore, usePlayerStore } from "@/store";
import * as S from "./parts";

export const PianoSoundSwitch = () => {
  const isActuallyPlayable = useControlsStore(
    (state) => state.isActuallyPlayable,
  );
  const toggleItIsActuallyPlayable = useControlsStore(
    (state) => state.toggleItIsActuallyPlayable,
  );
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shapeId = useControlsStore((state) => state.shapeId);

  if (isPlaying || shapeId) return null;

  return (
    <S.PianoSoundSwitch
      onClick={toggleItIsActuallyPlayable}
      $isActive={isActuallyPlayable}
    />
  );
};
