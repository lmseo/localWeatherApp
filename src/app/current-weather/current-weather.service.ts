import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ICurrentWeather } from './current-weather.interface';
import { ICurrentWeatherData } from './current-weather-data.interface';
import { TemperatureService } from '../shared/services/temperature.service';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentWeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeatherByCity(
    city: string,
    country: string
  ): Observable<ICurrentWeather> {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${
          environment.openweathermap.appId
        }`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)));
  }
  getCurrentWeatherByLatLong(
    lat: number,
    lon: number
  ): Observable<ICurrentWeather> {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          environment.openweathermap.appId
        }`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)));
  }

  private transformToICurrentWeather(
    data: ICurrentWeatherData
  ): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: new Date(data.dt * 1000),
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: TemperatureService.convertKelvinToFarenheit(data.main.temp),
      description: data.weather[0].description
    };
  }
}
