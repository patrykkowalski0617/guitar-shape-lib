import { type JSX } from "react";
import * as S from "./parts";
import { useScaleTemplate } from "./hooks/useScaleTemplate";
import { isGlobalRole as isGlobalRoleFn } from "@/utils";
import { useRoleChordsNames } from "@/hooks";

export default function ScaleTemplate(): JSX.Element {
  const { position, highlightRole, altIndexes, roleId } = useScaleTemplate();
  const isGlobalRole = isGlobalRoleFn(roleId);

  const getRoleChordName = useRoleChordsNames();

  return (
    <S.TemplateWrapper $position={position}>
      {Array.from({ length: 33 }).map((_, i) => {
        const roleRank = highlightRole.indexOf(i);
        const isRoleNote = roleRank !== -1 && !!roleId;
        const isAltNote = altIndexes.includes(i);
        const label = isRoleNote
          ? String(isGlobalRole ? getRoleChordName(i - 3) : roleRank * 2 + 1)
          : "";

        return (
          <S.Marker key={i} $step={i} $isAltNote={isAltNote} $label={label} />
        );
      })}
    </S.TemplateWrapper>
  );
}
