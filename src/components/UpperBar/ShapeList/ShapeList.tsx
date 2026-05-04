import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SHAPES, type Shapes } from "@/data";
import { useControlsStore } from "@/store";
import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";
import { Label as _Label } from "@/parts";
import { glassEffectShadow } from "@/constants";

const ITEM_WIDTH = 200;

const RelativeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: ${ITEM_WIDTH}px;
  border-radius: ${instrumentElBRadius};
  border: 1px solid color-mix(in oklab, var(--border) 90%, var(--background));
  background-color: color-mix(in oklab, var(--accent) 45%, var(--background));
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  ${glassEffectShadow}

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
`;

const ShapeItem = styled.div<{ $isActive: boolean }>`
  flex: 0 0 ${ITEM_WIDTH}px;
  min-width: ${ITEM_WIDTH}px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 13px;
`;

const Indicators = styled.div`
  position: absolute;
  bottom: -13px;
  left: 5px;
  right: 5px;
  display: flex;
  justify-content: space-between;
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ $active }) =>
    $active
      ? "var(--accent)"
      : "color-mix(in oklab, var(--accent) 60%, var(--background))"};
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  transform: ${({ $active }) => ($active ? "scale(1.4)" : "scale(1)")};
`;

const Label = styled(_Label)`
  padding: 4px 0;
`;

const ShapeCarousel = () => {
  const activeShapeId = useControlsStore((state) => state.shapeId);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const shapeKeys = Object.keys(SHAPES) as (keyof Shapes)[];
  const currentActiveId = activeShapeId || shapeKeys[0];

  useEffect(() => {
    const scrollElement = carouselWrapperRef.current;
    if (!scrollElement) return;

    const handleManualWheel = (wheelEvent: WheelEvent) => {
      const canScrollHorizontally =
        scrollElement.scrollWidth > scrollElement.clientWidth;
      if (!canScrollHorizontally) return;

      const isUserDoingHorizontalScroll =
        Math.abs(wheelEvent.deltaX) > 0 || wheelEvent.shiftKey;
      if (isUserDoingHorizontalScroll) return;

      wheelEvent.preventDefault();

      scrollElement.style.scrollBehavior = "auto";
      const scrollSpeedMultiplier = 0.5;
      scrollElement.scrollLeft += wheelEvent.deltaY * scrollSpeedMultiplier;

      const timer = setTimeout(() => {
        scrollElement.style.scrollBehavior = "smooth";
      }, 50);

      return () => clearTimeout(timer);
    };

    scrollElement.addEventListener("wheel", handleManualWheel, {
      passive: false,
    });
    return () => scrollElement.removeEventListener("wheel", handleManualWheel);
  }, []);

  useEffect(() => {
    const container = carouselWrapperRef.current;
    if (!container) return;

    let snapTimer: ReturnType<typeof setTimeout>;

    const scrollToActive = () => {
      const activeElement = container.querySelector(
        `[data-active-shape="true"]`,
      ) as HTMLElement;
      if (!activeElement) return;

      const containerRect = container.getBoundingClientRect();
      const activeItemRect = activeElement.getBoundingClientRect();

      const isFullyVisible =
        activeItemRect.left >= containerRect.left &&
        activeItemRect.right <= containerRect.right;

      if (isFullyVisible) return;

      const targetLeft =
        container.scrollLeft + (activeItemRect.left - containerRect.left);

      container.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    };

    const handleScroll = () => {
      // 1. Tylko aktualizujemy kropki
      const index = Math.round(container.scrollLeft / ITEM_WIDTH);
      setVisibleIndex(index);

      // 2. Zarządzamy timerem powrotu
      clearTimeout(snapTimer);
      snapTimer = setTimeout(scrollToActive, 3000);
    };

    container.addEventListener("scroll", handleScroll);

    // Auto-scroll przy zmianie aktywnego elementu (np. kliknięcie klawisza)
    scrollToActive();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(snapTimer);
    };
  }, [currentActiveId]); // Usunięto visibleIndex z dependencji - to był błąd

  return (
    <div>
      <Label>You are currenly learning</Label>
      <RelativeContainer>
        <Wrapper ref={carouselWrapperRef}>
          <ScrollContainer>
            {shapeKeys.map((key) => {
              const shape = SHAPES[key];
              const isActive = currentActiveId === key;
              const isArpeggio = shape.type.toLowerCase().includes("arpeggio");
              const displayLabel = isArpeggio ? `X${shape.label}` : shape.label;

              return (
                <ShapeItem
                  key={key}
                  $isActive={isActive}
                  data-active-shape={isActive}
                >
                  {displayLabel} {shape.type}
                </ShapeItem>
              );
            })}
          </ScrollContainer>
        </Wrapper>
        <Indicators>
          {shapeKeys.map((_, index) => (
            <Dot key={index} $active={visibleIndex === index} />
          ))}
        </Indicators>
      </RelativeContainer>
    </div>
  );
};

export default ShapeCarousel;
