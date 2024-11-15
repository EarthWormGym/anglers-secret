import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrentWeather } from '../models/current-weather';
import { HistoricalWeather } from '../models/historical-weather';
import { throwError, Subject, BehaviorSubject, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherTrackingService {

  private static readonly CURRENT_WEATHER_PATH = '/api/weather/current';
  private static readonly HISTORICAL_WEATHER_PATH = '/api/weather/historical';

  private currentWeatherDataSubject = new Subject<CurrentWeather>();
  currentWeatherData$ = this.currentWeatherDataSubject.asObservable();

  private historicalWeatherDataSubject = new BehaviorSubject<HistoricalWeather[]>([]);
  historicalWeatherData$ = this.historicalWeatherDataSubject.asObservable();

  private loadingWeatherDataSubject = new BehaviorSubject<boolean>(false);
  loadingWeatherData$ = this.loadingWeatherDataSubject.asObservable();

  private http = inject(HttpClient);

  getCurrentWeather(location: string) {
    let params = new HttpParams();
    params = params.set('location', location);

    this.loadingWeatherDataSubject.next(true);
    return this.http.get<any>(WeatherTrackingService.CURRENT_WEATHER_PATH, { params }).pipe(
      map((requestData) => this.mapCurrentWeather(requestData)),
    ).subscribe((weatherData: CurrentWeather) => {
      this.currentWeatherDataSubject.next(weatherData);
    });
  }

  getHistoricalWeather(location: string, date: string) {
    let params = new HttpParams();
    params = params.set('location', location);
    params = params.set('date', date);

    return this.http.get<any>(WeatherTrackingService.HISTORICAL_WEATHER_PATH, { params }).pipe(
      map((requestData) => this.mapHistoricalWeather(requestData))
    );
  }

  getMultipleHistoricalWeather(location: string, days: number) {
    const requests = [];
    
    for (let i = days; i >= 1; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      requests.push(
        this.getHistoricalWeather(location, date.toISOString().split('T')[0]),
      );
    }

    return forkJoin(requests).subscribe(
      (weatherDataArray: HistoricalWeather[]) => {
        const currentData = this.historicalWeatherDataSubject.value;
        this.historicalWeatherDataSubject.next([
          ...currentData,
          ...weatherDataArray,
        ]);
      },
    );
  }

  private mapCurrentWeather(requestData: any): CurrentWeather {
    return {
      weatherId: Math.floor(Math.random() * 10000),
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
      weatherId: Math.floor(Math.random() * 10000),
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
