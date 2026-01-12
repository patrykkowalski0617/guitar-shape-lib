import styled, { css } from "styled-components";
import { KEY_PADDING, KEY_WIDTH_CSS, LEFT_PADDING_FACTOR } from "../constants";

interface MarkerProps {
  $step: number;
  $numberOfKeys: number;
  $isVisible: boolean;
  $isHarmonicG: boolean;
}

interface TemplateWrapperProps {
  $firstAIndex: number;
  $numberOfKeys: number;
  $templateOffset: number;
}

export const TemplateWrapper = styled.div<TemplateWrapperProps>`
  height: 15px;
  position: relative;
  transform: ${({ $firstAIndex, $numberOfKeys, $templateOffset }) => {
    const totalOffset = $firstAIndex + $templateOffset;

    return `translateX(calc(
      (${totalOffset} + (${KEY_PADDING} * ${LEFT_PADDING_FACTOR})) * ${KEY_WIDTH_CSS($numberOfKeys)}
    ))`;
  }};
  transition: transform 1s ease-in-out;
`;
export const Marker = styled.div<MarkerProps>`
  position: absolute;
  bottom: 0px;
  height: 15px;
  border-radius: 5px;
  border: 2px solid white;
  background-color: black;
  width: ${({ $numberOfKeys }) => `calc(${KEY_WIDTH_CSS($numberOfKeys)})`};
  left: ${({ $step, $numberOfKeys }) => `calc(${$step} * ${KEY_WIDTH_CSS($numberOfKeys)})`};
  transition: opacity 2s linear, transform 1s 2s;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  ${({ $isHarmonicG }) =>
    $isHarmonicG &&
    css`
      transform: translateX(100%);
    `}
`;
