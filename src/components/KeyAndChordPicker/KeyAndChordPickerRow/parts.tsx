import styled from "styled-components";

export const Row = styled.div<{ $isCurrent?: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  background-color: ${({ $isCurrent }) =>
    $isCurrent ? "var(--primary)" : "transparent"};
`;

export const Item = styled.div`
  padding: 4px 8px;
  width: 75px;
  &:first-child {
    background-color: black;
  }
`;
export const Chord = styled.div``;
export const Key = styled.div``;
