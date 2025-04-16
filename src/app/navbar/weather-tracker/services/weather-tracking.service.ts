import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrentWeather } from '../models/current-weather';
import { HistoricalWeather } from '../models/historical-weather';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FishSpecies, FishStabilityLevel, FishStabilityMap } from '../models/fish.model';

interface StabilityCriteria {
  tempThreshold: number;
  windThreshold: number;
  rainThreshold: number;
  cloudThreshold: number;
  uvThreshold: number;
}

const stabilityCriteriaMap: Record<FishSpecies, StabilityCriteria> = {
  pike: { tempThreshold: 2, windThreshold: 4, rainThreshold: 1, cloudThreshold: 20, uvThreshold: 2 },
  perch: { tempThreshold: 3, windThreshold: 5, rainThreshold: 2, cloudThreshold: 30, uvThreshold: 3 },
  bass: { tempThreshold: 2.5, windThreshold: 4, rainThreshold: 1.5, cloudThreshold: 20, uvThreshold: 2 },
  trout: { tempThreshold: 1.5, windThreshold: 3, rainThreshold: 1, cloudThreshold: 15, uvThreshold: 1 },
};

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
  fishStability = signal<FishStabilityMap | null>(null);

  private http = inject(HttpClient);

  getCurrentWeather(location: string): Observable<CurrentWeather> {
    let params = new HttpParams().set('location', location);
  
    return this.http.get<any>(WeatherTrackingService.CURRENT_WEATHER_PATH, { params }).pipe(
      map((requestData) => new CurrentWeather(requestData)),
      tap((weatherData: CurrentWeather) => {
        this.currentWeatherDataSubject.next(weatherData);
      })
    );
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

  computeSpeciesStability(
    history: HistoricalWeather[],
    species: FishSpecies
  ): number[] {
    const crit = stabilityCriteriaMap[species];
    const scores: number[] = [];
  
    for (let i = 0; i < history.length - 1; i++) {
      const today = history[i].data.historicalWeather;
      const yesterday = history[i + 1].data.historicalWeather;
  
      let score = 0;
  
      const tempDelta = Math.abs(today.tempC - yesterday.tempC);
      if (tempDelta <= crit.tempThreshold) score++;
  
      const windDelta = Math.abs(today.midday.windMph - yesterday.midday.windMph);
      if (windDelta <= crit.windThreshold) score++;
  
      if (today.totalPrecipMm <= crit.rainThreshold) score++;
  
      const cloudDelta = Math.abs(today.midday.cloudCover - yesterday.midday.cloudCover);
      if (cloudDelta <= crit.cloudThreshold) score++;
  
      const uvDelta = Math.abs(today.uv - yesterday.uv);
      if (uvDelta <= crit.uvThreshold) score++;
  
      scores.push(score);
    }
  
    return scores;
  }

  interpretStability(scores: number[]): FishStabilityLevel {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  
    if (avg >= 3) return 'good';
    if (avg === 2) return 'caution';
    return 'poor';
  }

  getFishStability(species: FishSpecies): Observable<FishStabilityLevel> {
    return this.historicalWeatherData$.pipe(
      map((history) => {
        if (history.length < 5) return 'caution';
        const scores = this.computeSpeciesStability(history.slice(0, 5), species);
        return this.interpretStability(scores);
      })
    );
  }

  getAllFishStability(): Observable<FishStabilityMap> {
    return this.historicalWeatherData$.pipe(
      map((history) => {
        const result: FishStabilityMap = {
          [FishSpecies.PIKE]: 'caution',
          [FishSpecies.PERCH]: 'caution',
          [FishSpecies.BASS]: 'caution',
          [FishSpecies.TROUT]: 'caution',
        };
  
        if (history.length < 5) return result;
  
        for (const species of Object.values(FishSpecies)) {
          const scores = this.computeSpeciesStability(history.slice(0, 5), species);
          result[species] = this.interpretStability(scores);
        }
  
        return result;
      })
    );
  }

}
