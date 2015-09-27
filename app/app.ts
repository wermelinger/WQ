module app {
	var main = angular.module("weatherQuery", ["ngRoute", "mycommon"]);
	main.config(routeConfig);
	
	routeConfig.$inject = ["$routeProvider", "$locationProvider"]
	function routeConfig($routeProvider : ng.route.IRouteProvider, $locationProvider : ng.ILocationProvider) : void {
		

		$routeProvider
		.when("/search", {
			templateUrl: "/app/search/locationSearchView.html",
			controller: "LocationSearchCtrl as vm"
		})
		.when("/location/:locationName", {
			templateUrl: "/app/location/locationDetailView.html",
			controller: "LocationDetailCtrl as vm"
		})
		.otherwise("/search");
		
				// use the HTML5 History API & set HTM5 mode true
    	$locationProvider.html5Mode(false);
		
	}
}