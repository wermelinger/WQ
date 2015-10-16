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
			this.LoadLocationDataWithLocationName($routeParams.locationName);
			that = this;
		}
		
		LoadLocationDataWithLocationName(locationName : string) : void {
			this.currentWeather = this.openWeatherService.ByLocationName(locationName, this.OnWeatherFetched);
		}
		
		LoadLocationDataWithId(id : number) : void {
			this.currentWeather = this.openWeatherService.ById(id, this.OnWeatherFetched);
		}
		
		LoadLocationDataWithCoordinates(latitude : number, longitude : number) : void {
			this.currentWeather = this.openWeatherService.ByCoordinates(latitude, longitude, this.OnWeatherFetched);
		}
		
		LastSearchNames() : Array<string> {
			return this.searchHistory.SearchNames;
		}
		
		DeleteFromHistory(name : string) {
			this.searchHistory.Delete(name);
		}
		
		private OnWeatherFetched(weather : app.domain.CurrentWeather) {
			var elementForMap = document.getElementById("mapForLocation");
			var opts: google.maps.MapOptions = {
				center: new google.maps.LatLng(weather.latitude, weather.longitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				zoom: 8
			};

			var map = new google.maps.Map(elementForMap, opts);
			
			var marker = new google.maps.Marker({
				position: {lat: weather.latitude, lng: weather.longitude},
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
	
	angular.module("weatherQuery").controller("LocationDetailCtrl", LocationDetailCtrl);
}