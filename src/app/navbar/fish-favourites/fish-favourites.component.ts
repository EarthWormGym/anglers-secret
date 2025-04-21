import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FishDisplayItem, fishList } from './models/fish-display-item.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { FishFavouritesService } from './services/fish-favourites.service';

@Component({
  selector: 'app-fish-favourites',
  templateUrl: './fish-favourites.component.html',
  styleUrl: './fish-favourites.component.scss',
  standalone: true,
  imports: [
    MatListModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FishFavouritesComponent {

  fishFavouritesService = inject(FishFavouritesService);
  selectedFish = this.fishFavouritesService.selectedFish();

  fishList: FishDisplayItem[] = fishList;
  maxSelection = 4;

  toggleSelection(fish: FishDisplayItem): void {
    const index = this.selectedFish.findIndex(f => f.name === fish.name);
    if (index > -1) {
      this.selectedFish.splice(index, 1);
      console.log(this.fishFavouritesService.selectedFish());
    } else if (this.selectedFish.length < this.maxSelection) {
      this.selectedFish.push(fish);
      console.log(this.fishFavouritesService.selectedFish());
    }
  }

  isSelected(fish: FishDisplayItem): boolean {
    return this.selectedFish.some(f => f.name === fish.name);
  }
  
  isDisabled(fish: FishDisplayItem): boolean {
    return !this.isSelected(fish) && this.selectedFish.length >= this.maxSelection;
  }

}
