module app.domain {
	export class Weather {
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
		
		get image() : string {
			return "http://openweathermap.org/img/w/" + this.icon + ".png";
		}
	}
}