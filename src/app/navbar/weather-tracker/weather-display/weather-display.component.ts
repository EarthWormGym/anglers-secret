import { Component } from '@angular/core';
import { WeatherTrackingService } from '../services/weather-tracking.service';
import { Observable } from 'rxjs';
import { currentWeather } from '../models/currentWeather';
import { historicalWeather } from '../models/historicalWeather';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss'
})
export class WeatherDisplayComponent {
  private weatherTracker: WeatherTrackingService;
  public currentWeatherData$?: Observable<currentWeather>;
  public historicalWeatherData$?: Observable<Array<historicalWeather>>;

  constructor(weatherTracker: WeatherTrackingService) { 
    this.weatherTracker = weatherTracker;
  }

  ngOnInit() {
    this.currentWeatherData$ = this.weatherTracker.currentWeatherData$;
    this.historicalWeatherData$ = this.weatherTracker.historicalWeatherData$;
  }
}
