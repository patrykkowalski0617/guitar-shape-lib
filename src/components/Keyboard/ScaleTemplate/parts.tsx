import styled from "styled-components";
import { KEY_PADDING, KEY_WIDTH_CSS, LEFT_PADDING_FACTOR } from "../helpers/constants";
import type { HighlightRole } from "../helpers/scaleLogic";
import { roleColors } from "../helpers/scaleLogic";
import { transitionTime } from "@/utils/constants";

interface MarkerProps {
  $step: number;
  $numberOfKeys: number;
  $isVisible: boolean;
  $isHighlightRole: HighlightRole;
  $roleInterval: string;
}

interface TemplateWrapperProps {
  $firstAIndex: number;
  $numberOfKeys: number;
  $templateOffset: number;
}

export const TemplateWrapper = styled.div<TemplateWrapperProps>`
  height: 20px;
  position: relative;
  transform: ${({ $firstAIndex, $numberOfKeys, $templateOffset }) => {
    const totalOffset = $firstAIndex + $templateOffset;

    return `translateX(calc(
      (${totalOffset} + (${KEY_PADDING} * ${LEFT_PADDING_FACTOR})) * ${KEY_WIDTH_CSS($numberOfKeys)}
    ))`;
  }};
  transition: transform ${transitionTime}ms ease-in-out;
`;

export const Marker = styled.div<MarkerProps>`
  position: absolute;
  bottom: 0px;
  height: 8px;
  border-radius: 4px 4px 0 0;
  border: 1px solid var(--border);
  width: ${({ $numberOfKeys }) => `calc(${KEY_WIDTH_CSS($numberOfKeys)})`};
  left: ${({ $step, $numberOfKeys }) => `calc(${$step} * ${KEY_WIDTH_CSS($numberOfKeys)})`};
  background-color: ${({ $isHighlightRole }) => roleColors[$isHighlightRole]};
  box-shadow: 0 0 8px ${({ $isHighlightRole }) => roleColors[$isHighlightRole]};
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  transition: left ${transitionTime}ms ease-in-out, opacity ${transitionTime}ms ease-in-out,
    background-color ${transitionTime}ms ease-in-out, box-shadow ${transitionTime}ms ease-in-out;
  &::after {
    content: "${({ $roleInterval }) => $roleInterval}";
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    color: ${({ $isHighlightRole }) => roleColors[$isHighlightRole]};
    text-shadow: 0 0 8px ${({ $isHighlightRole }) => roleColors[$isHighlightRole]};
    opacity: ${({ $roleInterval, $isVisible }) => ($roleInterval && $isVisible ? "1" : "0")};
    top: ${({ $roleInterval }) => ($roleInterval ? "-17px" : "0px")};
    transition: top ${transitionTime}ms ease-in-out, opacity ${transitionTime}ms ease-in-out,
      color ${transitionTime}ms ease-in-out;
  }
`;
