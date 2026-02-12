import styled from "styled-components";
import { ControlWrapper as ControlWrapperOrygin } from "@/components/Settings/parts";
import { ControlLabel as ControlLabelOrygin } from "@/parts";

export const ControlWrapper = styled(ControlWrapperOrygin)`
  flex-direction: row;
  flex: 1 1 0;
`;

export const ControlLabel = styled(ControlLabelOrygin)`
  width: 80%;
`;
