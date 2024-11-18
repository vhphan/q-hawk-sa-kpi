export function yAxisLabelFormatter(value) {
  if (value >= 1000_000) {
    return `${(value / 1000_000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
    // return value.toExponential(0);
  }
  if (!Number.isInteger(value)) {
    return value.toFixed(2);
  }
  return value;
}
