import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrentWeather } from '../models/current-weather';
import { HistoricalWeather } from '../models/historical-weather';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

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
      map((requestData) => this.mapCurrentWeather(requestData)),
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
      map((requestData) => this.mapHistoricalWeather(requestData))
    );
  }
  
  private mapCurrentWeather(requestData: any): CurrentWeather {
    return {
      weatherId: uuidv4(),
      data: {
        location: {
          name: requestData.location.name,
          region: requestData.location.region,
          country: requestData.location.country,
        },
        currentWeather: {
          lastUpdated: requestData.current.last_updated,
          tempC: requestData.current.temp_c,
          windMph: requestData.current.wind_mph,
          precipMm: requestData.current.precip_mm,
          cloudCover: requestData.current.cloud,
          uv: requestData.current.uv,
        },
      },
    } as CurrentWeather;
  }

  private mapHistoricalWeather(requestData: any): HistoricalWeather {
    return {
      weatherId: uuidv4(),
      data: {
        location: {
          name: requestData.location.name,
          region: requestData.location.region,
          country: requestData.location.country,
        },
        historicalWeather: {
          date: requestData.forecast.forecastday[0].date,
          tempC: requestData.forecast.forecastday[0].day.avgtemp_c,
          totalPrecipMm: requestData.forecast.forecastday[0].day.totalprecip_mm,
          uv: requestData.forecast.forecastday[0].day.uv,
          morning: {
            cloudCover: requestData.forecast.forecastday[0].hour[7].cloud,
            precipMm: requestData.forecast.forecastday[0].hour[7].precip_mm,
            windMph: requestData.forecast.forecastday[0].hour[7].wind_mph,
            humidity: requestData.forecast.forecastday[0].hour[7].humidity,
          },
          midday: {
            cloudCover: requestData.forecast.forecastday[0].hour[12].cloud,
            precipMm: requestData.forecast.forecastday[0].hour[12].precip_mm,
            windMph: requestData.forecast.forecastday[0].hour[12].wind_mph,
            humidity: requestData.forecast.forecastday[0].hour[12].humidity,
          },
          evening: {
            cloudCover: requestData.forecast.forecastday[0].hour[18].cloud,
            precipMm: requestData.forecast.forecastday[0].hour[18].precip_mm,
            windMph: requestData.forecast.forecastday[0].hour[18].wind_mph,
            humidity: requestData.forecast.forecastday[0].hour[18].humidity,
          },
        },
      },
    } as HistoricalWeather;
  }
}
