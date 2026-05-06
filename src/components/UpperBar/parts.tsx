import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: calc(var(--spacing) * 16);
`;

export const Section = styled.div`
  width: fit-content;
`;

export const BaseChordToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 600px;
  flex: 1 1 0;
`;

export const BottomRow = styled.div`
  display: flex;
  width: 100%;
`;
