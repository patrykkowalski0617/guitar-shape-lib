import styled from "styled-components";

export const Container = styled.div<{ $locked: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 15px;
  border-radius: 6px;
  width: 200px;
  background: ${({ $locked }) => ($locked ? "#2a2a2a" : "#1e2a1e")};
  color: ${({ $locked }) => ($locked ? "#ccc" : "#ccffcc")};
  border: 1px solid ${({ $locked }) => ($locked ? "#555" : "var(--accent)")};
  cursor: pointer;
  &:hover {
    background: ${({ $locked }) => ($locked ? "#555" : "var(--accent)")};
  }
`;
