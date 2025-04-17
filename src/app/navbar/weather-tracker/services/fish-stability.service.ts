import { inject, Injectable, signal } from '@angular/core';
import { WeatherTrackingService } from './weather-tracking.service'; // adjust path as needed
import { HistoricalWeather } from '../models/historical-weather';
import { FishSpecies, FishStabilityLevel, FishStabilityMap } from '../models/fish.model';
import { stabilityCriteriaMap } from '../models/stability-criteria';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FishStabilityService {

  private weatherTrackingService = inject(WeatherTrackingService);

  fishStability = signal<FishStabilityMap | null>(null);

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
    if (avg >= 1.5 && avg < 3) return 'caution';
    return 'poor';
  }

  getFishStability(species: FishSpecies): Observable<FishStabilityLevel> {
    return this.weatherTrackingService.historicalWeatherData$.pipe(
      map((history) => {
        if (history.length < 5) return 'caution';
        const scores = this.computeSpeciesStability(history.slice(0, 5), species);
        return this.interpretStability(scores);
      })
    );
  }

  getAllFishStability(): Observable<FishStabilityMap> {
    return this.weatherTrackingService.historicalWeatherData$.pipe(
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
