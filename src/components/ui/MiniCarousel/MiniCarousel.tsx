import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import * as S from "./parts";

interface MiniCarouselProps<T> {
  items: T[];
  activeId?: string | number | null;
  label: string;
  activeLabel?: string;
  renderItem: (item: T, isActive: boolean) => ReactNode;
  getItemId: (item: T) => string;
}

export function MiniCarousel<T>({
  items,
  activeId,
  label,
  activeLabel,
  renderItem,
  getItemId,
}: MiniCarouselProps<T>) {
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const autoPlayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const scrollToActive = useCallback(() => {
    if (!activeId) return;

    const container = carouselWrapperRef.current;
    const targetElement = container?.querySelector(
      `[data-id="${activeId}"]`,
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
  }, [activeId]);

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
        const nextIndex = (prevIndex + 1) % items.length;
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
        if (activeId) scrollToActive();
      }, 2000);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeId, scrollToActive]);

  useEffect(() => {
    const shouldAutoPlay = !activeId && !isUserInteracting;
    if (shouldAutoPlay) startAutoPlay();
    else clearAutoPlay();
    return () => clearAutoPlay();
  }, [activeId, isUserInteracting, items.length]);

  useEffect(() => {
    scrollToActive();
  }, [activeId, scrollToActive]);

  return (
    <S.RelativeContainer>
      <S.Label>{activeId && activeLabel ? activeLabel : label}</S.Label>
      <S.Wrapper
        ref={carouselWrapperRef}
        style={{
          scrollSnapType: isUserInteracting ? "x mandatory" : "none",
        }}
      >
        <S.ScrollContainer>
          {items.map((item) => {
            const id = getItemId(item);
            const isActive = activeId === id;
            return (
              <S.ItemWrapper
                key={id}
                $isActive={isActive}
                data-id={id}
                style={{ scrollSnapAlign: "start" }}
              >
                {renderItem(item, isActive)}
              </S.ItemWrapper>
            );
          })}
        </S.ScrollContainer>
      </S.Wrapper>

      <S.Indicators>
        {items.map((_, index) => (
          <S.Dot key={index} $active={visibleIndex === index} />
        ))}
      </S.Indicators>
    </S.RelativeContainer>
  );
}
