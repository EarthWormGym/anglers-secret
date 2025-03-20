export interface CurrentWeather {
  weatherId: string;
  data: {
    location: {
      name: string;
      region: string;
      country: string;
    };
    currentWeather: {
      lastUpdated: string;
      tempC: number;
      windMph: number;
      precipMm: number;
      cloudCover: number;
      uv: number;
    };
  };
}
