import { type JSX } from "react";
import * as S from "./parts";
import { useScaleTemplate } from "./helpers/useScaleTemplate";

export default function ScaleTemplate(): JSX.Element {
  const { position, highlightRole, altIndexes, currentRoleId } = useScaleTemplate();

  return (
    <S.TemplateWrapper $position={position}>
      {Array.from({ length: 33 }).map((_, i) => {
        const roleRank = highlightRole.indexOf(i);
        const isRoleNote = roleRank !== -1 && !!currentRoleId;
        const isAltNote = altIndexes.includes(i);
        const intervalValue = isRoleNote ? String(roleRank * 2 + 1) : "";

        return <S.Marker key={i} $step={i} $isAltNote={isAltNote} $roleInterval={intervalValue} />;
      })}
    </S.TemplateWrapper>
  );
}
