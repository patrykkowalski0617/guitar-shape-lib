import styled from "styled-components";
import { instrumentBRadius } from "../Piano/PianoKey/parts/constants";

export const MakeItActuallyPlayable = styled.div<{ $isActive: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 50;
  height: 18px;
  width: 100%;
  &::before {
    content: ${({ $isActive }) =>
      `"Make it actually playable ${$isActive ? "🔊" : "🙄"}"`};
    box-shadow: 0px 10px 10px 0px
      color-mix(in oklab, var(--background) 80%, transparent);
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-110%);
    background-color: var(--background);
    padding: 0 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 13px;
    font-weight: 500;
    border-radius: ${instrumentBRadius};
  }

  &:hover {
    &::before {
      transform: translateY(0%);
    }
  }
`;
