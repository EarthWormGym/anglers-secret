import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishFavouritesComponent } from './fish-favourites.component';

describe('FishFavouritesComponent', () => {
  let component: FishFavouritesComponent;
  let fixture: ComponentFixture<FishFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishFavouritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
