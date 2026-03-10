import { type JSX } from "react";
import * as S from "./parts";
import { useScaleTemplate } from "./hooks/useScaleTemplate";
import { useRoleChordsNames } from "./hooks/useRoleChordsNames";
import { isGlobalRole as isGlobalRoleFn } from "@/utils";

export default function ScaleTemplate(): JSX.Element {
  const { position, highlightRole, altIndexes, roleId } = useScaleTemplate();
  const isGlobalRole = isGlobalRoleFn(roleId);

  const getRoleChordsName = useRoleChordsNames();

  return (
    <S.TemplateWrapper $position={position}>
      {Array.from({ length: 33 }).map((_, i) => {
        const roleRank = highlightRole.indexOf(i);
        const isRoleNote = roleRank !== -1 && !!roleId;
        const isAltNote = altIndexes.includes(i);
        const intervalValue = isRoleNote
          ? String(isGlobalRole ? getRoleChordsName(i - 3) : roleRank * 2 + 1)
          : "";

        return (
          <S.Marker
            key={i}
            $step={i}
            $isAltNote={isAltNote}
            $roleInterval={intervalValue}
          />
        );
      })}
    </S.TemplateWrapper>
  );
}
