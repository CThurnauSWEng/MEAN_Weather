import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute , Params, Router} from '@angular/router';
import { SeattleComponent } from '../seattle/seattle.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city = "Chicago";
  weatherDataAvailable = false;
  weatherData : any;
  low_temp: any;
  high_temp: any;


  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.city = params['location'];
      console.log("in noONInit 1: ", this.city);
      this.weatherDataAvailable = false;


      let observable = this._httpService.getWeatherData(this.city);
      observable.subscribe(data => {
        console.log("Data from the service call", data);

        this.weatherData = data;
        this.low_temp = this.KToF(this.weatherData['main']['temp_min']);
        this.high_temp = this.KToF(this.weatherData['main']['temp_max']);
        this.weatherDataAvailable = true;
        console.log(this.city, " component weatherData: ", this.weatherData);
      })
    })
  }

  KToF(kelvin){
    var fahrenheit = ((kelvin - 273.15) * 1.8) + 32;
    return fahrenheit;
  }

}
