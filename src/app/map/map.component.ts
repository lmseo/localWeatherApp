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
  inTransitLat = 0;
  inTransitLon = 0;
  markerActive = false;
  constructor(
    private mapService: MapService,
    private coordsService: CoordinatesService
  ) {}

  ngOnInit() {
    this.coordsService.coordInfo$.subscribe(coords => {
      if (coords) {
        console.log(coords);
        this.lat = coords.latitude;
        this.lon = coords.longitute;

        this.mapService
          .getCurrentCityByLatLon(coords.latitude, coords.longitute)
          .subscribe(data => {
            console.log(data);
          });
      }
    });
  }

  onChosenLocation(event) {
    // this.lon = event.coords.lng;
    // this.lat = event.coords.lat;
    this.coordsService.setLonLat(event.coords.lat, event.coords.lng);
    this.markerActive = true;
  }
  onCenterChanged(event) {
    this.inTransitLon = event.lng;
    this.inTransitLat = event.lat;
  }
  onIdle() {
    if (this.inTransitLon !== 0 && this.inTransitLat !== 0) {
      // this.lon = this.inTransitLon;
      // this.lat = this.inTransitLat;
      this.coordsService.setLonLat(this.inTransitLat, this.inTransitLon);
    }
  }
  onZoomChanged(event) {
    console.log(event);
  }
}
