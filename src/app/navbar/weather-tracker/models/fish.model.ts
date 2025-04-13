export enum FishSpecies {
  Pike = 'pike',
  Perch = 'perch',
  Bass = 'bass',
  Trout = 'trout',
}

export type FishingReadinessLevel = 'poor' | 'caution' | 'good';

export type FishingReadinessMap = {
  [key in FishSpecies]: FishingReadinessLevel;
};