import React, { useState, useEffect, useRef } from "react";
import * as S from "./parts";
import { usePlayerStore } from "@/store/usePlayerStore";

export const BpmInput = () => {
  const globalBpm = usePlayerStore((s) => s.bpm);
  const setGlobalBpm = usePlayerStore((s) => s.setBpm);

  const [inputValue, setInputValue] = useState(globalBpm.toString());
  const [isDraggingState, setIsDraggingState] = useState(false);

  const isDraggingRef = useRef(false);
  const startY = useRef(0);
  const startBpm = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(globalBpm.toString());
  }, [globalBpm]);

  const handleCommit = () => {
    let val = parseInt(inputValue);
    if (isNaN(val)) val = globalBpm;
    setGlobalBpm(val);
    setInputValue(Math.max(20, Math.min(360, val)).toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") inputRef.current?.blur();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;

      if (e.cancelable) e.preventDefault();

      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const diff = startY.current - clientY;

      const sensitivity = 0.6;
      const nextBpm = Math.round(startBpm.current + diff * sensitivity);

      setGlobalBpm(nextBpm);
    };

    const onEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDraggingState(false);
        document.body.style.cursor = "default";
      }
    };

    window.addEventListener("mousemove", onMove);
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
    if (document.activeElement === e.currentTarget) return;

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    isDraggingRef.current = true;
    setIsDraggingState(true);
    startY.current = clientY;
    startBpm.current = globalBpm;
    document.body.style.cursor = "ns-resize";

    if (e.cancelable) e.preventDefault();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <S.BpmInput
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleCommit}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseDown={onStart}
      onTouchStart={onStart}
      style={{
        cursor: "ns-resize",
        userSelect: isDraggingState ? "none" : "auto",
        touchAction: "none",
        pointerEvents: isDraggingState ? "none" : "auto",
      }}
    />
  );
};
