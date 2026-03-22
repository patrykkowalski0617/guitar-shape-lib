import { type JSX } from "react";
import * as S from "./parts";
import { useScaleTemplate } from "./hooks/useScaleTemplate";
import { useBaseChordsNames } from "@/hooks";

export default function ScaleTemplate(): JSX.Element {
  const { position, highlightRole, altIndexes, baseChordId } =
    useScaleTemplate();
  const getBaseChordName = useBaseChordsNames();

  return (
    <S.TemplateWrapper $position={position}>
      {Array.from({ length: 33 }).map((_, i) => {
        const roleRank = highlightRole.indexOf(i);
        const isRoleNote = roleRank !== -1 && !!baseChordId;
        const isAltNote = altIndexes.includes(i);

        const label = isRoleNote
          ? String(
              baseChordId
                ? roleRank * 2 + 1
                : getBaseChordName({ semitoneOffsetFromMajorScaleRoot: i - 3 }),
            )
          : "";

        return (
          <S.Marker key={i} $step={i} $isAltNote={isAltNote} $label={label} />
        );
      })}
    </S.TemplateWrapper>
  );
}
