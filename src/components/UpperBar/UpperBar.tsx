import * as S from "./parts";
import BaseChordToggle from "./BaseChordToggle/BaseChordToggle";
import ShapeSelect from "./ShapeSelect/ShapeSelect";
import ShapeCarousel from "./ShapeCarousel/ShapeCarousel";
import { Player } from "../Player/Player";
import { usePersistentLock } from "@/hooks";
import { usePlayerStore } from "@/store";

export default function UpperBar() {
  const bricks = usePlayerStore((state) => state.bricks);
  const isSectionHidden = usePersistentLock(bricks.length > 0);

  return (
    <S.Wrapper>
      <S.Section>
        <ShapeCarousel />
      </S.Section>

      <S.Section>
        <S.BaseChordToggleWrapper>
          <BaseChordToggle />
          <ShapeSelect />
        </S.BaseChordToggleWrapper>
      </S.Section>

      <S.Section $isDisabled={isSectionHidden}>
        <Player>
          <Player.ControlsWithoutConatiner />
        </Player>
      </S.Section>
    </S.Wrapper>
  );
}
