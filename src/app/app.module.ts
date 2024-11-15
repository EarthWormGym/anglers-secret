import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './navbar/home/home.component';
import { WeatherTrackerComponent } from './navbar/weather-tracker/weather-tracker.component';
import { WeatherTrackerFormComponent } from './navbar/weather-tracker/weather-tracker-form/weather-tracker-form.component';
import { WeatherDisplayComponent } from './navbar/weather-tracker/weather-display/weather-display.component';
import { SignupComponent } from './navbar/signup/signup.component';
import { LoginComponent } from './navbar/login/login.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WeatherTrackingService } from './navbar/weather-tracker/services/weather-tracking.service';
import { LoginService } from './navbar/login/services/login.service';

@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        WeatherTrackerComponent,
        WeatherTrackerFormComponent,
        WeatherDisplayComponent,
        SignupComponent,
        LoginComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule], providers: [WeatherTrackingService, LoginService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
