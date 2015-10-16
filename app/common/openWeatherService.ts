module app.common {
	interface IOpenWeatherService {
		ByLocationName(locationName: string, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather;
		ByCoordinates(latitude: number, longitude: number, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather;
		ById(id: number, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather;
	}

	var that : OpenWeatherService;

	export class OpenWeatherService implements IOpenWeatherService {
		private apiKey = "15185ba4fcaa79b6600788874db6ca0a";
		private kelvinToCelsiusFactor = -272.15;
		
		static $inject = ["$resource"]
		constructor(private $resource : ng.resource.IResourceService) {
			that = this;
		}
		
		/**
		 * Gets the current weather by location name.
		 */
		ByLocationName(locationName: string, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather {
			return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&APPID=" + this.apiKey, onWeatherFetchedCallback)
		}
		
		/**
		 * Gets the current weather by coordinates.
		 */
		ByCoordinates(latitude: number, longitude: number, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather {
			return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + this.apiKey, onWeatherFetchedCallback)
		}
		
		/**
		 * Gets the current weather by specific id.
		 */
		ById(id: number, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather {
			return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?id=" + id + "&APPID=" + this.apiKey, onWeatherFetchedCallback)
		}
		
		getCurrentWeather(resourceUri : string, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather {
			var weather = new app.domain.CurrentWeather();
			this.$resource(resourceUri).get(data => {
					// Update Weather data
					that.fillWeatherData(weather, data);	
					that.fillWeatherNearby(weather);

					// Notify callback
					onWeatherFetchedCallback(weather);
				});

			return weather;
		}
		
		private fillWeatherNearby(weather : app.domain.CurrentWeather) {
			that.$resource("http://api.openweathermap.org/data/2.5/find?lat=" + weather.latitude + "&lon=" + weather.longitude + "&cnt=10" + "&APPID=" + this.apiKey).get(data => {
					// Update Weather data
					data.list.forEach(element => {
						var weatherObj = new app.domain.CurrentWeather();
						that.fillWeatherData(weatherObj, element);
						weather.nearbyWeather.push(weatherObj); 
					});
				});
		}
		
		private fillWeatherData(weather : app.domain.CurrentWeather, data : any) {
			weather.name = data.name;
			weather.id = data.id;
			weather.flagimage = data.sys.country.toLowerCase();
			weather.longitude = data.coord.lon;
			weather.latitude = data.coord.lat;
			weather.weather = new app.domain.Weather(
				data.main.temp + this.kelvinToCelsiusFactor, 
				data.main.pressure, 
				data.main.humidity, 
				data.main.temp_min + this.kelvinToCelsiusFactor, 
				data.main.temp_max + this.kelvinToCelsiusFactor,
				data.weather[0].icon);
		}
	}
	
	angular.module("weatherQuery").service("openWeatherService", OpenWeatherService);
}