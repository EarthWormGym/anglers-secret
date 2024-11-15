import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTrackerFormComponent } from './weather-tracker-form.component';

describe('WeatherTrackerFormComponent', () => {
  let component: WeatherTrackerFormComponent;
  let fixture: ComponentFixture<WeatherTrackerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherTrackerFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherTrackerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
