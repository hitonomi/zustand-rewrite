import { useBearStore } from "./bearsStore";

export const BearCounter = () => {
  const bears = useBearStore((state) => state.bears);

  return <h1>{bears} around here ...</h1>;
};

export const Controls = () => {
  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return <button onClick={increasePopulation}>one up</button>;
};
