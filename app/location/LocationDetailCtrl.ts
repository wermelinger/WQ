/// <reference path="../../typings/googlemaps/google.maps.d.ts" />

module app.location {
	interface ILocationDetailModel {
		currentWeather : app.domain.CurrentWeather;
		newLocationName : string;
	}
	
	interface IProductParams extends ng.route.IRouteParamsService {
		locationName: string;
	}

	var that : LocationDetailCtrl;

	class LocationDetailCtrl implements ILocationDetailModel {
		currentWeather : app.domain.CurrentWeather;
		newLocationName : string;

		static $inject=["$scope", "$location", "$routeParams", "OpenWeatherService", "SearchHistory", "LocationEventService"]
		constructor($scope : any,
					private $location: ng.ILocationService, 
					private $routeParams : IProductParams,
					private openWeatherService : app.common.OpenWeatherService,
					private searchHistory : app.location.SearchHistory,
					locationEventService : app.location.LocationEventService) {
			that = this;
			locationEventService.SubscribeNewLocationRequested($scope, that.LoadLocationDataWithCoordinates);
			that.LoadLocationDataWithLocationName($routeParams.locationName);
		}
		
		LoadLocationDataWithLocationName(locationName : string) : void {
			that.currentWeather = that.openWeatherService.ByLocationName(locationName);
		}
		
		LoadLocationDataWithId(id : number) : void {
			that.currentWeather = that.openWeatherService.ById(id);
		}
		
		LoadLocationDataWithCoordinates(event, latitude : number, longitude : number) : void {
			that.currentWeather = that.openWeatherService.ByCoordinates(latitude, longitude);
		}
		
		LastSearchNames() : Array<string> {
			return that.searchHistory.SearchNames;
		}
		
		DeleteFromHistory(name : string) {
			that.searchHistory.Delete(name);
		}
	}
	
	angular.module("weatherQuery").controller("LocationDetailCtrl", LocationDetailCtrl);
}