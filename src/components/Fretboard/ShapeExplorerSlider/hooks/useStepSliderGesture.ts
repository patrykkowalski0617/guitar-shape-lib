import { useRef } from "react";
import { useGesture } from "@use-gesture/react";

interface GestureConfig {
  onDoubleTap: () => void;
}

export function useStepSliderGesture({ onDoubleTap }: GestureConfig) {
  const lastTapTime = useRef<number>(0);

  const bind = useGesture(
    {
      onPointerUp: ({ event }) => {
        const currentTime = Date.now();
        const tapDelay = currentTime - lastTapTime.current;
        const isDoubleTap = tapDelay < 300 && tapDelay > 0;

        if (isDoubleTap) {
          event.stopPropagation();
          onDoubleTap();
          lastTapTime.current = 0;
        } else {
          lastTapTime.current = currentTime;
        }
      },
    },
    {
      eventOptions: { capture: false },
    },
  );

  return bind;
}
