import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ISearchCityInterface } from '../search-city/search-city.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class MapService {
  constructor(private httpClient: HttpClient) {}

  getCurrentCityByLatLon(lat: number, lon: number) {
    return this.httpClient
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${
          environment.agm.apiKey
        }`
      )
      .pipe(
        map(data => {
          return this.transformtoISearchCity(data, lat, lon);
        })
      );
  }
  private transformtoISearchCity(data, lat, lon): ISearchCityInterface {
    const city = data.results[0];

    return {
      lat: lat,
      lon: lon,
      city: typeof city === 'undefined' ? null : city.formatted_address
    };
  }
}
