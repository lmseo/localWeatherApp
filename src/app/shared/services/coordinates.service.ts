import { CoordinatesInfo } from '../models/CoordinatesInfo.model';
import { BehaviorSubject } from 'rxjs';

export class CoordinatesService {
  _city: string;
  static UNKNOWN_COORDS = new CoordinatesInfo(null, null);
  static INITIAL_COORDS = new CoordinatesInfo(
    34.09362676910148,
    -118.106795720992334
  );
  coordInfo$: BehaviorSubject<CoordinatesInfo> = new BehaviorSubject<
    CoordinatesInfo
  >(CoordinatesService.INITIAL_COORDS);

  setLonLat(lat: number, lon: number) {
    const coordinatesInfo = new CoordinatesInfo(lat, lon);
    this.coordInfo$.next(coordinatesInfo);
  }
  set city(city: string) {
    this.city = city;
  }
}
