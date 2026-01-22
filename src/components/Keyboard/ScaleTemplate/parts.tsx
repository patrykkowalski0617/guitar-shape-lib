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
  $areAnimationsOn: boolean;
}

interface TemplateWrapperProps {
  $position: number;
  $numberOfKeys: number;
  $areAnimationsOn: boolean;
}

export const TemplateWrapper = styled.div<TemplateWrapperProps>`
  height: 40px;
  transform: ${({ $position, $numberOfKeys }) => {
    return `translateX(calc(
      (${$position} + (${KEY_PADDING} * ${LEFT_PADDING_FACTOR})) * ${KEY_WIDTH_CSS($numberOfKeys)}
    ))`;
  }};
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn ? `transform ${transitionTime}ms ease-in-out` : "none"};
`;

export const Marker = styled.div<MarkerProps>`
  position: absolute;
  bottom: 0px;
  height: 8px;
  border-radius: 4px 4px 0 0;
  border: 1px solid var(--border);
  width: ${({ $numberOfKeys }) => `calc(${KEY_WIDTH_CSS($numberOfKeys)})`};
  left: ${({ $step, $numberOfKeys }) => `calc(${$step} * ${KEY_WIDTH_CSS($numberOfKeys)})`};
  background-color: ${({ $highlightRole }) => roleColors[$highlightRole]};
  box-shadow: 0 0 8px ${({ $highlightRole }) => roleColors[$highlightRole]};
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn
      ? `left ${transitionTime}ms ease-in-out,
         opacity ${transitionTime}ms ease-in-out,
         background-color ${transitionTime}ms ease-in-out,
         box-shadow ${transitionTime}ms ease-in-out`
      : "none"};
  &::after {
    content: "${({ $roleInterval }) => $roleInterval}";
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    color: ${({ $highlightRole }) => roleColors[$highlightRole]};
    text-shadow: 0 0 8px ${({ $highlightRole }) => roleColors[$highlightRole]};
    opacity: ${({ $roleInterval, $isVisible }) => ($roleInterval && $isVisible ? "1" : "0")};
    top: ${({ $roleInterval }) => ($roleInterval ? "-17px" : "0px")};
    transition: ${({ $areAnimationsOn }) =>
      $areAnimationsOn
        ? `top ${transitionTime}ms ease-in-out,
           opacity ${transitionTime}ms ease-in-out,
           color ${transitionTime}ms ease-in-out`
        : "none"};
  }
`;
