import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  flex-wrap: wrap;
`;

export const MainDisplay = styled.div<{ $locked: boolean }>`
  padding: 10px 16px;
  font-size: 15px;
  border-radius: 6px;
  background: ${({ $locked }) => ($locked ? "#2a2a2a" : "#1e2a1e")};
  color: ${({ $locked }) => ($locked ? "#ccc" : "#ccffcc")};
  border: 1px solid ${({ $locked }) => ($locked ? "#555" : "#2a5")};
  cursor: pointer;
  min-width: 260px;
  &:hover {
    background: ${({ $locked }) => ($locked ? "#555" : "#2a5")};
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 12px;
`;

export const LogButton = styled.button`
  padding: 9px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background: #8b0000;
  color: white;
  cursor: pointer;

  &:hover {
    background: #a50000;
  }
`;
