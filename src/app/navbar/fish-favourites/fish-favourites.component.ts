import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fish-favourites',
  templateUrl: './fish-favourites.component.html',
  styleUrl: './fish-favourites.component.scss',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FishFavouritesComponent implements OnInit {

  ngOnInit(): void {
    
  }

}
