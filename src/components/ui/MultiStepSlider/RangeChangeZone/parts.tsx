import styled, { css } from "styled-components";

export const InteractionContainer = styled.div<{
  $isVertical: boolean;
  $thumbSize: number;
  $isDragging?: boolean;
  $numberOfTicks: number;
}>`
  ${({ $thumbSize, $numberOfTicks }) => {
    const halfChildWidthPercentage = 100 / (($numberOfTicks - 1) * 2);
    const offset = `${halfChildWidthPercentage}%`;
    const topPosition = $thumbSize / 2;

    return css`
      border: 1px red solid;
      height: 40px;
      display: flex;
      position: absolute;
      top: ${topPosition}px;
      left: -${offset};
      right: -${offset};
    `;
  }}
`;

export const ControlsWrapper = styled.div<{
  $isVertical: boolean;
  $isDragging: boolean;
  $positionPercent: number;
  $thumbSize: number;
  $numberOfTicks: number;
}>`
  border: 1px yellow solid;
  display: flex;
  height: 100%;
  flex: 1;
`;

export const ExpandButton = styled.button<{ $isVertical: boolean }>`
  flex: 1;
  height: 100%;
  border: 1px green solid;
`;

export const CutButton = styled.button<{
  $isVertical: boolean;
}>`
  flex: 1;
  height: 100%;
  border: 1px blue solid;
`;
