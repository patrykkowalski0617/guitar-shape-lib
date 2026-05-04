import { css } from "styled-components";
import { instrumentElBRadius } from "../Piano/PianoKey/parts/constants";

export const noteCommon = css`
  background-color: var(--foreground);
  border: 1px solid var(--border);
  color: var(--background);
  border-radius: ${instrumentElBRadius};
  width: 22px;
  height: 22px;
  line-height: 22px;
`;
