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
  sample = {
    coord: { lon: -0.13, lat: 51.51 },
    weather: [
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' }
    ],
    base: 'stations',
    main: {
      temp: 273.42,
      pressure: 1007,
      humidity: 86,
      temp_min: 270.15,
      temp_max: 277.15
    },
    visibility: 10000,
    wind: { speed: 1.5, deg: 80 },
    clouds: { all: 24 },
    dt: 1540966800,
    sys: {
      type: 1,
      id: 5091,
      message: 0.0059,
      country: 'GB',
      sunrise: 1540968750,
      sunset: 1541003696
    },
    id: 2643743,
    name: 'London',
    cod: 200
  };
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
