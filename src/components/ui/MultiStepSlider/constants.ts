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
