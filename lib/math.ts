export const randomRange = (min: number, max: number) => {
  console.assert(min <= max, "min should be less than or equal to max");

  return Math.random() * (max - min) + min;
};

export const clamp = (min: number, max: number) => (value: number) => {
  if (value <= min) return min;
  if (value >= max) return max;
  return value;
};
