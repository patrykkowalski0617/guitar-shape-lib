import BaseChordToggle from "./Key_ChordToggle/Key_ChordToggle";
import * as S from "./parts";
import ShapeSelect from "./ShapeSelect/ShapeSelect";

export const Key_Chord_ShapeToggle = () => {
  return (
    <S.Key_Chord_ShapeToggleWrapper>
      <BaseChordToggle />
      <ShapeSelect />
    </S.Key_Chord_ShapeToggleWrapper>
  );
};
