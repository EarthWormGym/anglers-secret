import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherTrackingService } from '../services/weather-tracking.service';
import { AsyncPipe, CommonModule } from '@angular/common';

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

  onBack() {
    window.location.reload();
  }

}
