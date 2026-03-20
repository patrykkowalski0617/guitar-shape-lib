import styled from "styled-components";

export const ShapeExplorerWrapper = styled.div`
  width: 100%;
`;

export const Tick = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: color-mix(in oklab, var(--muted) 80%, var(--foreground));
  transition: all 0.6s ease-in-out;
`;
