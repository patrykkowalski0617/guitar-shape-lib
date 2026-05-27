import { color, duration, elementBase, hoverGlowBorder } from "@/components/ui";
import styled from "styled-components";

export const Item = styled.button<{ $w: number }>`
  ${elementBase}
  min-width: 75px;
  width: 75px;
  border-color: transparent;
  border-radius: 0;
  position: relative;
  color: ${color.void};
  ${hoverGlowBorder}
  &:hover {
    z-index: 1;
  }
  &:first-child {
    background-color: ${color.void};
    &:hover {
      border-color: transparent;
      animation: none;
    }
    position: sticky;
    left: 0;
    z-index: 2;
    background-color: ${color.void};
    color: ${color.fg};
  }
`;

export const Row = styled.div<{ $isCurrent?: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  &:hover {
    ${Item} {
      background-color: ${color.surfaceHigh};
      &:first-child {
        background-color: var(--voidHigh);
      }
    }
    background-color: ${color.surfaceHigh};
  }
  &:first-child {
    background-color: ${color.secondary};
    ${Item} {
      background-color: ${color.secondary} !important;
      color: ${color.void};
      font-weight: bolder;
      &:hover {
        border-color: transparent;
        animation: none;
      }
    }
    > :first-child {
      transition: background ${duration.base};
      &:hover {
        background-color: ${color.bg} !important;
      }
    }
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: ${color.secondary};
  }
`;

export const Chord = styled.div``;
export const Key = styled.div``;
