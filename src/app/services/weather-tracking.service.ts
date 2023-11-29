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

  getCurrentWeather(location: any) {
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=45b8474fde374c41ac3134812232811&q=${location}&aqi=no`;

    let weatherId = Math.floor(Math.random() * 10000);

    return this.http.get<any>(API_URL).pipe(
      map((requestData) => this.mapWeather(weatherId, requestData)),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        return throwError(error);
      })
    ).subscribe((weatherData: weather) => {
      this.weatherDataSubject.next(weatherData);
    });

  }

  private mapWeather(weatherId: number, requestData: any): weather {
    return {
      weatherId: weatherId,
      data: {
        location: {
          name: requestData.location.name,
          region: requestData.location.region,
          country: requestData.location.country
        },
        currentWeather: {
          lastUpdated: requestData.current.last_updated,
          tempC: requestData.current.temp_c,
          tempF: requestData.current.temp_f,
          windMph: requestData.current.wind_mph,
          windKph: requestData.current.wind_kph,
        }
      }
    } as weather;
  }

}
