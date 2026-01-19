import { useTutorialStore, tutorialData } from "@/store/useTutorialStore";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TutorialBox = () => {
  const { activeIndex, setActiveIndex } = useTutorialStore();
  const current = tutorialData[activeIndex];

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + tutorialData.length) % tutorialData.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % tutorialData.length);
  };

  return (
    <div className="flex flex-col border p-4 rounded-lg justify-between text-center">
      <div className="space-y-2">
        <h4 className="font-bold text--secondary">Tutorial: {current.title}</h4>
        <p className="text-sm text-muted-foreground max-w-md m-auto min-h-[4rem]">
          {current.description}
        </p>
      </div>

      <div className="flex lg:hidden items-center justify-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          className="text-muted-foreground hover:text-[var(--secondary)] transition-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          {tutorialData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "w-[6px] h-[6px] rounded-full transition-none",
                idx === activeIndex ? "bg-[var(--secondary)]" : "bg-muted"
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-muted-foreground hover:text-[var(--secondary)] transition-none"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
