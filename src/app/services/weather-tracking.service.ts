import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { weather } from '../model/weather';
import { throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherTrackingService {

  private weatherDataSubject = new Subject<weather>();
  weatherData$ = this.weatherDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getWeather() {
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=45b8474fde374c41ac3134812232811&q=London&aqi=no`;

    return this.http.get<any>(API_URL);

  }

}
