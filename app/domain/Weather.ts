module app.domain {
	export class Weather {
		private static kelvinToCelsiusFactor = -272.15;
		
		temp : number;
		pressure : number;
		humidity : number;
		temp_min : number;
		temp_max : number;
		icon : string;
		
		constructor(temp : number, pressure: number, humidity : number, temp_min : number, temp_max : number, icon : string) {
			this.temp = temp;
			this.pressure = pressure;
			this.humidity = humidity;
			this.temp_min = temp_min;
			this.temp_max = temp_max;
			this.icon = icon;
		}
		
		get weatherIcon() : string {
			return "http://openweathermap.org/img/w/" + this.icon + ".png";
		}
		
		static parse(data : any) : app.domain.Weather {
			 return new app.domain.Weather(
				data.main.temp + Weather.kelvinToCelsiusFactor, 
				data.main.pressure, 
				data.main.humidity, 
				data.main.temp_min + Weather.kelvinToCelsiusFactor, 
				data.main.temp_max + Weather.kelvinToCelsiusFactor,
				data.weather[0].icon);
		}
	}
}