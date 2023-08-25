export const randomRange = (min: number, max: number) => {
  console.assert(min <= max, "min should be less than or equal to max");

  return Math.random() * (max - min) + min;
};

export const clamp = (min: number, max: number) => (value: number) => {
  return Math.min(Math.max(value, min), max);
};
