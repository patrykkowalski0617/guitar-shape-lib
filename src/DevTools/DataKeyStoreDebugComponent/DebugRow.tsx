import * as S from "./parts";

interface DebugRowProps {
  label: string;
  value: string | number | null;
  onSet: () => void;
  onClear: () => void;
  setActionLabel: string;
}

export const DebugRow = ({
  label,
  value,
  onSet,
  onClear,
  setActionLabel,
}: DebugRowProps) => {
  const displayValue = value ?? "NULL";

  return (
    <S.DataRow>
      <S.Label>{label}:</S.Label>
      <S.ValueBox>
        <S.ValueHighlight>{displayValue}</S.ValueHighlight>
      </S.ValueBox>
      <S.ButtonGroup>
        <S.ActionButton onClick={onSet}>{setActionLabel}</S.ActionButton>
        <S.ResetButton onClick={onClear}>Clear</S.ResetButton>
      </S.ButtonGroup>
    </S.DataRow>
  );
};
