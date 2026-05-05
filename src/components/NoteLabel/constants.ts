import { css } from "styled-components";
import { instrumentElBRadius } from "../Piano/PianoKey/parts/constants";

export const noteCommon = css<{ $isSelected?: boolean }>`
  background-color: color-mix(
    in oklab,
    var(--instrument) 25%,
    var(--foreground)
  );
  border: 2px solid var(--border);
  color: var(--background);
  border-radius: ${instrumentElBRadius};
  width: 22px;
  height: 22px;
  line-height: 22px;
  ${({ $isSelected }) =>
    $isSelected
      ? css`
          outline: 2px solid var(--warn);
        `
      : ""}
`;
