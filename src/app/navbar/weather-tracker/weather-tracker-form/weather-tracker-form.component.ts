import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { WeatherTrackingService } from '../services/weather-tracking.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { forkJoin, last, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  submitted = signal<boolean>(false);

  weatherTrackerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.weatherTrackerForm = this.fb.group({
      location: ['', Validators.required],
      days: ['', Validators.required],
    });
  }

  onSubmit() {
    this.weatherService.loadingWeatherData.set(true);
    const location = this.weatherTrackerForm.get('location');
    const days = this.weatherTrackerForm.get('days');
    if (location && location.value && days && days.value) {
      this.weatherService.getMultipleHistoricalWeather(location.value!, Number(days.value!)).pipe(
        switchMap(async () => this.weatherService.getCurrentWeather(location.value))
      ).subscribe();
      this.submitted.set(true);
    }
  }
}
