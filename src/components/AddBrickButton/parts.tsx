import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const AddBrickButton = styled.div<{
  $isDisabled: boolean;
}>`
  box-shadow:
    3px 3px 15px 3px color-mix(in oklab, var(--background) 65%, transparent),
    -3px -3px 15px 3px color-mix(in oklab, var(--foreground) 15%, transparent);
  border-radius: 100px;
  width: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: opacity 0.4s ease-in-out;
  svg {
    transition: filter 0.1s ease-in-out;
    color: var(--secondary);
  }

  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          svg {
            color: var(--muted);
          }
          pointer-events: none;
        `
      : css`
          &:hover {
            svg {
              filter: drop-shadow(0px 0px 4px var(--secondary));
            }
          }
        `}
`;
