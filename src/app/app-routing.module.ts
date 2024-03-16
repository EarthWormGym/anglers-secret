import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navbar/home/home.component';
import { WeatherTrackerComponent } from './navbar/weather-tracker/weather-tracker.component';
import { SignupComponent } from './navbar/signup/signup.component';
import { LoginComponent } from './navbar/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'weather-tracker', component: WeatherTrackerComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
