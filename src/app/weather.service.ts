import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { ICurrentWeather } from './current-weather.interface';

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  wind: {
    deg: number;
    speed: number;
  };
  main: {
    temp: number;
    tempMax: number;
    tempMin: number;
    humidity: number;
    pressure: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  name: string;
  id: number;
}
@Injectable()
export class WeatherService {
  weather = {
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
  constructor(private httpClient: HttpClient) {
    console.log(this.weather.dt);
  }

  getCurrentWeather(city: string, country: string) {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${
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
      temperature: this.convertKelvinToFarenheit(data.main.temp),
      description: data.weather[0].description
    };
  }

  private convertKelvinToFarenheit(kelvin: number) {
    return kelvin * (9 / 5) - 459.67;
  }
}
