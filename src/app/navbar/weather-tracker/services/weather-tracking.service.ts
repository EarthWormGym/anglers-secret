import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrentWeather } from '../models/current-weather';
import { HistoricalWeather } from '../models/historical-weather';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherTrackingService {

  private static readonly CURRENT_WEATHER_PATH = '/api/weather/current';
  private static readonly HISTORICAL_WEATHER_PATH = '/api/weather/historical';

  private currentWeatherDataSubject = new BehaviorSubject<CurrentWeather | null>(null);
  currentWeatherData$ = this.currentWeatherDataSubject.asObservable();

  private historicalWeatherDataSubject = new BehaviorSubject<HistoricalWeather[]>([]);
  historicalWeatherData$ = this.historicalWeatherDataSubject.asObservable();

  loadingWeatherData = signal<boolean>(false);
  displayWeatherData = signal<boolean>(false);

  private http = inject(HttpClient);

  getCurrentWeather(location: string) {
    let params = new HttpParams().set('location', location);

    return this.http.get<any>(WeatherTrackingService.CURRENT_WEATHER_PATH, { params }).pipe(
      map((requestData) => new CurrentWeather(requestData)),
    ).subscribe({
      next: (weatherData: CurrentWeather) => {
        this.currentWeatherDataSubject.next(weatherData);
      },
      complete: () => {
        this.loadingWeatherData.set(false);
        this.displayWeatherData.set(true);
      }
    });
  }

  getMultipleHistoricalWeather(location: string, days: number): Observable<HistoricalWeather[]> {
    const requests = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i + 1));
      return this.getHistoricalWeather(location, date.toISOString().split('T')[0]);
    });
  
    return forkJoin(requests).pipe(
      tap((weatherDataArray: HistoricalWeather[]) => {
        const currentData = this.historicalWeatherDataSubject.value || [];
        this.historicalWeatherDataSubject.next([...currentData, ...weatherDataArray]);
      })
    );
  }

  private getHistoricalWeather(location: string, date: string) {
    let params = new HttpParams();
    params = params.set('location', location);
    params = params.set('date', date);

    return this.http.get<any>(WeatherTrackingService.HISTORICAL_WEATHER_PATH, { params }).pipe(
      map((requestData) => new HistoricalWeather(requestData))
    );
  }

}
