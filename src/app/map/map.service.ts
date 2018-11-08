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
    const city = data.results.filter(
      res => res.types[0] === 'locality' && res.types[1] === 'political'
    );
    return {
      lat: lat,
      lon: lon,
      city: city[0].formatted_address
    };
  }
}
