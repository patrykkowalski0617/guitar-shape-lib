import { usePlayerStore } from "@/store";
import { AddToList } from "./AddToList/AddToList";
import * as S from "./parts";
import { FullscreenButton } from "./FullscreenButtons/FullscreenButtons";

export default function FretboardControls() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    !isPlaying && (
      <S.ControlContainer>
        <S.ControlContainerSection>
          <FullscreenButton />
        </S.ControlContainerSection>
        <S.ControlContainerSection>
          <AddToList />
        </S.ControlContainerSection>
      </S.ControlContainer>
    )
  );
}
