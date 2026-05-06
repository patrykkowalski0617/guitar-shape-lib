import styled from "styled-components";

export const PanelContainer = styled.div`
  padding: 0 15px 15px 0;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: calc(var(--spacing) * 4);
  justify-content: flex-end;
  position: relative;
  z-index: 1;
`;

export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`;

export const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 0.9;
  min-width: 32px;
  gap: calc(var(--spacing) * 2);
  margin-right: 10px;
`;

export const LabelText = styled.span`
  font-size: 8px;
  color: #888;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const ValueText = styled.span`
  font-size: 10px;
  font-family: monospace;
`;

export const KnobOuter = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(145deg, #2a2a2a, #000);
  box-shadow:
    5px 5px 8px 2px color-mix(in oklab, var(--background) 90%, transparent),
    0 0 10px 0px color-mix(in oklab, var(--foreground) 40%, transparent),
    -3px -3px 8px 2px color-mix(in oklab, var(--background) 70%, transparent),
    inset 1px 1px 1px rgba(255, 255, 255, 0.05);
  position: relative;
  cursor: ns-resize;
  border: 1px solid #3e3e3e;
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
  height: 6px;
  background: var(--secondary);
  margin-top: 1.5px;
  border-radius: 1px;
  box-shadow: 0 0 3px var(--secondary);
`;

export const PowerSwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  padding-right: 8px;
`;

export const SwitchContainer = styled.div<{ $active: boolean }>`
  width: 18px;
  height: 32px;
  background: #0a0a0a;
  border-radius: 3px;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
  cursor: pointer;
  box-shadow:
    1px 1px 3px 0px color-mix(in oklab, var(--foreground) 30%, transparent),
    -1px -1px 3px 0px color-mix(in oklab, var(--background) 70%, transparent);
`;

export const ToggleHebel = styled.div<{ $active: boolean }>`
  width: 10px;
  height: 14px;
  background: linear-gradient(to bottom, #666 0%, #222 100%);
  border-radius: 1px;
  transition: transform 0.1s ease-in-out;
  transform: ${(props) =>
    props.$active ? "translateY(0)" : "translateY(8px)"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
`;

export const StatusLed = styled.div<{ $active: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? "var(--secondary)" : "var(--warn)"};
  box-shadow: ${(props) =>
    props.$active ? "0 0 5px var(--secondary)" : "none"};
  transition: all 0.2s;
`;
