

export interface City {
    fields: {
      name: string;
      cou_name_en: string;
      timezone: string;
    };
    recordid: string;
  }
  
  export interface WeatherData {
    name: string;
    weather: Array<{
      main: string;
      description: string;
    }>;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
  }
  