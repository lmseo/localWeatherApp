import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { CoordinatesService } from '../shared/services/coordinates.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 0;
  lon = 0;
  markerActive = false;

  constructor(
    private mapService: MapService,
    private coordsService: CoordinatesService
  ) {}

  ngOnInit() {
    this.coordsService.coordInfo$.subscribe(coords => {
      if (coords) {
        this.lat = coords.latitude;
        this.lon = coords.longitute;
      }
    });
  }

  onChosenLocation(event) {
    this.lon = event.coords.lng;
    this.lat = event.coords.lat;
    this.coordsService.setLonLat(event.coords.lat, event.coords.lng);
    this.markerActive = true;
  }
}
