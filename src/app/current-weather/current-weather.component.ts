import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from './current-weather.interface';
import { CurrentWeatherService } from './current-weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;
  chart = [];

  constructor(private weatherService: CurrentWeatherService) {}

  ngOnInit() {
    this.current = {
      city: 'San Gabriel',
      country: 'US',
      date: new Date(),
      image: 'assets/img/sunny.svg',
      temperature: 72,
      description: 'sunny'
    } as ICurrentWeather;
    this.weatherService
      .getCurrentWeather('san gabriel', 'US')
      .subscribe(data => {
        this.current = data;
      });
  }
}
