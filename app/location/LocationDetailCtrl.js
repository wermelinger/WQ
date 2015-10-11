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
                this.LoadLocationData($routeParams.locationName);
            }
            LocationDetailCtrl.prototype.LoadLocationData = function (locationName) {
                this.currentWeather = this.openWeatherService.ByLocationName(locationName, this.OnWeatherFetched);
            };
            LocationDetailCtrl.prototype.LoadLocationDataWithId = function (id) {
                this.currentWeather = this.openWeatherService.ById(id, this.OnWeatherFetched);
            };
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
