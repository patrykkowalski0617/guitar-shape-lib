import styled, { css } from "styled-components";
import { KEY_WIDTH_CSS } from "../constants";

interface MarkerProps {
  $step: number;
  $numberOfKeys: number;
  $isVisible: boolean;
  $isHarmonicG: boolean;
}

export const TemplateWrapper = styled.div<{ $firstAIndex: number; $numberOfKeys: number }>`
  height: 20px;
  position: relative;
  transform: ${({ $firstAIndex, $numberOfKeys }) =>
    `translateX(calc(${$firstAIndex} * ${KEY_WIDTH_CSS($numberOfKeys)}))`};
`;

export const Marker = styled.div<MarkerProps>`
  position: absolute;
  bottom: 0;
  height: 10px;
  background-color: green;
  width: ${({ $numberOfKeys }) => `calc(${KEY_WIDTH_CSS($numberOfKeys)})`};
  left: ${({ $step, $numberOfKeys }) => `calc(${$step} * ${KEY_WIDTH_CSS($numberOfKeys)})`};

  transition: opacity 2s, transform 1s 2s;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

  ${({ $isHarmonicG }) =>
    $isHarmonicG &&
    css`
      transform: translateX(100%);
    `}
`;
