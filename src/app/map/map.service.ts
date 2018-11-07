import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MapService {
  constructor(private httpClient: HttpClient) {}

  getCurrentCityByLatLon(lat: number, lon: number) {
    return this.httpClient.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${
        environment.agm.apiKey
      }`
    );
  }
  getCurrentCityByCity(lat: number, lon: number) {
    return this.httpClient.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${
        environment.agm.apiKey
      }`
    );
  }
}
