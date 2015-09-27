var app;
(function (app) {
    var location;
    (function (location) {
        var LocationDetailCtrl = (function () {
            function LocationDetailCtrl($location, $routeParams, openWeatherService) {
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.openWeatherService = openWeatherService;
                this.currentWeather = openWeatherService.getCurrentWeather($routeParams.locationName);
            }
            LocationDetailCtrl.$inject = ["$location", "$routeParams", "openWeatherService"];
            return LocationDetailCtrl;
        })();
        angular.module("weatherQuery").controller("LocationDetailCtrl", LocationDetailCtrl);
    })(location = app.location || (app.location = {}));
})(app || (app = {}));
