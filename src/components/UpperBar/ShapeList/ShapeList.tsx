import { useEffect, useRef } from "react";
import styled from "styled-components";
import { SHAPES, type Shapes } from "@/data";
import { useControlsStore } from "@/store";
import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";
import { Label as _Label } from "@/parts";
import { glassEffectShadow } from "@/constants";

const Wrapper = styled.div`
  width: 200px;
  border: 1px solid var(--border);
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
  width: 100%;
`;

const ShapeItem = styled.div<{ $isActive: boolean }>`
  flex: 0 0 200px;
  min-width: 200px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 13px;
`;

const Label = styled(_Label)`
  padding: 4px 8px;
`;

const ShapeCarousel = () => {
  const activeShapeId = useControlsStore((state) => state.shapeId);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

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

      // Wyłączamy smooth scroll tylko na czas ręcznego skrolowania kółkiem
      scrollElement.style.scrollBehavior = "auto";

      const scrollSpeedMultiplier = 0.9; // Przy wyłączonym smooth, 2.5 powinno być już bardzo szybkie
      scrollElement.scrollLeft += wheelEvent.deltaY * scrollSpeedMultiplier;

      // Przywracamy smooth scroll po krótkiej chwili (żeby snapping dalej był płynny)
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
    const scrollElement = carouselWrapperRef.current;
    if (!scrollElement) return;

    let snapTimer: ReturnType<typeof setTimeout>;

    const handleScrollSnap = () => {
      clearTimeout(snapTimer);

      snapTimer = setTimeout(() => {
        const currentScroll = scrollElement.scrollLeft;
        const itemWidth = scrollElement.offsetWidth;

        const targetIndex = Math.round(currentScroll / itemWidth);
        const targetLeft = targetIndex * itemWidth;

        const isNotAligned = Math.abs(currentScroll - targetLeft) > 1;

        if (isNotAligned) {
          scrollElement.scrollTo({
            left: targetLeft,
            behavior: "smooth",
          });
        }
      }, 1000);
    };

    scrollElement.addEventListener("scroll", handleScrollSnap);
    return () => {
      scrollElement.removeEventListener("scroll", handleScrollSnap);
      clearTimeout(snapTimer);
    };
  }, []);

  useEffect(() => {
    const container = carouselWrapperRef.current;
    if (!container) return;

    const scrollSyncTimer = setTimeout(() => {
      const activeElement = container.querySelector(
        `[data-active-shape="true"]`,
      ) as HTMLElement;

      if (activeElement) {
        const containerRect = container.getBoundingClientRect();
        const activeItemRect = activeElement.getBoundingClientRect();

        const isLeftEdgeVisible = activeItemRect.left >= containerRect.left;
        const isRightEdgeVisible = activeItemRect.right <= containerRect.right;

        if (isLeftEdgeVisible && isRightEdgeVisible) return;

        let calculatedTargetScroll = container.scrollLeft;

        if (!isLeftEdgeVisible) {
          calculatedTargetScroll =
            container.scrollLeft + (activeItemRect.left - containerRect.left);
        } else if (!isRightEdgeVisible) {
          calculatedTargetScroll =
            container.scrollLeft + (activeItemRect.right - containerRect.right);
        }

        container.scrollTo({
          left: calculatedTargetScroll,
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(scrollSyncTimer);
  }, [currentActiveId]);

  return (
    <div>
      <Label>You are currenly learning</Label>
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
    </div>
  );
};

export default ShapeCarousel;
