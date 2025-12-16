interface UseWaterGaugeLinesParams {
  dailyWaterGoal: number;
  minorStepLiters?: number; // default 250ml
  majorStepLiters?: number; // default 1000ml
}

export function useWaterGaugeLines({
  dailyWaterGoal,
  minorStepLiters = 250,
  majorStepLiters = 1000,
}: UseWaterGaugeLinesParams) {
  // round goal up so top tick exists (2.4 → 2.5)
  const roundedGoal =
    Math.ceil(dailyWaterGoal / minorStepLiters) * minorStepLiters;

  const lines = Math.round(roundedGoal / minorStepLiters);
  const majorEvery = Math.round(majorStepLiters / minorStepLiters);

  return {
    lines,
    majorEvery,
    roundedGoal,
  };
}
