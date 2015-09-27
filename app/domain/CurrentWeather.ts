module app.domain {
	export class CurrentWeather {
		name : string;
		longitude : number;
		latitude : number;
		weather : app.domain.Weather;
		mapoptions :  google.maps.MapOptions;
		
		constructor() {
		}
	}
}