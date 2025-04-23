import { FishSpecies } from "./fish.model";

export interface StabilityCriteria {
  tempThreshold: number;
  windThreshold: number;
  rainThreshold: number;
  cloudThreshold: number;
  uvThreshold: number;
}

export const stabilityCriteriaMap: Record<FishSpecies, StabilityCriteria> = {
  pike:         { tempThreshold: 2,   windThreshold: 4,   rainThreshold: 1,   cloudThreshold: 20, uvThreshold: 2 },
  perch:        { tempThreshold: 3,   windThreshold: 5,   rainThreshold: 2,   cloudThreshold: 30, uvThreshold: 3 },
  bass:         { tempThreshold: 2.5, windThreshold: 4,   rainThreshold: 1.5, cloudThreshold: 20, uvThreshold: 2 },
  trout:        { tempThreshold: 1.5, windThreshold: 3,   rainThreshold: 1,   cloudThreshold: 15, uvThreshold: 1 },
  commonCarp:   { tempThreshold: 3,   windThreshold: 5,   rainThreshold: 2.5, cloudThreshold: 30, uvThreshold: 3 },
  mirrorCarp:   { tempThreshold: 3,   windThreshold: 5,   rainThreshold: 2.5, cloudThreshold: 30, uvThreshold: 3 },
  barbel:       { tempThreshold: 2.5, windThreshold: 4,   rainThreshold: 2,   cloudThreshold: 25, uvThreshold: 2 },
  salmon:       { tempThreshold: 1.5, windThreshold: 3,   rainThreshold: 1,   cloudThreshold: 15, uvThreshold: 1 },
  catfish:      { tempThreshold: 3.5, windThreshold: 6,   rainThreshold: 2,   cloudThreshold: 30, uvThreshold: 3 },
  chubb:        { tempThreshold: 2,   windThreshold: 4,   rainThreshold: 1.5, cloudThreshold: 20, uvThreshold: 2 },
  sturgeon:     { tempThreshold: 1.5, windThreshold: 3,   rainThreshold: 1,   cloudThreshold: 15, uvThreshold: 1 },
  zander:       { tempThreshold: 2.5, windThreshold: 5,   rainThreshold: 1.5, cloudThreshold: 25, uvThreshold: 2 },
};
