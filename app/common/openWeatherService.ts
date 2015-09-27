module app.common {
	interface IOpenWeatherService {
		getUser(userName : string): app.domain.Location;
		getCurrentWeather(locationName: string, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather;
	}

	var that : OpenWeatherService;

	export class OpenWeatherService implements IOpenWeatherService {
		private apiKey = "15185ba4fcaa79b6600788874db6ca0a";
		private kelvinToCelsiusFactor = -272.15;
		
		static $inject = ["$resource"]
		constructor(private $resource : ng.resource.IResourceService) {
			that = this;
		}
		
		getUser(locationName : string): app.domain.Location {
			var location = new app.domain.Location();
			this.$resource("https://api.github.com/users/" + locationName + "&APPID=" + this.apiKey).get(data => {
					location.login = data.login;
					location.location = data.location;
					location.avatar_url = data.avatar_url;
					location.repos = this.getRepos(data.repos_url);
				});
				
			return location;
		}
		
		getCurrentWeather(locationName: string, onWeatherFetchedCallback : (weather : app.domain.CurrentWeather) => void) : app.domain.CurrentWeather {
			var weather = new app.domain.CurrentWeather();
			this.$resource("http://api.openweathermap.org/data/2.5/weather?q=" + locationName).get(data => {
					// Update Weather data
					weather.name = data.name;
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
						
					that.fillWeatherNearby(weather);

					// Notify callback
					onWeatherFetchedCallback(weather);
				});
			
			
			return weather;
		}
		
		private fillWeatherNearby(weather : app.domain.CurrentWeather) {
			that.$resource("http://api.openweathermap.org/data/2.5/find?lat=" + weather.latitude + "&lon=" + weather.longitude + "&cnt=10").get(data => {
					// Update Weather data
					data.list.forEach(element => {
						var weatherObj = that.createWeatherData(element);
						weather.nearbyWeather.push(weatherObj); 
					});
					
					
				});
		}
		
		private createWeatherData(data : any) : app.domain.CurrentWeather  {
			var weather = new app.domain.CurrentWeather();
			weather.name = data.name;
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
				
			return weather;
		}
		
		getRepos(url : string): Array<app.domain.Repo> {
			var repos = new Array<app.domain.Repo>();
			this.$resource(url).query(data => {
					data.forEach(element => {
						var repo = new app.domain.Repo();
						repos.push(repo);
						repo.name = element.name;
						repo.description = element.description;
					});
				});
			
			return repos; 
		}
	}
	
	angular.module("mycommon").service("openWeatherService", OpenWeatherService);
}