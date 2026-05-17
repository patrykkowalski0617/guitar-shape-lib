import { Music } from "lucide-react";
import { useControlsStore } from "@/store";
import * as S from "./parts";

export const TogglePlayback = () => {
  const togglePlayBackingtrack = useControlsStore(
    (state) => state.togglePlayBackingtrack,
  );
  const playback = useControlsStore((state) => state.playback);

  const handleClick = () => {
    togglePlayBackingtrack();
  };

  const isOff = !playback;

  return (
    <S.Button onClick={handleClick} $isOff={isOff}>
      <Music stroke="var(--background)" strokeWidth={2.5} />
    </S.Button>
  );
};
