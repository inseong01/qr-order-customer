import { StateCreator } from "zustand";

// zustand
export type SliceCreator<T> = StateCreator<
  T,
  [["zustand/devtools", never]],
  [],
  T
>;
