import { create } from "./lib/index";

export const useBearStore = create<{
  bears: number;
  increasePopulation: () => void;
}>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));
