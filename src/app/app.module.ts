import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { CurrentWeatherService } from './current-weather/current-weather.service';
import { MaterialModule } from './material.module';
import { WeatherForecastService } from './weather-forecast/weather-forecast.service';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { MapComponent } from './map/map.component';
import { environment } from '../environments/environment';
import { MapService } from './map/map.service';
import { CoordinatesService } from './shared/services/coordinates.service';
import { SearchCityComponent } from './search-city/search-city.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    MapComponent,
    SearchCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.agm.apiKey,
      libraries: ['places']
    })
  ],
  providers: [
    CurrentWeatherService,
    WeatherForecastService,
    MapService,
    CoordinatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
