// SideSliderDrawer.tsx
import { useRef, useEffect, useState } from "react";
import * as S from "./parts";
import { ChevronRight } from "lucide-react";

interface SideSliderDrawerProps {
  children: React.ReactNode;
}

export const SideSliderDrawer = ({ children }: SideSliderDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderWidth, setSliderWidth] = useState<number | null>(null);
  const [offsetFromWindow, setOffsetFromWindow] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current && innerRef.current) {
        setSliderWidth(innerRef.current.scrollWidth);
        setOffsetFromWindow(wrapperRef.current.getBoundingClientRect().left);
      }
    };
    const observer = new ResizeObserver(measure);
    if (innerRef.current) observer.observe(innerRef.current);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const sw = sliderWidth ?? 0;
  const translateX =
    sliderWidth === null
      ? "0px"
      : isOpen
        ? `${(offsetFromWindow - 10) * -1}px`
        : `${(offsetFromWindow + sw + 10) * -1}px`;

  return (
    <S.SideSliderDrawerWrapper ref={wrapperRef}>
      <S.SideSliderDrawerContent
        $translateX={translateX}
        $sliderWidth={sliderWidth}
        $isInitialized={sliderWidth !== null}
      >
        <S.SideSliderDrawerButton
          $isOpen={isOpen}
          $sliderWidth={sliderWidth}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ChevronRight />
        </S.SideSliderDrawerButton>
        <div ref={innerRef} style={{ height: "100%", width: "fit-content" }}>
          {children}
        </div>
      </S.SideSliderDrawerContent>
    </S.SideSliderDrawerWrapper>
  );
};
