import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from './current-weather.interface';
import { CurrentWeatherService } from './current-weather.service';
import { Chart } from 'chart.js';
import { CoordinatesService } from '../shared/services/coordinates.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;
  lat = 0;
  lon = 0;

  constructor(
    private weatherService: CurrentWeatherService,
    private coordsService: CoordinatesService
  ) {}

  ngOnInit() {
    this.current = {
      city: 'San Gabriel',
      country: 'US',
      date: new Date(),
      image: 'assets/img/sunny.svg',
      temperature: 72,
      description: 'sunny'
    } as ICurrentWeather;

    this.coordsService.coordInfo$.subscribe(coords => {
      if (coords) {
        this.weatherService
          .getCurrentWeatherByLatLong(coords.latitude, coords.longitute)
          .subscribe(data => {
            this.current = data;
          });
      }
    });
  }
}
