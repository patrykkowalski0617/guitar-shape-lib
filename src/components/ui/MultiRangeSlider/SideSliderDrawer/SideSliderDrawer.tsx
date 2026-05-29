import { useState, useRef, useEffect } from "react";
import * as S from "./parts";
import { ChevronRight } from "lucide-react";

interface SideSliderDrawerProps {
  children: React.ReactNode;
}

export const SideSliderDrawer = ({ children }: SideSliderDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <S.SideSliderDrawerContent $isOpen={isOpen} ref={ref}>
      <S.SideSliderDrawerButton
        $isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ChevronRight />
      </S.SideSliderDrawerButton>
      {children}
    </S.SideSliderDrawerContent>
  );
};
