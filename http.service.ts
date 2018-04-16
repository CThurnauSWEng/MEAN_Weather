import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  weatherData: any;

  constructor(private _http: HttpClient) { }

  getWeatherData(location){
    console.log("in getWeatherData in servce, location: ", location);
    return this._http.get("http://api.openweathermap.org/data/2.5/weather?q="+location+"&APPID=d23f47ca5c42d404ce498c30d76fa102");
  }
  
}
