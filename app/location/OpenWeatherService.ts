/// <reference path="../domain/Weather.ts" />
/// <reference path="../domain/CurrentWeather.ts" />

module app.common {
	interface IOpenWeatherService {
		ByLocationName(locationName: string, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather;
		ByCoordinates(latitude: number, longitude: number, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather;
		ById(id: number, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather;
	}

	var that : OpenWeatherService;

	export class OpenWeatherService implements IOpenWeatherService {
		private apiKey = "15185ba4fcaa79b6600788874db6ca0a";
		
		static $inject = ["$resource", "LocationEventService"]
		constructor(private $resource : ng.resource.IResourceService,
					private locationEventService : app.location.LocationEventService) {
			that = this;
		}
		
		/**
		 * Gets the current weather by location name.
		 */
		ByLocationName(locationName: string) : app.domain.CurrentWeather {
			return that.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&APPID=" + that.apiKey)
		}
		
		/**
		 * Gets the current weather by coordinates.
		 */
		ByCoordinates(latitude: number, longitude: number) : app.domain.CurrentWeather {
			return that.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + that.apiKey)
		}
		
		/**
		 * Gets the current weather by specific id.
		 */
		ById(id: number) : app.domain.CurrentWeather {
			return that.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?id=" + id + "&APPID=" + that.apiKey)
		}
		
		private getCurrentWeather(resourceUri : string) : app.domain.CurrentWeather {
			var weather = new app.domain.CurrentWeather();
			that.$resource(resourceUri).get().$promise
			.then(data => {
				// Update Weather data
				that.fillWeatherData(weather, data);
			}).then(data => {
				that.fillWeatherNearby(weather);
			}).then(data => {
				// Notify callback
				that.locationEventService.NotifyNewLocationFetched(weather);
			});;
	
			return weather;
		}
		
		private fillWeatherNearby(weather : app.domain.CurrentWeather) {
			that.$resource("http://api.openweathermap.org/data/2.5/find?lat=" + weather.latitude + "&lon=" + weather.longitude + "&cnt=10" + "&APPID=" + that.apiKey).get(data => {
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
			weather.weather = app.domain.Weather.parse(data);
		}
	}
	
	angular.module("weatherQuery").service("OpenWeatherService", OpenWeatherService);
}