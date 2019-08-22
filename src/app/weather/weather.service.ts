import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICurrentweather } from '../icurrentweather';
import { map } from 'rxjs/operators';
interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
  country: string;
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  private trasformToCurrentWeather(data: ICurrentWeatherData) : ICurrentweather {
    return {
      City: data.name,
      Country: data.sys.country,
      Date: data.dt * 1000,
      Image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      Temperature: this.convertKelvinToFahreheit(data.main.temp),
      Description: data.weather[0].description
    }
  }

  private convertKelvinToFahreheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67;
  }

  getCurrentWeather(city: string, country: string): Observable<ICurrentweather>{
  return  this.httpClient.get<ICurrentWeatherData>(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather?`
    + `q=${city},${country}&appid=${environment.appId}`).pipe(map(data => this.trasformToCurrentWeather(data)));
  }
}
