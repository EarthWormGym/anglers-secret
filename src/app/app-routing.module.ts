import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherTrackerComponent } from './pages/weather-tracker/weather-tracker.component';

const routes: Routes = [
  { path: '', component: WeatherTrackerComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
