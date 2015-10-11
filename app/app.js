var app;
(function (app) {
    var main = angular.module("weatherQuery", ["ngRoute", "mycommon"]);
    main.config(routeConfig);
    routeConfig.$inject = ["$routeProvider", "$locationProvider"];
    function routeConfig($routeProvider, $locationProvider) {
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
        // use the HTML5 History API & set HTM5 mode true (currently disabled, so that the URL can be applied directly)
        $locationProvider.html5Mode(false);
    }
})(app || (app = {}));
