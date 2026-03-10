import styled from "styled-components";
import {
  KEY_PADDING,
  KEY_WIDTH_CSS,
  LEFT_PADDING_FACTOR,
} from "../helpers/constants";
import { numberOfKeys } from "../helpers/constants";
import { transitionTime } from "@/store";

interface TemplateWrapperProps {
  $position: number;
}

export const TemplateWrapper = styled.div<TemplateWrapperProps>`
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
  $label: string;
  $isAltNote: boolean;
}>`
  position: relative;
  height: 20px;
  margin-bottom: 5px;
  width: ${`calc(${KEY_WIDTH_CSS(numberOfKeys)})`};
  &::before {
    content: ${({ $label, $isAltNote }) =>
      $label ? `"${$label}"` : $isAltNote ? '"★"' : '""'};
    position: absolute;
    width: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--border);
    opacity: ${({ $label, $isAltNote }) => ($label || $isAltNote ? "1" : "0")};
    top: ${({ $label, $isAltNote }) => ($label || $isAltNote ? "5px" : "30px")};
    will-change: top, opacity;
    transition: ${`top ${transitionTime}ms ease-in-out,
           opacity ${transitionTime}ms ease-in-out`};
  }
`;
