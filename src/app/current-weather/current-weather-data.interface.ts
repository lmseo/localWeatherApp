export interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  wind: {
    deg: number;
    speed: number;
  };
  main: {
    temp: number;
    tempMax: number;
    tempMin: number;
    humidity: number;
    pressure: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  name: string;
  id: number;
}
