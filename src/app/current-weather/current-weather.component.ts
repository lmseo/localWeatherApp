import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../current-weather.interface';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;

  constructor(private weatherService: WeatherService) {}

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
        console.log(data);
        console.log(this.current);
      });
  }
}
