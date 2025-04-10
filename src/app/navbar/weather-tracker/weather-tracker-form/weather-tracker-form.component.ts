import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { WeatherTrackingService } from '../services/weather-tracking.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-weather-tracker-form',
    templateUrl: './weather-tracker-form.component.html',
    styleUrl: './weather-tracker-form.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherTrackerFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private weatherService = inject(WeatherTrackingService);

  weatherTrackerForm: FormGroup = new FormGroup({});
  locationControl: FormControl = new FormControl('', Validators.required);
  daysControl: FormControl = new FormControl('', Validators.required);

  days = [1, 2, 3, 4, 5, 6, 7];

  ngOnInit(): void {
    this.constructForm();
  }

  constructForm() {
    this.weatherTrackerForm = this.fb.group({
      location: this.locationControl,
      days: this.daysControl
    });
  }

  onSubmit() {
    this.weatherService.loadingWeatherData.set(true);
    const location = this.weatherTrackerForm.get('location')?.value;
    const days = this.weatherTrackerForm.get('days')?.value;
    if (location && days) {
      this.weatherService.getMultipleHistoricalWeather(location, Number(days)).pipe(
        switchMap(async () => this.weatherService.getCurrentWeather(location))
      ).subscribe();
    }
  }
}
