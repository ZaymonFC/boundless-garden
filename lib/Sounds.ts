let zzfx = (..._: any) => {
  console.error("zzfx not loaded");
};

// Next.JS client side only.
if (typeof window !== "undefined") {
  zzfx = require("zzfx").zzfx;
}

export const sfxAtlas = {
  boot: [1, , 57, 0.01, 0.14, 0.27, , 1.94, , -3.5, 19, 0.06, 0.13, , , , 0.07, 0.99, 0.09, 0.1],
  powerup: [0.9, 0.01, 657, 0.01, 0.07, 0.4, 1, 0.6, , , 150, , 0.08, , , , , 0.56, 0.01, 0.3],
  blip: [, 0.01, 391.9954, 0.01, 0.01, 0.02, , 1.59, , , , , , , , , 0.07],
  hit: [4.37, , 149, 0.03, , , , 1.68, -2.2, , , , , 1.3, -199, 0.1, 0.05, 0.94, 0.02, 0.22],
} as const;

type ZzfxModifiers = {
  pitch?: number;
};

export const playSfx = ([volume, randomness, freq, ...rest]: any, modifiers?: ZzfxModifiers) => {
  zzfx(volume, randomness, freq + (modifiers?.pitch ?? 0), ...rest);
};
