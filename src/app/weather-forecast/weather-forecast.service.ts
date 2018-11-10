import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IWeatherForecast } from './weather-forecast.interface';
import { map } from 'rxjs/operators';
import { TemperatureService } from '../shared/services/temperature.service';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherForecastService {
  constructor(private httpClient: HttpClient) {}

  get5DayWeatherForecastByCity(city: string, country: string) {
    return this.httpClient
      .get<IWeatherForecast>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${
          environment.openweathermap.appId
        }`
      )
      .pipe(
        map(data => {
          return this.transformToIWeatherForecast(data);
        })
      );
  }
  get5DayWeatherForecastByLatLon(
    lat: number,
    lon: number
  ): Observable<IWeatherForecast> {
    return this.httpClient
      .get<IWeatherForecast>(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
          environment.openweathermap.appId
        }`
      )
      .pipe(
        map(data => {
          return this.transformToIWeatherForecast(data);
        })
      );
  }
  private transformToIWeatherForecast(res): IWeatherForecast {
    const temp_max = res['list'].map(weather =>
      TemperatureService.convertKelvinToFarenheit(weather.main.temp_max)
    );
    const temp_min = res['list'].map(weather =>
      TemperatureService.convertKelvinToFarenheit(weather.main.temp_min)
    );
    const alldates = res['list'].map(weather => weather.dt);

    const weatherDates = [];

    alldates.forEach(weather => {
      const jsdate = new Date(weather * 1000);
      weatherDates.push(new Date(weather * 1000));
    });

    return {
      temperatureMax: temp_max,
      temperatureMin: temp_min,
      weatherDates: weatherDates
    };
  }
}
