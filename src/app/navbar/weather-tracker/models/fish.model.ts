export enum FishSpecies {
  PIKE = 'pike',
  PERCH = 'perch',
  BASS = 'bass',
  TROUT = 'trout',
}

export type FishStabilityLevel = 'poor' | 'caution' | 'good';

export type FishStabilityMap = {
  [key in FishSpecies]: FishStabilityLevel;
};
