import { motion } from "framer-motion";
import { BaseChordSingleRow } from "./BaseChordSingleRow";
import type { TuneKeyId } from "@/data";
import { BaseChordLabel } from "./BaseChordLabel";
import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  optionsPerKey: any[];
  currentTuneKeyId: TuneKeyId | null;
  currentValue: string | undefined;
  activeIndex: number;
  onClose: () => void;
  onSelectKey: (id: TuneKeyId) => void;
  onSelectChord: (val: string) => void;
}

export function BaseChordExpandedList({
  optionsPerKey,
  currentTuneKeyId,
  currentValue,
  activeIndex,
  onClose,
  onSelectKey,
  onSelectChord,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [debug, setDebug] = useState<{
    screenTop: number;
    screenBottom: number;
    listAbove: number;
    listBelow: number;
  } | null>(null);

  const ROW_HEIGHT = 32;
  const LABEL_HEIGHT = 23;
  const topOffset = activeIndex * ROW_HEIGHT;

  useLayoutEffect(() => {
    const parent = containerRef.current?.parentElement;

    if (parent) {
      const rect = parent.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Matematyczne wyliczenie wysokości zawartości listy
      // listAbove: wszystko co jest nad triggerem (Label + wiersze przed aktywnym)
      const listAbove = topOffset + LABEL_HEIGHT;

      // listBelow: wszystko co jest pod triggerem (wiersze po aktywnym)
      // Odejmujemy 1 od długości tablicy, bo activeIndex jest 0-indexed
      const rowsBelow = optionsPerKey.length - 1 - activeIndex;
      const listBelow = rowsBelow * ROW_HEIGHT;

      setDebug({
        screenTop: rect.top,
        screenBottom: viewportHeight - rect.bottom,
        listAbove,
        listBelow,
      });

      console.log("Collision Debug:", {
        screenTop: rect.top,
        screenBottom: viewportHeight - rect.bottom,
        listAbove,
        listBelow,
        activeIndex,
        totalRows: optionsPerKey.length,
      });
    }
  }, [activeIndex, optionsPerKey.length]);

  return (
    <>
      {debug && (
        <div className="fixed inset-0 pointer-events-none z-[200]">
          <div
            className="fixed top-0 left-0 w-8 bg-red-500/30 border-b border-red-500 flex flex-col items-center justify-end pb-1 text-[9px] text-red-700 font-bold"
            style={{ height: `${debug.screenTop}px` }}
          >
            <span className="rotate-90 whitespace-nowrap mb-12">
              SCREEN TOP: {Math.round(debug.screenTop)}px
            </span>
            <span className="bg-white/80 px-1">
              LIST ABOVE: {debug.listAbove}px
            </span>
          </div>

          <div
            className="fixed bottom-0 left-0 w-8 bg-blue-500/30 border-t border-blue-500 flex flex-col items-center justify-start pt-1 text-[9px] text-blue-700 font-bold"
            style={{ height: `${debug.screenBottom}px` }}
          >
            <span className="bg-white/80 px-1">
              LIST BELOW: {debug.listBelow}px
            </span>
            <span className="rotate-90 whitespace-nowrap mt-12">
              SCREEN BTM: {Math.round(debug.screenBottom)}px
            </span>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-[40]" onClick={onClose} />
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{ top: `-${topOffset + LABEL_HEIGHT}px` }}
        className="absolute left-0 w-full z-[50] bg-background shadow-2xl rounded-sm border border-background/20 overflow-hidden"
      >
        <BaseChordLabel />

        <div className="rounded-sm overflow-hidden">
          {optionsPerKey.map((group, index) => (
            <BaseChordSingleRow
              key={group.tuneKeyId}
              group={group}
              isCurrentKey={currentTuneKeyId === group.tuneKeyId}
              currentValue={currentValue}
              isLastRow={index === optionsPerKey.length - 1}
              onSelectKey={() => onSelectKey(group.tuneKeyId)}
              onSelectChord={onSelectChord}
              onClose={onClose}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
