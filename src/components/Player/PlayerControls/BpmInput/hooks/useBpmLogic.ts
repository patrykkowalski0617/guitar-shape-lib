import { useState, useEffect, useRef } from "react";
import { BPM_LIMITS, usePlayerStore } from "@/store";

export const useBpmLogic = () => {
  const globalBpm = usePlayerStore((state) => state.bpm);
  const setGlobalBpm = usePlayerStore((state) => state.setBpm);

  const [inputValue, setInputValue] = useState(globalBpm.toString());
  const [isDraggingState, setIsDraggingState] = useState(false);

  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const startY = useRef(0);
  const startBpm = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(globalBpm.toString());
  }, [globalBpm]);

  const handleCommit = () => {
    const parsedValue = parseInt(inputValue);
    const isValidNumber = !isNaN(parsedValue);

    if (isValidNumber) {
      const clampedBpm = Math.max(
        BPM_LIMITS.MIN,
        Math.min(BPM_LIMITS.MAX, parsedValue),
      );
      setGlobalBpm(clampedBpm);
      setInputValue(clampedBpm.toString());
    } else {
      setInputValue(globalBpm.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isEnterPressed = e.key === "Enter";
    if (isEnterPressed) {
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;

      const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const verticalDiff = startY.current - currentY;
      const dragThreshold = 3;
      const isSignificantMovement = Math.abs(verticalDiff) > dragThreshold;

      if (isSignificantMovement) {
        hasMovedRef.current = true;
        const sensitivity = 0.6;
        const nextBpm = Math.round(
          startBpm.current + verticalDiff * sensitivity,
        );

        setGlobalBpm(nextBpm);

        if (e.cancelable) e.preventDefault();
      }
    };

    const onEnd = () => {
      if (!isDraggingRef.current) return;

      const isStaticClick = !hasMovedRef.current;
      if (isStaticClick) {
        inputRef.current?.focus();
      }

      isDraggingRef.current = false;
      setIsDraggingState(false);
      document.body.style.cursor = "default";
    };

    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [setGlobalBpm]);

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startY.current = clientY;
    startBpm.current = globalBpm;
    setIsDraggingState(true);

    document.body.style.cursor = "ns-resize";

    const isDirectInputClick = e.target === inputRef.current;
    if (isDirectInputClick && e.cancelable) {
      e.preventDefault();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return {
    inputValue,
    setInputValue,
    isDraggingState,
    inputRef,
    handleCommit,
    handleKeyDown,
    onStart,
    handleFocus,
  };
};
