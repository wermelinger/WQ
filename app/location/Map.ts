module app.directives {
	
	var that : Map;
	
	/**
	 * Represents a simple map component. 
	 * Works with the LocationEventService.
	 */
	export class Map implements ng.IDirective {
		
		private static mapId = "mapElement";
		
		static $inject = ["LocationEventService"]
		constructor(private locationEventService : app.location.LocationEventService) {
			var directive : ng.IDirective = {};
			directive.restrict = "E";
			directive.replace = true;
			directive.template = "<div id='" + Map.mapId + "' style='height:{{height}}px;'></div>";
			directive.controller = function($scope : ng.IScope) {
				locationEventService.SubscribeNewLocationFetched($scope, function(event, weather : app.domain.CurrentWeather) {
					var elementForMap = document.getElementById(Map.mapId);
					
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
					
					// Enable moving the marker
					google.maps.event.addListener(marker, 'dragend', that.OnDragged);
				});
			};
			directive.transclude = false;
			directive.scope = {
				height : "@"
			};
			
			that = this;
			
			return directive;
		}
	
		private OnDragged(mouseEvent : google.maps.MouseEvent) {
			that.locationEventService.NotifyNewLocationRequested(mouseEvent.latLng.lat(), mouseEvent.latLng.lng());
		}
		
		static factory(): ng.IDirectiveFactory {
			//Create factory function which when invoked with dependencies by
			//angular will return newed up instance passing the timeout argument
			var directive: ng.IDirectiveFactory = 
				(locationEventService : app.location.LocationEventService) => new Map(locationEventService);
			//directive's injection list
			directive.$inject = ["LocationEventService"];
			return directive;
    	}
	}

	angular.module("CommonComponents").directive("map", Map.factory());
}