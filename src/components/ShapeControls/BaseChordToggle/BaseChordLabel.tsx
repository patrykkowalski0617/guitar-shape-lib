import { Separator } from "../Separator";

export function BaseChordLabel() {
  return (
    <div className="flex py-1 px-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground/100 text-center">
      <div className="text-left">Key</div>
      <Separator />
      <div className="w-full text-right">Chords</div>
    </div>
  );
}
