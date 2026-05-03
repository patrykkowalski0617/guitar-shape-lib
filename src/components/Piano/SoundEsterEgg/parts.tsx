import styled, { css } from "styled-components";

export const MakeItActuallyPlayable = styled.div<{ $isActive: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 50;
  height: 25px;
  &::before {
    content: ${({ $isActive }) =>
      `"Make It Actually Playable ${$isActive ? "🔊" : "🙄"}"`};
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
    ${({ $isActive }) =>
      $isActive
        ? css`
            transform: translateY(0%);
          `
        : ""};
  }

  &:hover {
    &::before {
      transform: translateY(0%);
    }
  }
`;
