import * as S from "./parts";
import ShapeCarousel from "../ShapeCarousel/ShapeCarousel";
import { Player } from "../Player/Player";
import { Key_Chord_ShapeToggle } from "@/components/Key_Chord_ShapeToggle/Key_Chord_ShapeToggle";
import RoleCarousel from "../RoleCarousel/RoleCarousel";

export default function UpperControlsBar() {
  return (
    <S.Wrapper>
      <S.Section>
        <Key_Chord_ShapeToggle />
      </S.Section>

      <S.Section>
        <RoleCarousel />
      </S.Section>
      <S.Section>
        <ShapeCarousel />
      </S.Section>
      <S.Section>
        <Player>
          <Player.BasicControls />
        </Player>
      </S.Section>
    </S.Wrapper>
  );
}
