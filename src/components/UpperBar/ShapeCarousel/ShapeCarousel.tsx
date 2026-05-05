import { useEffect, useRef, useState, useCallback } from "react";
import { SHAPES, type Shapes } from "@/data";
import { useControlsStore } from "@/store";
import * as S from "./parts";

const ShapeCarousel = () => {
  const activeShapeId = useControlsStore((state) => state.shapeId);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const shapeKeys = Object.keys(SHAPES) as (keyof Shapes)[];
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const autoPlayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const scrollToActive = useCallback(() => {
    if (!activeShapeId) return;

    const container = carouselWrapperRef.current;
    const targetElement = container?.querySelector(
      `[data-id="${activeShapeId}"]`,
    ) as HTMLElement;

    if (targetElement && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      const isFullyVisible =
        targetRect.left >= containerRect.left &&
        targetRect.right <= containerRect.right;

      if (!isFullyVisible) {
        container.scrollTo({
          left: container.scrollLeft + (targetRect.left - containerRect.left),
          behavior: "smooth",
        });
      }
    }
  }, [activeShapeId]);

  const clearAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const startAutoPlay = () => {
    clearAutoPlay();
    autoPlayIntervalRef.current = setInterval(() => {
      const container = carouselWrapperRef.current;
      if (!container) return;

      setVisibleIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % shapeKeys.length;
        container.scrollTo({
          left: nextIndex * S.ITEM_WIDTH,
          behavior: "smooth",
        });
        return nextIndex;
      });
    }, 6000);
  };

  useEffect(() => {
    const el = carouselWrapperRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontalScroll = Math.abs(e.deltaX) > 0 || e.shiftKey;
      if (isHorizontalScroll) return;

      e.preventDefault();
      setIsUserInteracting(true);

      const direction = e.deltaY > 0 ? 1 : -1;
      el.scrollTo({
        left: el.scrollLeft + direction * S.ITEM_WIDTH,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const container = carouselWrapperRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScroll = container.scrollLeft;
      const index = Math.round(currentScroll / S.ITEM_WIDTH);
      setVisibleIndex(index);

      setIsUserInteracting(true);

      if (interactionTimerRef.current)
        clearTimeout(interactionTimerRef.current);

      interactionTimerRef.current = setTimeout(() => {
        setIsUserInteracting(false);
        // Jeśli jest aktywny kształt, wróć do niego po zakończeniu scrollowania
        if (activeShapeId) {
          scrollToActive();
        }
      }, 2000); // Czekamy 2s od ostatniego scrolla, zanim wrócimy do aktywnego
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeShapeId, scrollToActive]);

  useEffect(() => {
    const shouldAutoPlay = !activeShapeId && !isUserInteracting;

    if (shouldAutoPlay) {
      startAutoPlay();
    } else {
      clearAutoPlay();
    }

    return () => clearAutoPlay();
  }, [activeShapeId, isUserInteracting]);

  // Reaguj na zmianę aktywnego ID
  useEffect(() => {
    scrollToActive();
  }, [activeShapeId, scrollToActive]);

  return (
    <S.RelativeContainer>
      <S.Label>
        {activeShapeId ? "Currently learning" : "Available shapes"}
      </S.Label>
      <S.Wrapper
        ref={carouselWrapperRef}
        style={{
          scrollSnapType: isUserInteracting ? "x mandatory" : "none",
          scrollBehavior: "smooth",
        }}
      >
        <S.ScrollContainer>
          {shapeKeys.map((key) => {
            const shape = SHAPES[key];
            const isActive = activeShapeId === key;
            const isArpeggio = shape.type.toLowerCase().includes("arpeggio");
            const displayLabel = isArpeggio ? `X${shape.label}` : shape.label;

            return (
              <S.ShapeItem
                key={key}
                $isActive={isActive}
                data-id={key}
                style={{ scrollSnapAlign: "start" }}
              >
                {displayLabel} {shape.type}
              </S.ShapeItem>
            );
          })}
        </S.ScrollContainer>
      </S.Wrapper>

      <S.Indicators>
        {shapeKeys.map((_, index) => (
          <S.Dot key={index} $active={visibleIndex === index} />
        ))}
      </S.Indicators>
    </S.RelativeContainer>
  );
};

export default ShapeCarousel;
