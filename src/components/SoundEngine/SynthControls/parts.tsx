import styled from "styled-components";

export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  user-select: none;
`;

export const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1;
  min-width: 35px;
`;

export const LabelText = styled.span`
  font-size: 10px;
  color: #aaa;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ValueText = styled.span`
  font-size: 9px;
  color: #666;
  font-family: monospace;
  margin-top: 2px;
`;

export const KnobOuter = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(145deg, #333, #111);
  box-shadow:
    2px 2px 5px rgba(0, 0, 0, 0.5),
    inset 1px 1px 2px rgba(255, 255, 255, 0.1);
  position: relative;
  cursor: ns-resize;
  border: 2px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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
  height: 8px;
  background: rgb(0, 255, 204);
  margin-top: 2px;
  border-radius: 1px;
  box-shadow: 0 0 5px rgb(0, 255, 204);
`;

export const PanelContainer = styled.div`
  padding: 12px 20px;
  background: #1a1a1a;
  color: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  border: 1px solid #333;
  width: fit-content;
`;
