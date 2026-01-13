export const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5 ml-1">
    {children}
  </span>
);

export const GroupWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col ">{children}</div>
);
