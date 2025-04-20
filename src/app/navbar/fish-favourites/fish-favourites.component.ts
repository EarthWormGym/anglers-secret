import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FishDisplayItem, fishList } from './models/fish-display-item.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fish-favourites',
  templateUrl: './fish-favourites.component.html',
  styleUrl: './fish-favourites.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FishFavouritesComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  fishList: FishDisplayItem[] = fishList;
  fishSelectControl = new FormControl<string[]>([], { nonNullable: true });
  maxSelection = 4;
  
  ngOnInit(): void {
    this.fishSelectControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(selected => {
      if (selected.length > this.maxSelection) {
        this.fishSelectControl.setValue(selected.slice(0, this.maxSelection), { emitEvent: false });
      }
    });
  }

  get selectedFish(): string[] {
    return this.fishSelectControl.value || [];
  }

}
