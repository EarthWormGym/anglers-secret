import { Component, inject } from '@angular/core';
import { WeatherTrackingService } from '../services/weather-tracking.service';
import { Observable } from 'rxjs';
import { CurrentWeather } from '../models/current-weather';
import { HistoricalWeather } from '../models/historical-weather';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss'
})
export class WeatherDisplayComponent {

  private weatherTrackerService = inject(WeatherTrackingService);

  public currentWeatherData$?: Observable<CurrentWeather>;
  public historicalWeatherData$?: Observable<Array<HistoricalWeather>>;

  ngOnInit() {
    this.currentWeatherData$ = this.weatherTrackerService.currentWeatherData$;
    this.historicalWeatherData$ = this.weatherTrackerService.historicalWeatherData$;
  }
}
