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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [computedStyle, setComputedStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const ROW_HEIGHT = 32;
  const LABEL_HEIGHT = 23;
  const MARGIN = 10;
  const MIN_VISIBLE_HEIGHT = ROW_HEIGHT * 4 + LABEL_HEIGHT;

  useLayoutEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const listAbove = activeIndex * ROW_HEIGHT + LABEL_HEIGHT;
    const listBelow = (optionsPerKey.length - 1 - activeIndex) * ROW_HEIGHT;

    const spaceAbove = rect.top - MARGIN;
    const spaceBelow = viewportHeight - rect.bottom - MARGIN;

    const isCollidingTop = listAbove > spaceAbove;

    let finalStyle: React.CSSProperties = {};
    let targetScroll = 0;

    if (isCollidingTop) {
      const calculatedMax = spaceAbove + rect.height + listBelow;
      const finalMaxHeight = Math.max(calculatedMax, MIN_VISIBLE_HEIGHT);

      const bottomOffset = listBelow;
      const willOverflowTop =
        rect.bottom + bottomOffset - finalMaxHeight < MARGIN;

      if (willOverflowTop) {
        finalStyle = {
          top: `${MARGIN - rect.top}px`,
          maxHeight: `${viewportHeight - MARGIN * 2}px`,
        };
        targetScroll = listAbove - (rect.top - MARGIN);
      } else {
        finalStyle = {
          bottom: `-${bottomOffset}px`,
          maxHeight: `${finalMaxHeight}px`,
        };
        targetScroll = listAbove - spaceAbove;
      }
    } else {
      const calculatedMax =
        listBelow > spaceBelow
          ? spaceBelow + rect.height + listAbove
          : listAbove + rect.height + listBelow;

      const finalMaxHeight = Math.max(calculatedMax, MIN_VISIBLE_HEIGHT);

      const willOverflowBottom =
        rect.top - listAbove + finalMaxHeight > viewportHeight - MARGIN;

      if (willOverflowBottom) {
        finalStyle = {
          bottom: `${MARGIN - (viewportHeight - rect.bottom)}px`,
          maxHeight: `${viewportHeight - MARGIN * 2}px`,
        };
        targetScroll = listAbove - (rect.top - MARGIN);
      } else {
        finalStyle = {
          top: `-${listAbove}px`,
          maxHeight: `${finalMaxHeight}px`,
        };
        targetScroll = 0;
      }
    }

    if (spaceAbove < LABEL_HEIGHT) {
      const diff = LABEL_HEIGHT - spaceAbove;

      targetScroll = targetScroll - diff;

      if (finalStyle.bottom) {
        const currentBottom = parseFloat(finalStyle.bottom as string);
        const currentMaxHeight = parseFloat(finalStyle.maxHeight as string);

        finalStyle.bottom = `${currentBottom - diff}px`;
        finalStyle.maxHeight = `${currentMaxHeight + diff}px`;
      }
    }

    setComputedStyle({ ...finalStyle, opacity: 1 });

    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = targetScroll;
      }
    });
  }, [activeIndex, optionsPerKey.length]);

  return (
    <>
      <div className="fixed inset-0 z-[40]" onClick={onClose} />
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: computedStyle.opacity as number, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{ ...computedStyle, boxShadow: "0 0 30px -20px #6c6c6cb7" }}
        className="absolute left-0 w-full z-[50] bg-background rounded-sm border border-background/20 flex flex-col overflow-hidden"
      >
        <BaseChordLabel />

        <div
          ref={scrollRef}
          className="overflow-y-auto flex-1 min-h-0 scrollbar-hide bg-background"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div className="flex flex-col">
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
        </div>
      </motion.div>
    </>
  );
}
