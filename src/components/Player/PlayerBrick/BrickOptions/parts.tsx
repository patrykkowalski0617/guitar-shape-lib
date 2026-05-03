import styled, { css } from "styled-components";

export const BrickOptions = styled.div<{ $isEditable: boolean }>`
  transition: opacity 0.1s ease;
  opacity: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -95%;
  right: -10px;
  padding: 2px 3px;
  z-index: 50;
  background: color-mix(in oklab, var(--background) 70%, transparent);
  gap: 5px;
  display: flex;
  border-radius: 4px;
  box-shadow:
    1px 1px 2px 0px color-mix(in oklab, var(--background) 100%, transparent)
      inset,
    -1px -1px 2px 0px color-mix(in oklab, var(--foreground) 20%, transparent)
      inset,
    3px 3px 6px 0px color-mix(in oklab, var(--background) 100%, transparent);
`;

const editButtonsCommon = css`
  height: 25px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:
    -1px -1px 4px 1px color-mix(in oklab, var(--background) 70%, transparent)
      inset,
    1px 1px 3px 0px color-mix(in oklab, var(--foreground) 20%, transparent)
      inset,
    1px 1px 4px 1px color-mix(in oklab, var(--background) 70%, transparent);
  border: 1px solid color-mix(in oklab, var(--background) 90%, var(--muted));
  border-radius: 4px;
  color: var(--background);
  &:hover {
    filter: brightness(1.2);
  }
`;

export const EditBrickButton = styled.button<{ $isEditable: boolean }>`
  ${editButtonsCommon}
  background-color: ${({ $isEditable }) =>
    $isEditable
      ? "color-mix(in oklab, var(--secondary) 100%, var(--background))"
      : "color-mix(in oklab, var(--fretboard) 90%, var(--background))"};
`;

export const DeleteBrickButton = styled.button`
  ${editButtonsCommon}
  background-color: color-mix(in oklab, var(--warn) 100%, var(--background));
`;
