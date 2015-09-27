module app.domain {
	export class CurrentWeather {
		name : string;
		flagimage: string;
		longitude : number;
		latitude : number;
		weather : app.domain.Weather;
		mapoptions :  google.maps.MapOptions;
		nearbyWeather : Array<CurrentWeather>; 
		
		constructor() {
			this.nearbyWeather = new Array<CurrentWeather>();
		}
		
		get flag() : string {
			return "https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/75/country-4x3/" + this.flagimage + ".png";
		}
	}
}