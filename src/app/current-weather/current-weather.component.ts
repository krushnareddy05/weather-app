import { Component, OnInit } from '@angular/core';
import {ICurrentweather} from './../icurrentweather';
import { WeatherService } from "../weather/weather.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
current: ICurrentweather;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {

    this.weatherService.getCurrentWeather('Bethesda', 'US').subscribe((data)=>this.current = data);
  }

}
