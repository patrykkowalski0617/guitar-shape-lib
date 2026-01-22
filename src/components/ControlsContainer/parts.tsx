import styled from "styled-components";

export const Container = styled.div`
  padding: 30px 20px 0;
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
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-grow: 1;
  max-width: 500px;
  @media (min-width: 500px) {
    max-width: 300px;
  }
`;
