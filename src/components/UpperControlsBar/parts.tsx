import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: calc(var(--spacing) * 8);
  flex-wrap: wrap;
`;

export const Section = styled.div`
  width: fit-content;
`;

export const BottomRow = styled.div`
  display: flex;
  width: 100%;
`;
