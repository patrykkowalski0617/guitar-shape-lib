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
    const isCollidingBottom = listBelow > spaceBelow;

    let finalStyle: React.CSSProperties = {};
    let targetScroll = 0;

    if (isCollidingTop) {
      // Kotwiczymy dół listy do triggera
      const bottomOffset = listBelow;
      // MaxHeight to odległość od góry ekranu do dołu listy (trigger + to co pod nim)
      const maxHeight = spaceAbove + rect.height + listBelow;

      finalStyle = {
        bottom: `-${bottomOffset}px`,
        maxHeight: `${maxHeight}px`,
      };

      // Przewijamy o tyle, o ile góra listy "wyszłaby" poza margines
      targetScroll = listAbove - spaceAbove;
    } else {
      const bottomOffset = listBelow;
      // Jeśli dół koliduje, ograniczamy wysokość, ale zostajemy przy pozycjonowaniu top
      const maxHeight = isCollidingBottom
        ? spaceBelow + rect.height + listAbove
        : listAbove + rect.height + listBelow;

      finalStyle = {
        top: `-${listAbove}px`,
        maxHeight: `${maxHeight}px`,
      };

      targetScroll = 0;
    }

    setComputedStyle({ ...finalStyle, opacity: 1 });

    // Używamy requestAnimationFrame, aby upewnić się, że style maxHeight zostały zaaplikowane
    // i kontener ma już poprawne scrollHeight/clientHeight przed ustawieniem scrollTop
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
        style={computedStyle}
        className="absolute left-0 w-full z-[50] bg-background shadow-2xl rounded-sm border border-background/20 flex flex-col overflow-hidden"
      >
        <BaseChordLabel />

        <div
          ref={scrollRef}
          className="overflow-y-auto flex-1 min-h-0 scrollbar-hide bg-background"
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
