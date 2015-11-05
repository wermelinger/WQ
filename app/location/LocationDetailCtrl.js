/// <reference path="../../typings/googlemaps/google.maps.d.ts" />
var app;
(function (app) {
    var location;
    (function (location) {
        var that;
        var LocationDetailCtrl = (function () {
            function LocationDetailCtrl($location, $routeParams, openWeatherService, searchHistory) {
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.openWeatherService = openWeatherService;
                this.searchHistory = searchHistory;
                that = this;
                that.LoadLocationDataWithLocationName($routeParams.locationName);
            }
            LocationDetailCtrl.prototype.LoadLocationDataWithLocationName = function (locationName) {
                that.currentWeather = that.openWeatherService.ByLocationName(locationName, that.OnWeatherFetched);
            };
            LocationDetailCtrl.prototype.LoadLocationDataWithId = function (id) {
                that.currentWeather = that.openWeatherService.ById(id, that.OnWeatherFetched);
            };
            LocationDetailCtrl.prototype.LoadLocationDataWithCoordinates = function (latitude, longitude) {
                that.currentWeather = that.openWeatherService.ByCoordinatesTest(latitude, longitude, that.OnWeatherFetched);
            };
            LocationDetailCtrl.prototype.LastSearchNames = function () {
                return that.searchHistory.SearchNames;
            };
            LocationDetailCtrl.prototype.DeleteFromHistory = function (name) {
                that.searchHistory.Delete(name);
            };
            LocationDetailCtrl.prototype.OnWeatherFetched = function (weather) {
                var elementForMap = document.getElementById("mapForLocation");
                var opts = {
                    center: new google.maps.LatLng(weather.latitude, weather.longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 8
                };
                var map = new google.maps.Map(elementForMap, opts);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(weather.latitude, weather.longitude),
                    map: map,
                    draggable: true,
                    title: weather.name
                });
                google.maps.event.addListener(marker, 'dragend', that.OnDragged);
                that.searchHistory.AddSearch(weather.name);
            };
            LocationDetailCtrl.prototype.OnDragged = function (mouseEvent) {
                that.LoadLocationDataWithCoordinates(mouseEvent.latLng.lat(), mouseEvent.latLng.lng());
            };
            LocationDetailCtrl.$inject = ["$location", "$routeParams", "openWeatherService", "searchHistory"];
            return LocationDetailCtrl;
        })();
        angular.module("weatherQuery").controller("LocationDetailCtrl", LocationDetailCtrl);
    })(location = app.location || (app.location = {}));
})(app || (app = {}));
