import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherTrackerComponent } from './pages/weather-tracker/weather-tracker.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { WeatherTrackingService } from './services/weather-tracking.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    WeatherTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
