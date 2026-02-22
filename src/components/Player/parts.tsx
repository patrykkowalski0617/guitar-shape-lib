import { instrumentElBRadius } from "@/parts";
import styled, { css, keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 80%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 0%, transparent);
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1230px;
    margin: auto;
  }
`;

export const PlayerRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  margin-left: auto;
  margin-right: auto;
  flex-shrink: 0;
  width: max-content;
`;

export const ControlsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 28px;
`;

export const PlayerScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  height: 28px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media (min-width: 1024px) {
    width: fit-content;
  }
`;

const BasePlayerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${instrumentElBRadius};
  height: 100%;
  width: 30px;
  color: var(--primary-foreground);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PlayButton = styled(BasePlayerButton)<{ $isPlaying?: boolean; $bpm?: number }>`
  background-color: color-mix(in oklab, var(--accent) 70%, transparent);
  &:hover {
    background-color: color-mix(in oklab, var(--accent) 90%, transparent);
  }
  ${({ $isPlaying, $bpm }) =>
    $isPlaying &&
    $bpm &&
    css`
      animation: ${pulse} ${60 / $bpm}s infinite linear;
    `}
`;

export const BpmInput = styled.input`
  background: color-mix(in oklab, var(--accent) 10%, transparent);
  border: 1px solid var(--border);
  border-radius: ${instrumentElBRadius};
  color: var(--foreground);
  height: 100%;
  width: 50px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;

  &:focus {
    border-color: var(--accent);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const CheckButton = styled(BasePlayerButton)`
  background-color: color-mix(in oklab, var(--accent) 70%, transparent);
  &:hover {
    background-color: color-mix(in oklab, var(--accent) 90%, transparent);
  }
`;

export const DeleteButton = styled(BasePlayerButton)`
  border: 1px solid var(--primary);
  color: var(--primary);
  background-color: color-mix(in oklab, var(--muted) 20%, transparent);
  &:hover {
    background-color: color-mix(in oklab, var(--muted) 40%, transparent);
  }
`;

export const AddBrickButton = styled(BasePlayerButton)`
  color: var(--muted-foreground);
  border: 1px dashed color-mix(in oklab, var(--border) 50%, transparent);
  &:hover {
    background-color: color-mix(in oklab, var(--muted) 50%, transparent);
    color: var(--foreground);
  }
`;
