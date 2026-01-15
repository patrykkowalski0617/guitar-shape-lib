import styled, { css, keyframes } from "styled-components";
import { KEY_PADDING, KEY_WIDTH_CSS, LEFT_PADDING_FACTOR } from "../helpers/constants";
import type { HighlightRole } from "../helpers/scaleLogic";
import { roleColors } from "../helpers/scaleLogic";
import { transitionTime } from "@/utils/constants";

interface MarkerProps {
  $step: number;
  $numberOfKeys: number;
  $isVisible: boolean;
  $isHarmonicMinor: boolean;
  $isHighlightRole: HighlightRole;
  $roleInterval: string;
}

interface TemplateWrapperProps {
  $firstAIndex: number;
  $numberOfKeys: number;
  $templateOffset: number;
}

const appearing = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const TemplateWrapper = styled.div<TemplateWrapperProps>`
  height: 25px;
  position: relative;
  transform: ${({ $firstAIndex, $numberOfKeys, $templateOffset }) => {
    const totalOffset = $firstAIndex + $templateOffset;

    return `translateX(calc(
      (${totalOffset} + (${KEY_PADDING} * ${LEFT_PADDING_FACTOR})) * ${KEY_WIDTH_CSS($numberOfKeys)}
    ))`;
  }};
  transition: ${transitionTime}ms ease-in-out;
`;

export const Marker = styled.div<MarkerProps>`
  animation: ${({ $isVisible }) =>
    $isVisible
      ? css`
          ${appearing} ${transitionTime}ms forwards
        `
      : "none"};
  position: absolute;
  border: 1px solid var(--border);
  bottom: 0px;
  height: 8px;
  border-radius: 4px 4px 0 0;
  background-color: ${({ $isHighlightRole }) => roleColors[$isHighlightRole]};
  width: ${({ $numberOfKeys }) => `calc(${KEY_WIDTH_CSS($numberOfKeys)})`};
  left: ${({ $step, $numberOfKeys }) => `calc(${$step} * ${KEY_WIDTH_CSS($numberOfKeys)})`};
  transition: ${transitionTime}ms ease-in-out;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  box-shadow: 0 0 8px ${({ $isHighlightRole }) => roleColors[$isHighlightRole]};
  ${({ $isHarmonicMinor }) =>
    $isHarmonicMinor &&
    css`
      transform: translateX(100%);
      background-color: var(--secondary);
      box-shadow: 0 0 5px var(--secondary);
    `}
  &::after {
    content: "${({ $roleInterval }) => $roleInterval}";
    position: absolute;
    top: -17px;
    color: ${({ $isHighlightRole }) => roleColors[$isHighlightRole]};
    text-shadow: 0 0 8px ${({ $isHighlightRole }) => roleColors[$isHighlightRole]};
    left: 0;
    right: 0;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    animation: ${appearing} ${transitionTime}ms forwards;
  }
`;
