import { CoordinatesInfo } from '../models/CoordinatesInfo.model';
import { BehaviorSubject } from 'rxjs';

export class CoordinatesService {
  static UNKNOWN_COORDS = new CoordinatesInfo(null, null);
  static INITIAL_COORDS = new CoordinatesInfo(34.05, -118.1087);
  coordInfo$: BehaviorSubject<CoordinatesInfo> = new BehaviorSubject<
    CoordinatesInfo
  >(CoordinatesService.INITIAL_COORDS);

  setLonLat(lat: number, lon: number) {
    const coordinatesInfo = new CoordinatesInfo(lat, lon);
    this.coordInfo$.next(coordinatesInfo);
  }
}
