import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherTrackingService } from '../services/weather-tracking.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FishStabilityService } from '../services/fish-stability.service';

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

  public weatherTrackerService = inject(WeatherTrackingService);
  public fishStabilityService = inject(FishStabilityService);

  getStabilityLabel(status: 'good' | 'caution' | 'poor'): string {
    switch (status) {
      case 'good':
        return '- Biting';
      case 'caution':
        return '- Cautious';
      case 'poor':
        return '- Inactive';
      default:
        return '';
    }
  }

  onBack() {
    window.location.reload();
  }

}
