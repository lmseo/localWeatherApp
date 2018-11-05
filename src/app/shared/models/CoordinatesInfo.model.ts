export class CoordinatesInfo {
  constructor(public latitude: number, public longitute: number) {}

  areCoordsSet() {
    return !!(this.latitude && this.longitute);
  }
}
