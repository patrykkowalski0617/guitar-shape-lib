import { Separator } from "../Separator";

export function BaseChordLabel() {
  return (
    <div className="flex py-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground/100 text-center">
      <div className="min-w-[70px]">Key</div>
      <Separator />
      <div className="w-full">Chords</div>
    </div>
  );
}
