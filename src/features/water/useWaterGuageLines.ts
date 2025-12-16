interface UseWaterGaugeLinesParams {
  goalLiters: number;
  minorStepLiters?: number; // default 0.25L
  majorStepLiters?: number; // default 1L
}

export function useWaterGaugeLines({
  goalLiters,
  minorStepLiters = 0.25,
  majorStepLiters = 1,
}: UseWaterGaugeLinesParams) {
  // round goal up so top tick exists (2.4 → 2.5)
  const roundedGoal = Math.ceil(goalLiters / minorStepLiters) * minorStepLiters;

  const lines = Math.round(roundedGoal / minorStepLiters);
  const majorEvery = Math.round(majorStepLiters / minorStepLiters);

  return {
    lines,
    majorEvery,
    roundedGoal,
  };
}
