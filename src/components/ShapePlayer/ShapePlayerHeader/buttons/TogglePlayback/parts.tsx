import styled, { css } from "styled-components";
import { Button as _Button } from "../../../ui/parts";

export const Button = styled(_Button)<{ $isOff: boolean }>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 3px;
    background-color: var(--background);
    transform: translate(-50%, -50%) rotate(-40deg);
    transition: width 0.2s ease-in-out;
    border-radius: 1px;
    z-index: 10;
    pointer-events: none;

    ${({ $isOff }) =>
      $isOff &&
      css`
        width: 35px;
      `}
  }
`;
