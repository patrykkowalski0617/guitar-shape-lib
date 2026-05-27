import { Button as _Button, breakPoint, space } from "@/components/ui";
import styled, { css } from "styled-components";

export const Button = styled(_Button)`
  position: fixed;
  z-index: 99;
  top: ${space._1};
  right: ${space._1};
  ${breakPoint.desktop(css`
    position: static;
  `)}
`;
