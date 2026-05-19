import { useShapePicker } from "./hooks/useShapePicker";
import * as S from "./parts";

export default function ShapePicker() {
  const {
    options,
    selectedChordLabel,
    isShapePickerExpanded,
    handleSelectShape,
  } = useShapePicker();

  if (!isShapePickerExpanded) return null;

  return (
    <S.Wrapper>
      <S.InfoText>
        Choose a guitarShape to solo over the {selectedChordLabel} chord
      </S.InfoText>
      <S.List>
        {options?.map((option) => (
          <S.ListItem
            key={option.value}
            onClick={() => handleSelectShape(option.value)}
          >
            <S.RootNote>{option.labelRootNote}</S.RootNote>
            <S.ShapeName>{option.labelShapeName}</S.ShapeName>
          </S.ListItem>
        ))}
      </S.List>
    </S.Wrapper>
  );
}
