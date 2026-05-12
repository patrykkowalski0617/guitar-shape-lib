import styled from "styled-components";

export const StyledTick = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 17px;
  height: 17px;
  border-radius: 100%;
  background-color: var(--muted);
  background-image: radial-gradient(
    circle,
    var(--foreground) 0%,
    var(--instrument) 20%,
    var(--muted) 100%
  );
  background-position: -6px -2px;
  background-size: 25px;
  box-shadow:
    2px 2px 8px 2px var(--background),
    -2px -2px 7px 0px var(--background) inset;
`;

export const IndicatorWrapper = styled.div<{ $hideTick: boolean }>`
  position: relative;
  height: 32px;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ $hideTick }) => ($hideTick ? 1 : 0.3)};
  display: flex;
  justify-content: center;
  align-items: center;
  left: 5px;
  z-index: 10;
`;

export const StringSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px 0 0 20px;
  transform: skewX(-1deg);
  position: relative;
  z-index: 10;
`;

export const StringOption = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
`;
