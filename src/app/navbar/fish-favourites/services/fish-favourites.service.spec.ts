import { TestBed } from '@angular/core/testing';

import { FishFavouritesService } from './fish-favourites.service';

describe('FishFavouritesService', () => {
  let service: FishFavouritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishFavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
