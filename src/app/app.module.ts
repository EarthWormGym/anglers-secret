import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherTrackerComponent } from './pages/weather-tracker/weather-tracker.component';
import { LocationFormComponent } from './pages/weather-tracker/location-form/location-form.component';
import { WeatherDisplayComponent } from './pages/weather-tracker/weather-display/weather-display.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { WeatherTrackingService } from './services/weather-tracking.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WeatherTrackerComponent,
    LocationFormComponent,
    WeatherDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [
    WeatherTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
