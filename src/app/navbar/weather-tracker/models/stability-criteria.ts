import { FishSpecies } from "./fish.model";

export interface StabilityCriteria {
  tempThreshold: number;
  windThreshold: number;
  rainThreshold: number;
  cloudThreshold: number;
  uvThreshold: number;
}

export const stabilityCriteriaMap: Record<FishSpecies, StabilityCriteria> = {
  pike: { tempThreshold: 2, windThreshold: 4, rainThreshold: 1, cloudThreshold: 20, uvThreshold: 2 },
  perch: { tempThreshold: 3, windThreshold: 5, rainThreshold: 2, cloudThreshold: 30, uvThreshold: 3 },
  bass: { tempThreshold: 2.5, windThreshold: 4, rainThreshold: 1.5, cloudThreshold: 20, uvThreshold: 2 },
  trout: { tempThreshold: 1.5, windThreshold: 3, rainThreshold: 1, cloudThreshold: 15, uvThreshold: 1 },
};
