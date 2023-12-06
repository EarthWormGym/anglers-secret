import { Component } from '@angular/core';
import { WeatherTrackingService } from '../../../services/weather-tracking.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss'
})
export class LocationFormComponent {
  submitted = false;

  //Initialize form here due to strict property initialization
  locationForm = this.fb.group({
    location: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private weatherService: WeatherTrackingService) { }

  onSubmit() {
    const location = this.locationForm.get('location');
    if (location && location.value) {
      this.weatherService.getCurrentWeather(location.value!);
      this.submitted = true;
      this.locationForm.reset();
    }
  }

  historicalWeather() {
    this.weatherService.getHistoricalWeather();
  }

}
