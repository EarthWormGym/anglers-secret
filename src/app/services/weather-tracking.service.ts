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

  getCurrentWeather(location: string) {
    return this.http.get<any>(`/api/weather?location=${location}`).pipe(
      map((requestData) => this.mapWeather(requestData)),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        return throwError(error);
      })
    ).subscribe((weatherData: weather) => {
      this.weatherDataSubject.next(weatherData);
    });

  }

  private mapWeather(requestData: any): weather {
    return {
      weatherId: Math.floor(Math.random() * 10000),
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
