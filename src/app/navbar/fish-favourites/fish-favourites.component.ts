import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FishDisplayItem, fishList } from './models/fish-display-item.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

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

  fishList: FishDisplayItem[] = fishList;
  selectedFish: string[] = [];
  maxSelection = 4;

  toggleSelection(fish: string): void {
    const index = this.selectedFish.indexOf(fish);
    if (index > -1) {
      this.selectedFish.splice(index, 1);
    } else if (this.selectedFish.length < this.maxSelection) {
      this.selectedFish.push(fish);
    }
  }

  isSelected(fish: string): boolean {
    return this.selectedFish.includes(fish);
  }

  isDisabled(fish: string): boolean {
    return !this.isSelected(fish) && this.selectedFish.length >= this.maxSelection;
  }

}
