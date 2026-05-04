import { appBgColor } from "@/constants";
import styled from "styled-components";

export const FretboardRow = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    height: 1px;
    left: -50px;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    background: color-mix(in oklab, var(--foreground) 80%, var(--background));
    box-shadow: 0px 3px 2px 0px var(--background);
    z-index: 17;
  }
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(6) {
    &::before {
      height: 2px;
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
      bottom: -16px;
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
        var(--background) 100%
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
      box-shadow: 0 2px 3px 1px var(--background) inset;
    }
  }
  &:nth-child(6) > :first-child {
    &::after {
      height: 8px;
      border-radius: 0 0 3px 3px;
      box-shadow: 0 -2px 3px 1px var(--background) inset;
    }
  }
`;
