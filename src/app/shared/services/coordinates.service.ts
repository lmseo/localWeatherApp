import { CoordinatesInfo } from '../models/CoordinatesInfo.model';
import { BehaviorSubject } from 'rxjs';

export class CoordinatesService {
  static UNKNOWN_COORDS = new CoordinatesInfo();
  static INITIAL_COORDS = new CoordinatesInfo(
    34.093,
    -118.1087,
    'San Gabriel, CA, USA'
  );
  _city: string;
  coordInfo$: BehaviorSubject<CoordinatesInfo> = new BehaviorSubject<
    CoordinatesInfo
  >(CoordinatesService.INITIAL_COORDS);

  setLatLonCity(lat: number, lon: number, city: string) {
    const coordinatesInfo = new CoordinatesInfo(lat, lon, city);
    this.coordInfo$.next(coordinatesInfo);
  }
  set city(city: string) {
    this.city = city;
  }
}
