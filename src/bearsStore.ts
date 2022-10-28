import { create } from "./lib/index";

// Why didnt it infer the type properly?
export const useBearStore = create<{
  bears: number;
  increasePopulation: () => void;
}>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));
