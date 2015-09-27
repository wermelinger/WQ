module app.search {
	interface ILocationSearchModel {
		locationName : string;
		search() : void;
	}
	
	class LocationSearchCtrl implements ILocationSearchModel {
		locationName : string;
		
		static $inject=["$location"]
		constructor(private $location: ng.ILocationService) {
		}
		
		search() : void {
			this.$location.path("/location/" + this.locationName);
		}
	}
	
	angular.module("weatherQuery").controller("LocationSearchCtrl", LocationSearchCtrl);
}