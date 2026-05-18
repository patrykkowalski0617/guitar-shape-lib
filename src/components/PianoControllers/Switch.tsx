import * as S from "./parts";

interface SwitchProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  glowColor?: string;
}

export const Switch = ({
  label,
  isActive,
  onClick,
  glowColor = "var(--secondary)",
}: SwitchProps) => {
  return (
    <S.ControlWrapper>
      <S.SwitchContainer
        $isActive={isActive}
        onClick={onClick}
        style={{ "--glow-color": glowColor } as React.CSSProperties}
      />
      <S.LabelBox>
        <S.LabelText>{label}</S.LabelText>
      </S.LabelBox>
    </S.ControlWrapper>
  );
};
