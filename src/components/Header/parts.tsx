import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  width: 100%;
  background-color: var(--primary);
  position: relative;
  max-width: 1200px;
  margin: 0 auto 40px;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  color: var(--foreground);
  margin: 0;
  text-align: center;
  width: 100%;
  transform: rotate(-2deg) translateY(-2px);
`;

export const HeaderSide = styled.div`
  right: 20px;
  position: absolute;
`;
