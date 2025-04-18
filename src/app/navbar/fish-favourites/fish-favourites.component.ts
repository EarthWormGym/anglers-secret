import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FishDisplayItem } from './models/fish-display-item';

@Component({
  selector: 'app-fish-favourites',
  templateUrl: './fish-favourites.component.html',
  styleUrl: './fish-favourites.component.scss',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FishFavouritesComponent implements OnInit {
  
  fishList: FishDisplayItem[] = [
    { name: 'Pike', image: 'pike-icon.png' },
    { name: 'Perch', image: 'perch-icon.png' },
    { name: 'Trout', image: 'trout-icon.png' },
    { name: 'Bass', image: 'bass-icon.png' },
    { name: 'Common Carp', image: 'common-carp-icon.png' },
    { name: 'Mirror Carp', image: 'mirror-carp-icon.png' },
    { name: 'Barbel', image: 'barbel-icon.png' },
    { name: 'Salmon', image: 'salmon-icon.png' },
    { name: 'Catfish', image: 'catfish-icon.png' },
    { name: 'Chubb', image: 'chubb-icon.png' },
    { name: 'Sturgeon', image: 'sturgeon-icon.png' },
    { name: 'Zander', image: 'zander-icon.png' },
  ];

  ngOnInit(): void {
    
  }

}
