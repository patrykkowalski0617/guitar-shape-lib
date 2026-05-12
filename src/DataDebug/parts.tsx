import styled from "styled-components";

export const DebugContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 10px;
  background: #000;
  color: #fff;
  font-family: monospace;
  font-size: 16px;
  border: 2px solid #ffff00;
  border-radius: 4px;
  width: fit-content;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 6px;
  padding: 0 15px;
  border-left: 1px solid #333;

  &:first-child {
    border-left: none;
    padding-left: 0;
  }
`;

export const DataRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const Label = styled.div`
  color: #ffff00;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  min-width: 60px;
`;

export const ValueBox = styled.div`
  min-width: 100px;
`;

export const ValueHighlight = styled.span`
  color: #ffff00;
  font-weight: bold;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  height: 100%;
`;

export const ActionButton = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  padding: 0 10px;
  font-size: 13px;
  font-family: inherit;
  height: 100%;
  min-width: 150px;
  &:hover {
    background: #ffffff22;
  }
`;

export const ResetButton = styled(ActionButton)`
  border-color: #ff4444;
  color: #ff4444;

  &:hover {
    background: #ff444422;
  }
`;

export const HistoryHeader = styled(Label)`
  margin-bottom: 8px;
`;

export const HistoryScrollArea = styled.div`
  height: 150px;
  overflow-y: scroll;
  padding-right: 15px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffff00;
    border-radius: 3px;
  }
`;

export const HistoryEntry = styled.div`
  white-space: nowrap;
  color: #bbb;
  font-size: 12px;
  padding: 2px 0;
  border-bottom: 1px solid #222;

  &:first-child {
    color: #ffff00;
  }
`;
