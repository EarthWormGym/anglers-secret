import { TestBed } from '@angular/core/testing';

import { FishStabilityService } from './fish-stability.service';

describe('FishStabilityService', () => {
  let service: FishStabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishStabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
