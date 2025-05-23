import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherTrackingService } from '../services/weather-tracking.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FishStabilityService } from '../services/fish-stability.service';
import { FishDisplayItem } from '../../fish-favourites/models/fish-display-item.model';
import { FishFavouritesService } from '../../fish-favourites/services/fish-favourites.service';
import { FishSpecies } from '../models/fish.model';

@Component({
    selector: 'app-weather-display',
    templateUrl: './weather-display.component.html',
    styleUrl: './weather-display.component.scss',
    standalone: true,
    imports: [
      CommonModule,
      AsyncPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDisplayComponent {

  public weatherTrackingService = inject(WeatherTrackingService);
  public fishStabilityService = inject(FishStabilityService);
  public fishFavouritesService = inject(FishFavouritesService);

  fishList: FishDisplayItem[] = this.fishFavouritesService.selectedFish();

  getStabilityLabel(status: 'good' | 'caution' | 'poor'): string {
    switch (status) {
      case 'good':
        return ' - Biting';
      case 'caution':
        return ' - Cautious';
      case 'poor':
        return ' - Inactive';
      default:
        return '';
    }
  }

  mapFishNameToSpecies(name: string): FishSpecies {
    const key = name.replace(/\s+/g, '_').toUpperCase();
    const species = FishSpecies[key as keyof typeof FishSpecies];
    return species;
  }
  

  onBack() {
    this.weatherTrackingService.clearHistoricalWeatherData();
    this.weatherTrackingService.displayWeatherData.set(false);
  }

}
