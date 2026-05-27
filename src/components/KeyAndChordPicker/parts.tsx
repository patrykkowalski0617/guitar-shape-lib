import styled from "styled-components";
import { color } from "@/components/ui";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 90vw;
  max-height: 80vh;
  overflow: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  background-color: ${color.bg};
  align-items: center;
`;
