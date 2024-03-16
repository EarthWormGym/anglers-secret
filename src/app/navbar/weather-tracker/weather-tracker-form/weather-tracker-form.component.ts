import { Component } from '@angular/core';
import { WeatherTrackingService } from '../services/weather-tracking.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-tracker-form',
  templateUrl: './weather-tracker-form.component.html',
  styleUrl: './weather-tracker-form.component.scss'
})
export class WeatherTrackerFormComponent {
  submitted = false;

  //Initialize form here due to strict property initialization
  weatherTrackerForm = this.fb.group({
    location: ['', Validators.required],
    days: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private weatherService: WeatherTrackingService) { }

  onSubmit() {
    const location = this.weatherTrackerForm.get('location');
    const days = this.weatherTrackerForm.get('days');
    if (location && location.value && days && days.value) {
      this.weatherService.getCurrentWeather(location.value!);
      this.weatherService.getMultipleHistoricalWeather(location.value!, Number(days.value!));
      this.submitted = true;
      this.weatherTrackerForm.reset();
    }
  }

}
