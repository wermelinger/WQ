module app.location {
	interface ILocationDetailModel {
		currentWeather : app.domain.CurrentWeather;
	}
	
	interface IProductParams extends ng.route.IRouteParamsService {
		locationName: string;
	}
	
	class LocationDetailCtrl implements ILocationDetailModel {
		currentWeather : app.domain.CurrentWeather;
		
		static $inject=["$location", "$routeParams", "openWeatherService"]
		constructor(private $location: ng.ILocationService, 
					private $routeParams : IProductParams,
					private openWeatherService : app.common.OpenWeatherService) {
			this.currentWeather = openWeatherService.getCurrentWeather($routeParams.locationName);
		}
	}
	
	angular.module("weatherQuery").controller("LocationDetailCtrl", LocationDetailCtrl);
}