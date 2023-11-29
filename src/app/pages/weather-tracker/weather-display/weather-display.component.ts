import { Component } from '@angular/core';
import { WeatherTrackingService } from '../../../services/weather-tracking.service';
import { weather } from '../../../model/weather';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss'
})
export class WeatherDisplayComponent {
  private weatherTracker: WeatherTrackingService;
  public weatherData$?: Observable<weather>;

  constructor(weatherTracker: WeatherTrackingService) { 
    this.weatherTracker = weatherTracker;
  }

  ngOnInit() {
    this.weatherData$ = this.weatherTracker.weatherData$;
  }
}
