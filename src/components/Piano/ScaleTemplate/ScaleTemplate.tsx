import { type JSX } from "react";
import * as S from "./parts";
import { numberOfKeys } from "../helpers/constants";
import { useScaleTemplate } from "./helpers/useScaleTemplate";

export default function ScaleTemplate(): JSX.Element {
  const { position, visibleIndexes, highlightRole, currentRoleId } = useScaleTemplate();

  return (
    <S.TemplateWrapper $numberOfKeys={numberOfKeys} $position={position}>
      {Array.from({ length: 33 }).map((_, i) => {
        const roleIndex = highlightRole.indexOf(i);
        const isHighlighted = roleIndex !== -1 && !!currentRoleId;
        const intervalValue = isHighlighted ? roleIndex * 2 + 1 : null;
        const isVisible = visibleIndexes.includes(i);

        return (
          <S.Marker
            key={i}
            $step={i}
            $numberOfKeys={numberOfKeys}
            $isVisible={isVisible}
            $highlightRole={isHighlighted ? currentRoleId : "none"}
            $roleInterval={intervalValue ? String(intervalValue) : ""}
          />
        );
      })}
    </S.TemplateWrapper>
  );
}
