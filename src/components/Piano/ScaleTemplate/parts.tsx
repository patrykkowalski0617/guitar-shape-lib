import styled from "styled-components";
import { KEY_PADDING, KEY_WIDTH_CSS, LEFT_PADDING_FACTOR } from "../helpers/constants";
import { transitionTime } from "@/utils/constants";
import type { HighlightRole } from "../../../utils/roleColors";
import { roleColors } from "../../../utils/roleColors";

interface MarkerProps {
  $step: number;
  $numberOfKeys: number;
  $isVisible: boolean;
  $highlightRole: HighlightRole;
  $roleInterval: string;
}

interface TemplateWrapperProps {
  $position: number;
  $numberOfKeys: number;
}

export const TemplateWrapper = styled.div<TemplateWrapperProps>`
  height: 27px;
  transform: ${({ $position, $numberOfKeys }) => {
    return `translateX(calc(
      (${$position} + (${KEY_PADDING} * ${LEFT_PADDING_FACTOR})) * ${KEY_WIDTH_CSS($numberOfKeys)}
    ))`;
  }};
  will-change: transform;
  transition: transform ${transitionTime}ms ease-in-out;
`;

export const Marker = styled.div<MarkerProps>`
  position: absolute;
  bottom: 0px;
  height: 8px;
  border-radius: 4px 4px 0 0;
  border: 1px solid var(--border);
  border-bottom: none;
  width: ${({ $numberOfKeys }) => `calc(${KEY_WIDTH_CSS($numberOfKeys)})`};
  left: ${({ $step, $numberOfKeys }) => `calc(${$step} * ${KEY_WIDTH_CSS($numberOfKeys)})`};
  background-color: ${({ $highlightRole }) => roleColors[$highlightRole]};
  box-shadow: 0 0 6px ${({ $highlightRole }) => roleColors[$highlightRole]};
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  will-change: left, opacity, background-color, box-shadow;
  transition: ${`left ${transitionTime}ms ease-in-out,
         opacity ${transitionTime}ms ease-in-out,
         background-color ${transitionTime}ms ease-in-out,
         box-shadow ${transitionTime}ms ease-in-out`};
  &::after {
    content: "${({ $roleInterval }) => $roleInterval}";
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    font-weight: 800;
    color: var(--accent);

    opacity: ${({ $roleInterval, $isVisible }) => ($roleInterval && $isVisible ? "1" : "0")};
    top: ${({ $roleInterval }) => ($roleInterval ? "-23px" : "0px")};
    will-change: top, opacity;
    transition: ${`top ${transitionTime}ms ease-in-out,
           opacity ${transitionTime}ms ease-in-out`};
  }
`;
