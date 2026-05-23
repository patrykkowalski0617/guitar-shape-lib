import { css } from "styled-components";
import { instrumentElBRadius } from "../Piano/constants";

export const noteCommon = css<{ $isTargetNote?: boolean }>`
  background-color: color-mix(
    in oklab,
    var(--instrument) 25%,
    var(--foreground)
  );
  border: 1px solid var(--primary);
  color: var(--background);
  border-radius: ${instrumentElBRadius};
  width: 22px;
  height: 22px;
  line-height: 22px;
  ${({ $isTargetNote }) =>
    $isTargetNote
      ? css`
          outline: 2px solid var(--warn);
        `
      : ""}
`;
