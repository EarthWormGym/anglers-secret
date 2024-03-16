import { TestBed } from '@angular/core/testing';

import { WeatherTrackingService } from './weather-tracking.service';

describe('WeatherTrackingService', () => {
  let service: WeatherTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
