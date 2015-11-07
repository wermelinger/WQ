/// <reference path="../../typings/googlemaps/google.maps.d.ts" />
var app;
(function (app) {
    var location;
    (function (location) {
        var that;
        var LocationDetailCtrl = (function () {
            function LocationDetailCtrl($scope, $location, $routeParams, openWeatherService, searchHistory, locationEventService) {
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.openWeatherService = openWeatherService;
                this.searchHistory = searchHistory;
                that = this;
                locationEventService.SubscribeNewLocationRequested($scope, that.LoadLocationDataWithCoordinates);
                that.LoadLocationDataWithLocationName($routeParams.locationName);
            }
            LocationDetailCtrl.prototype.LoadLocationDataWithLocationName = function (locationName) {
                that.currentWeather = that.openWeatherService.ByLocationName(locationName);
            };
            LocationDetailCtrl.prototype.LoadLocationDataWithId = function (id) {
                that.currentWeather = that.openWeatherService.ById(id);
            };
            LocationDetailCtrl.prototype.LoadLocationDataWithCoordinates = function (event, latitude, longitude) {
                that.currentWeather = that.openWeatherService.ByCoordinates(latitude, longitude);
            };
            LocationDetailCtrl.prototype.LastSearchNames = function () {
                return that.searchHistory.SearchNames;
            };
            LocationDetailCtrl.prototype.DeleteFromHistory = function (name) {
                that.searchHistory.Delete(name);
            };
            LocationDetailCtrl.$inject = ["$scope", "$location", "$routeParams", "OpenWeatherService", "SearchHistory", "LocationEventService"];
            return LocationDetailCtrl;
        })();
        angular.module("weatherQuery").controller("LocationDetailCtrl", LocationDetailCtrl);
    })(location = app.location || (app.location = {}));
})(app || (app = {}));
