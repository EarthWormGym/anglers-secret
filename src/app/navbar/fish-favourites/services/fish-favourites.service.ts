import { Injectable, signal } from '@angular/core';
import { FishDisplayItem } from '../models/fish-display-item.model';

@Injectable({
  providedIn: 'root'
})
export class FishFavouritesService {

  selectedFish = signal<FishDisplayItem[]>([]);

}
