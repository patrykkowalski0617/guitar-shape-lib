import styled from "styled-components";

export const Container = styled.div`
  padding: 15px 15px 0;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: calc(var(--spacing) * 8);
  max-width: 1000px;
  flex-direction: row;
  align-items: flex-end;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
