export const ROTATE_90 = { display: "block", transform: "rotate(90deg)" };

export interface MultiStepSliderProps {
  value: number[];
  onValueChange: (value: [number, number]) => void;
  max: number;
  min?: number;
  thumbSize?: number;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  effectiveMax?: number;
  highlightedId?: string | number | null;
  onHighlightEnd?: () => void;
  onBeforeValueChange?: (nextValue: number[]) => boolean;
}

export interface RangeChangeZoneProps {
  val: number;
  index: number;
  total: number;
  isVertical: boolean;
  thumbSize: number;
  firstVal: number;
  lastVal: number;
  onBeforeValueChange?: (value: number[]) => boolean;
  handleCutStart: (val: number) => void;
  handleCutEnd: (val: number) => void;
  setPreviewValue: (value: number[] | null) => void;
}
