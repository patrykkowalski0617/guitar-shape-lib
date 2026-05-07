import styled, { css } from "styled-components";

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: calc(var(--spacing) * 4);
  justify-content: space-between;
  position: relative;
  z-index: 1;
  width: 100%;
`;

export const ControlWrapper = styled.div`
  display: flex;
  user-select: none;
  flex: 1 1 0;
`;

export const LabelBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: -10px 0 0 10px;
  height: 100%;
`;

export const LabelText = styled.span`
  font-size: 8px;
  color: #7f7f7f;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 1;
`;

export const KnobOuter = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(145deg, #2a2a2a, #050505);
  box-shadow:
    3px 3px 5px 1px color-mix(in oklab, var(--background) 50%, transparent),
    3px 0px 8px 4px color-mix(in oklab, var(--background) 50%, transparent),
    -7px -1px 11px 3px color-mix(in oklab, var(--background) 80%, transparent),
    3px 3px 7px 2px color-mix(in oklab, var(--foreground) 40%, transparent),
    inset 1px 1px 1px rgba(255, 255, 255, 0.05);
  position: relative;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid #151515;
`;

export const IndicatorContainer = styled.div<{ $rotation: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(${(props) => props.$rotation}deg);
  pointer-events: none;
  display: flex;
  justify-content: center;
`;

export const IndicatorMark = styled.div`
  width: 2px;
  height: 6px;
  background: var(--secondary);
  margin-top: 1.5px;
  border-radius: 1px;
  box-shadow: 0 0 3px var(--secondary);
`;

export const SwitchContainer = styled.div<{ $isActive: boolean }>`
  width: 28px;
  height: 32px;
  border-radius: 4px;
  border: 2px solid #151515;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
  cursor: pointer;

  ${({ $isActive }) =>
    $isActive
      ? css`
          background: color-mix(in oklab, var(--glow-color) 70%, transparent);
          box-shadow:
            inset 3px 3px 2px 1px
              color-mix(in oklab, var(--foreground) 20%, transparent),
            inset -3px -3px 2px 1px
              color-mix(in oklab, var(--background) 35%, transparent),
            1px 1px 10px 0px
              color-mix(in oklab, var(--glow-color) 50%, transparent),
            -3px -1px 10px 3px
              color-mix(in oklab, var(--background) 70%, transparent);
        `
      : css`
          background: linear-gradient(145deg, #696969, #1f1f1f);
          box-shadow:
            inset 3px 3px 2px 1px
              color-mix(in oklab, var(--foreground) 20%, transparent),
            inset -3px -3px 2px 1px
              color-mix(in oklab, var(--background) 35%, transparent),
            3px 3px 7px 1px
              color-mix(in oklab, var(--foreground) 15%, transparent),
            -2px -2px 10px 1px
              color-mix(in oklab, var(--background) 70%, transparent);
        `}
`;
