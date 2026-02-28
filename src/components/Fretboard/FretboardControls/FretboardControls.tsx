import { usePlayerStore } from "@/store";
import { AddToList } from "./AddToList/AddToList";
import { LockShapeButton } from "./LockShapeButton/LockShapeButton";
import * as S from "./parts";
import { RandomizeControls } from "./RandomizeControls/RandomizeControls";
import ColorsPresets from "./ColorsPresets/ColorsPresets";
import { FullscreenButton, FullscreenRotateButton } from "./FullscreenButtons/FullscreenButtons";

export default function FretboardControls() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    !isPlaying && (
      <S.ControlContainer>
        <S.ControlContainerSection>
          <ColorsPresets />
          <FullscreenButton />
          <FullscreenRotateButton />
        </S.ControlContainerSection>
        <S.ControlContainerSection>
          <LockShapeButton />
          <AddToList />
          <RandomizeControls />
        </S.ControlContainerSection>
      </S.ControlContainer>
    )
  );
}
