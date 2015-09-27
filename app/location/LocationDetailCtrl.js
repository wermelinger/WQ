/// <reference path="../../typings/googlemaps/google.maps.d.ts" />
var app;
(function (app) {
    var location;
    (function (location) {
        var LocationDetailCtrl = (function () {
            function LocationDetailCtrl($location, $routeParams, openWeatherService) {
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.openWeatherService = openWeatherService;
                this.currentWeather = openWeatherService.getCurrentWeather($routeParams.locationName, this.OnWeatherFetched);
            }
            LocationDetailCtrl.prototype.OnWeatherFetched = function (weather) {
                var elementForMap = document.getElementById("mapForLocation");
                var opts = {
                    center: new google.maps.LatLng(weather.latitude, weather.longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 8
                };
                var map = new google.maps.Map(elementForMap, opts);
            };
            LocationDetailCtrl.$inject = ["$location", "$routeParams", "openWeatherService"];
            return LocationDetailCtrl;
        })();
        angular.module("weatherQuery").controller("LocationDetailCtrl", LocationDetailCtrl);
    })(location = app.location || (app.location = {}));
})(app || (app = {}));
