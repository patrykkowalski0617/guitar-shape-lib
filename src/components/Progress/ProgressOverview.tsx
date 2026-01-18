import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/useProgressStore";
import shapes from "@/utils/shapes";

export const ProgressOverview = () => {
  const { learned, learning } = useProgressStore();

  return (
    <div className="space-y-6 p-4">
      {Object.entries(shapes).map(([id, shape]) => {
        const variantIds = Object.keys(shape.shapesCoordinates);
        const learnedCount = variantIds.filter((v) => learned.includes(v)).length;
        const learningCount = variantIds.filter((v) => learning.includes(v)).length;
        const total = variantIds.length;

        if (total === 0) return null;

        return (
          <div key={id} className="border-b pb-4 border-muted-foreground/20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{shape.label}</h3>
              <span className="text-xs text-muted-foreground uppercase">
                {learnedCount} / {total} Nauczone
              </span>
            </div>

            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
              <div
                className="bg-secondary h-full transition-all"
                style={{ width: `${(learnedCount / total) * 100}%` }}
              />
              <div
                className="bg-primary h-full transition-all"
                style={{ width: `${(learningCount / total) * 100}%` }}
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {variantIds.map((vId) => {
                const isLearned = learned.includes(vId);
                const isLearning = learning.includes(vId);

                return (
                  <div
                    key={vId}
                    className={cn(
                      "text-[10px] px-2 py-1 rounded border transition-colors",
                      isLearned && "bg-secondary/20 border-secondary text-secondary",
                      isLearning && "bg-primary/20 border-primary text-primary",
                      !isLearned &&
                        !isLearning &&
                        "bg-muted/30 border-transparent text-muted-foreground"
                    )}
                  >
                    {vId}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
