import { useEffect, useRef, useState } from "react";
import { SHAPES, type Shapes } from "@/data";
import { useControlsStore } from "@/store";
import * as S from "./parts";

const EMPTY_ID = "empty_placeholder";

const ShapeCarousel = () => {
  const activeShapeId = useControlsStore((state) => state.shapeId);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const shapeKeys = Object.keys(SHAPES) as (keyof Shapes)[];

  const currentActiveId = activeShapeId || EMPTY_ID;

  useEffect(() => {
    const el = carouselWrapperRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 0 || e.shiftKey) return;
      e.preventDefault();

      el.style.scrollBehavior = "auto";
      el.scrollLeft += e.deltaY * 0.5;

      const timer = setTimeout(() => {
        el.style.scrollBehavior = "smooth";
      }, 50);
      return () => clearTimeout(timer);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const container = carouselWrapperRef.current;
    if (!container) return;

    let snapTimer: ReturnType<typeof setTimeout>;

    const scrollToTarget = () => {
      const targetElement = container.querySelector(
        `[data-id="${currentActiveId}"]`,
      ) as HTMLElement;

      if (targetElement) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        const isFullyVisible =
          targetRect.left >= containerRect.left &&
          targetRect.right <= containerRect.right;

        if (isFullyVisible) return;

        container.scrollTo({
          left: container.scrollLeft + (targetRect.left - containerRect.left),
          behavior: "smooth",
        });
      }
    };

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / S.ITEM_WIDTH);
      setVisibleIndex(index);

      clearTimeout(snapTimer);
      snapTimer = setTimeout(scrollToTarget, 3000);
    };

    container.addEventListener("scroll", handleScroll);
    scrollToTarget();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(snapTimer);
    };
  }, [currentActiveId]);

  return (
    <S.RelativeContainer>
      <S.Label>You are currently learning</S.Label>
      <S.Wrapper ref={carouselWrapperRef}>
        <S.ScrollContainer>
          <S.ShapeItem
            $isActive={currentActiveId === EMPTY_ID}
            data-id={EMPTY_ID}
          />

          {shapeKeys.map((key) => {
            const shape = SHAPES[key];
            const isActive = activeShapeId === key;
            const isArpeggio = shape.type.toLowerCase().includes("arpeggio");
            const displayLabel = isArpeggio ? `X${shape.label}` : shape.label;

            return (
              <S.ShapeItem key={key} $isActive={isActive} data-id={key}>
                {displayLabel} {shape.type}
              </S.ShapeItem>
            );
          })}
        </S.ScrollContainer>
      </S.Wrapper>

      <S.Indicators>
        {shapeKeys.map((_, index) => {
          const isThisDotActive = visibleIndex === index + 1;
          return <S.Dot key={index} $active={isThisDotActive} />;
        })}
      </S.Indicators>
    </S.RelativeContainer>
  );
};

export default ShapeCarousel;
