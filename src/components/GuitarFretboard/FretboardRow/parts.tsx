import { appBgColor } from "@/constants";
import styled, { css } from "styled-components";
import { FretWrapper } from "../FretboardCell/parts";

export const FretboardRow = styled.div<{ $isVisibleString: boolean }>`
  display: flex;
  flex-direction: row;
  position: relative;

  &:first-child {
    ${FretWrapper} {
      &::before {
        content: "";
        box-shadow:
          4px 0px 5px 0px color-mix(in oklab, hsl(0, 0%, 2%) 60%, transparent),
          -1px 0px 3px 1px color-mix(in oklab, hsl(0, 0%, 2%) 80%, transparent)
            inset;
        height: 600%;
        width: 5px;
        border-radius: 2px;
        background: linear-gradient(0deg, #000 0%, #b3b3b3 70%, #000 100%);
        position: absolute;
        right: -3px;
        filter: brightness(1.2);
      }
    }

    > :first-child {
      &::before {
        width: 16px;
        right: -1.5px;
        z-index: 20;
        background-image: linear-gradient(
          90deg,
          var(--muted) 0%,
          color-mix(in oklab, var(--foreground) 70%, var(--instrument)) 10%,
          color-mix(in oklab, var(--foreground) 70%, var(--instrument)) 80%,
          hsl(0, 0%, 2%) 100%
        );
      }
    }
  }

  ${({ $isVisibleString }) =>
    $isVisibleString
      ? css`
          &::before {
            content: "";
            position: absolute;
            left: 0px;
            right: -30px;
            top: 50%;
            transform: translateY(-50%);
            display: block;
            background: color-mix(
              in oklab,
              var(--foreground) 20%,
              var(--muted)
            );
            box-shadow: 0px 5px 3px 1px hsl(0, 0%, 2%);
            z-index: 17;
          }
        `
      : ""}
  &:nth-child(1) {
    &::before {
      height: 0.5px;
    }
  }
  &:nth-child(2) {
    &::before {
      height: 0.5px;
    }
  }
  &:nth-child(3) {
    &::before {
      height: 1.5px;
      background: color-mix(in oklab, var(--foreground) 5%, var(--muted));
    }
  }
  &:nth-child(4) {
    &::before {
      height: 1.5px;
    }
  }
  &:nth-child(5) {
    &::before {
      height: 1.5px;
    }
  }
  &:nth-child(6) {
    &::before {
      height: 2px;
      background: color-mix(in oklab, var(--foreground) 5%, var(--muted));
    }
  }

  &:nth-child(1),
  &:nth-child(6) {
    &::after {
      content: "";
      background-color: ${appBgColor};
      height: 24px;
      right: -15px;
      left: 10px;
      z-index: 16;
      position: absolute;
    }
  }

  &:nth-child(1) {
    &::after {
      top: -15px;
    }
  }

  &:nth-child(6) {
    &::after {
      bottom: -2px;
      height: 5px;
    }
  }
  &:nth-child(6) > :first-child {
    &::after {
      height: 8px;
      border-radius: 0 0 3px 3px;
      box-shadow: 0 -2px 3px 1px hsl(0, 0%, 2%) inset;
    }
  }

  > :first-child {
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 16px;
      z-index: 20;
      height: 28px;
      right: -1.5px;
      background-image: linear-gradient(
        90deg,
        var(--muted) 0%,
        color-mix(in oklab, var(--foreground) 70%, var(--instrument)) 10%,
        color-mix(in oklab, var(--foreground) 70%, var(--instrument)) 80%,
        hsl(0, 0%, 2%) 100%
      );
    }

    &::before {
      bottom: 18px;
    }

    &::after {
      top: 18px;
    }
  }

  &:first-child > :first-child {
    &::before {
      height: 8px;
      border-radius: 3px 3px 0 0;
      box-shadow: 0 2px 3px 1px hsl(0, 0%, 2%) inset;
    }
  }
`;
