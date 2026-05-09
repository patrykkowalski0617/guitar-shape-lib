export type Exact<Target, T> = Target & {
  [K in keyof T]: K extends keyof Target ? T[K] : never;
};
