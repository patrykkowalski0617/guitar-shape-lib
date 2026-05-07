import { insetShadow } from "@/constants";
import { css } from "styled-components";

export const shapeExplorerCommon = css`
  ${insetShadow}
  height: 40px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;
