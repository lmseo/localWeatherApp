export class TemperatureService {
  static convertKelvinToFarenheit(kelvin: number, decimal = 2) {
    return +(kelvin * (9 / 5) - 459.67).toFixed(decimal);
  }
}
