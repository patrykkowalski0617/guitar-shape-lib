import styled, { css } from "styled-components";

const keyWidth = (num: number) => `(100% / ${num})`;

export const TemplateWrapper = styled.div<{ $firstAIndex: number; $numberOfKeys: number }>`
  transform: ${({ $firstAIndex, $numberOfKeys }) =>
    `translateX(calc(${$firstAIndex} * ${keyWidth($numberOfKeys)}))`};
`;

export const Marker = styled.div<{
  $step: number;
  $numberOfKeys: number;
  $isVisible: boolean;
  $isHarmonicG: boolean;
}>`
  position: absolute;
  top: 20px;
  height: 10px;
  width: ${({ $numberOfKeys }) => `calc(${keyWidth($numberOfKeys)})`};
  background-color: green;
  left: ${({ $step, $numberOfKeys }) => `calc(${$step} * ${keyWidth($numberOfKeys)})`};

  transition: opacity 2s, transform 1s 2s;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

  ${({ $isHarmonicG }) =>
    $isHarmonicG &&
    css`
      transform: translateX(100%);
    `}
`;
