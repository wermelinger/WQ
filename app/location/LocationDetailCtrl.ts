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

		static $inject=["$location", "$routeParams", "openWeatherService", "searchHistory"]
		constructor(private $location: ng.ILocationService, 
					private $routeParams : IProductParams,
					private openWeatherService : app.common.OpenWeatherService,
					private searchHistory : app.common.SearchHistory) {
			that = this;
			that.LoadLocationDataWithLocationName($routeParams.locationName);
		}
		
		LoadLocationDataWithLocationName(locationName : string) : void {
			that.currentWeather = that.openWeatherService.ByLocationName(locationName, that.OnWeatherFetched);
		}
		
		LoadLocationDataWithId(id : number) : void {
			that.currentWeather = that.openWeatherService.ById(id, that.OnWeatherFetched);
		}
		
		LoadLocationDataWithCoordinates(latitude : number, longitude : number) : void {
			that.currentWeather = that.openWeatherService.ByCoordinatesTest(latitude, longitude, that.OnWeatherFetched);
		}
		
		LastSearchNames() : Array<string> {
			return that.searchHistory.SearchNames;
		}
		
		DeleteFromHistory(name : string) {
			that.searchHistory.Delete(name);
		}

		private OnWeatherFetched(weather : app.domain.CurrentWeather) {
			var elementForMap = document.getElementById("mapForLocation");
			var opts: google.maps.MapOptions = {
				center: new google.maps.LatLng(weather.latitude, weather.longitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				zoom: 8
			};

			var map = new google.maps.Map(elementForMap, opts);
			var marker = new google.maps.Marker(
			{
				position: new google.maps.LatLng(weather.latitude, weather.longitude),
				map: map,
				draggable:true,
				title: weather.name
				});
				google.maps.event.addListener(marker, 'dragend', that.OnDragged);
				
			that.searchHistory.AddSearch(weather.name);
		}
		
		private OnDragged(mouseEvent : google.maps.MouseEvent) {
			that.LoadLocationDataWithCoordinates(mouseEvent.latLng.lat(), mouseEvent.latLng.lng());
		}
	}
	
	angular.module("weatherQuery").controller("LocationDetailCtrl",  LocationDetailCtrl);
}