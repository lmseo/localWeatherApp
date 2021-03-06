import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { WeatherForecastService } from './weather-forecast.service';
import { CoordinatesService } from '../shared/services/coordinates.service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  chart = [];
  constructor(
    private forecastService: WeatherForecastService,
    private coordsService: CoordinatesService
  ) {}

  ngOnInit() {
    this.coordsService.coordInfo$.subscribe(coords => {
      if (coords) {
        this.forecastService
          .get5DayWeatherForecastByLatLon(coords.latitude, coords.longitute)
          .subscribe(res => {
            this.chart = new Chart('canvas', {
              type: 'line',
              data: {
                labels: res.weatherDates,
                datasets: [
                  {
                    data: res.temperatureMax,
                    borderColor: '#3cba9f',
                    fill: false
                  }
                  // {
                  //   data: res.temperatureMin,
                  //   borderColor: '#ffcc00',
                  //   fill: false
                  // }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      type: 'time',
                      time: {
                        unit: 'day'
                      }
                    }
                  ],
                  yAxes: [
                    {
                      display: true
                    }
                  ]
                }
              }
            });
          });
      }
    });
  }
}
