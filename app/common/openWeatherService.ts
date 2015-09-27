module app.common {
	interface IOpenWeatherService {
		getUser(userName : string): app.domain.Location;
		getCurrentWeather(locationName: string) : app.domain.CurrentWeather;
	}

	export class OpenWeatherService implements IOpenWeatherService {
		private apiKey = "15185ba4fcaa79b6600788874db6ca0a";
		private kelvinToCelsiusFactor = -272.15;
		
		static $inject = ["$resource"]
		constructor(private $resource : ng.resource.IResourceService) {
			
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
		
		getCurrentWeather(locationName: string, elementForMap : HTMLElement) : app.domain.CurrentWeather {
			var weather = new app.domain.CurrentWeather();
			this.$resource("http://api.openweathermap.org/data/2.5/weather?q=" + locationName).get(data => {
					// Update Weather data
					weather.name = data.name;
					weather.longitude = data.coord.lon;
					weather.latitude = data.coord.lat;
					weather.weather = new app.domain.Weather(
						data.main.temp + this.kelvinToCelsiusFactor, 
						data.main.pressure, 
						data.main.humidity, 
						data.main.temp_min + this.kelvinToCelsiusFactor, 
						data.main.temp_max + this.kelvinToCelsiusFactor,
						data.weather[0].icon);

					// Update Google map
					var opts: google.maps.MapOptions = {
						center: new google.maps.LatLng(-34.397, 150.644),
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						zoom: 8
					};
					opts.center.lat = () => weather.latitude;
					opts.center.lng = () => weather.longitude;
					
					var map = new google.maps.Map(elementForMap, opts);
	
				});
			
			
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