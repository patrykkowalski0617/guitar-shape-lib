import { Music } from "lucide-react";
import * as S from "./parts";
import { playerIconSize } from "../../constants";
import { useControlsStore } from "@/store";

export const ToggleSynthButton = () => {
  const togglePlayBackingtrack = useControlsStore(
    (state) => state.togglePlayBackingtrack,
  );
  const playBackingtrack = useControlsStore((state) => state.playBackingtrack);

  const handleClick = () => {
    togglePlayBackingtrack();
  };

  // Logika: jeśli backing track jest wyłączony, pokazujemy przekreślenie
  const isOff = !playBackingtrack;

  return (
    <S.ToggleSynthButton
      variant={"playerSolid"}
      onClick={handleClick}
      $isOff={isOff}
    >
      <Music
        size={playerIconSize}
        stroke="var(--background)"
        strokeWidth={2.5}
      />
    </S.ToggleSynthButton>
  );
};
