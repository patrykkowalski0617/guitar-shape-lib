import styled from "styled-components";
import { KEY_PADDING, KEY_WIDTH_CSS, LEFT_PADDING_FACTOR } from "../helpers/constants";
import { numberOfKeys } from "../helpers/constants";
import { transitionTime } from "@/data/constants";

interface TemplateWrapperProps {
  $position: number;
}

export const TemplateWrapper = styled.div<TemplateWrapperProps>`
  height: 27px;
  transform: ${({ $position }) => {
    return `translateX(calc(
      (${$position} + (${KEY_PADDING} * ${LEFT_PADDING_FACTOR})) * ${KEY_WIDTH_CSS(numberOfKeys)}
    ))`;
  }};
  will-change: transform;
  transition: transform ${transitionTime}ms ease-in-out;
  display: flex;
`;

export const Marker = styled.div<{
  $step: number;
  $roleInterval: string;
  $isAltNote: boolean;
}>`
  position: relative;
  height: 20px;
  width: ${`calc(${KEY_WIDTH_CSS(numberOfKeys)})`};
  overflow: hidden;
  &::before {
    content: ${({ $roleInterval, $isAltNote }) => ($roleInterval ? `"${$roleInterval}"` : $isAltNote ? '"!"' : '""')};
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    font-weight: 800;
    color: var(--border);
    opacity: ${({ $roleInterval, $isAltNote }) => ($roleInterval || $isAltNote ? "1" : "0")};
    top: ${({ $roleInterval, $isAltNote }) => ($roleInterval || $isAltNote ? "5px" : "30px")};
    will-change: top, opacity;
    transition: ${`top ${transitionTime}ms ease-in-out,
           opacity ${transitionTime}ms ease-in-out`};
  }
`;
