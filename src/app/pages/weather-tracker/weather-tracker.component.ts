import { Component, OnInit } from '@angular/core';
import { WeatherTrackingService } from '../../services/weather-tracking.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-tracker',
  templateUrl: './weather-tracker.component.html',
  styleUrl: './weather-tracker.component.scss'
})
export class WeatherTrackerComponent implements OnInit {
  private weatherTracker: WeatherTrackingService;
  public weatherData$: Observable<any>;

  constructor(weatherTracker: WeatherTrackingService) {
    this.weatherTracker = weatherTracker;
    this.weatherData$ = this.weatherTracker.getWeather();
  }

  ngOnInit() {
    this.weatherData$.subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

}
