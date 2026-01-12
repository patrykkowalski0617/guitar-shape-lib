import styled, { css } from "styled-components";

const keyWidth = (num: number) => `(100% / (${num} + 0.75))`;

export const TemplateWrapper = styled.div<{ $firstAIndex: number; $numberOfKeys: number }>`
  transform: ${({ $firstAIndex, $numberOfKeys }) =>
    `translateX(calc(${$firstAIndex} * ${keyWidth($numberOfKeys)}))`};

  height: 20px;
  position: relative;
  padding: 0;
  box-sizing: border-box;
`;

export const Marker = styled.div<{
  $step: number;
  $numberOfKeys: number;
  $isVisible: boolean;
  $isHarmonicG: boolean;
}>`
  position: absolute;
  width: ${({ $numberOfKeys }) => `calc(${keyWidth($numberOfKeys)})`};
  height: 10px;
  background-color: green;
  bottom: 0px;
  left: ${({ $step, $numberOfKeys }) => `calc(${$step} * ${keyWidth($numberOfKeys)})`};
  transition: opacity 2s, transform 1s 2s;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

  ${({ $isHarmonicG }) =>
    $isHarmonicG &&
    css`
      transform: translateX(100%);
    `}
`;
