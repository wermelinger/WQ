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
                this.LoadLocationDataWithLocationName($routeParams.locationName);
                that = this;
            }
            LocationDetailCtrl.prototype.LoadLocationDataWithLocationName = function (locationName) {
                this.currentWeather = this.openWeatherService.ByLocationName(locationName, this.OnWeatherFetched);
                this.searchHistory.AddSearch(this.currentWeather.name);
            };
            LocationDetailCtrl.prototype.LoadLocationDataWithId = function (id) {
                this.currentWeather = this.openWeatherService.ById(id, this.OnWeatherFetched);
                this.searchHistory.AddSearch(this.currentWeather.name);
            };
            LocationDetailCtrl.prototype.LoadLocationDataWithCoordinates = function (latitude, longitude) {
                this.currentWeather = this.openWeatherService.ByCoordinates(latitude, longitude, this.OnWeatherFetched);
                this.searchHistory.AddSearch(this.currentWeather.name);
            };
            LocationDetailCtrl.prototype.LastSearchNames = function () {
                return this.searchHistory.SearchNames;
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
                    position: { lat: weather.latitude, lng: weather.longitude },
                    map: map,
                    draggable: true,
                    title: weather.name
                });
                google.maps.event.addListener(marker, 'dragend', that.OnDragged);
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
