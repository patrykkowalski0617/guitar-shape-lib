import styled from "styled-components";
import { space } from "@/components/ui";

export const PlayerHeaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: ${space._3};
  height: 50px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: ${space._3};
`;

export const SliderWrapper = styled.div`
  flex-grow: 1;
  max-width: 500px;
`;

export const ShortBasePlaceHolder = styled.div`
  width: 100px;
  opacity: 0;
`;

export const LedPlaceHolder = styled.div`
  width: 30px;
  opacity: 0;
`;

export const KeyAndShapePlaceHolder = styled.div`
  min-width: 250px;
  opacity: 0;
  text-align: center;
`;

export const ShapePlaceHolder = styled.div`
  min-width: 200px;
  opacity: 0;
  text-align: center;
`;

export const CounterPlaceHolder = styled.div`
  min-width: 250px;
  opacity: 0;
  text-align: center;
`;

export const GrabPlaceHolder = styled.div`
  width: 42px;
  opacity: 0;
`;

export const MasterTargetNotesSelectWrapper = styled.div`
  width: auto;
`;
