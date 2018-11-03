import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { CurrentWeatherService } from './current-weather/current-weather.service';
import { MaterialModule } from './material.module';
import { WeatherForecastService } from './weather-forecast/weather-forecast.service';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MaterialModule],
  providers: [CurrentWeatherService, WeatherForecastService],
  bootstrap: [AppComponent]
})
export class AppModule {}
