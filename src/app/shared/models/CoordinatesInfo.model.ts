export class CoordinatesInfo {
  constructor(
    public latitude: number = null,
    public longitute: number = null,
    public city: string = null
  ) {}

  areCoordsSet() {
    return !!(this.latitude && this.longitute);
  }
}
