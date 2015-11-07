var app;
(function (app) {
    var location;
    (function (location) {
        var that;
        var LocationEventService = (function () {
            function LocationEventService($rootScope) {
                this.$rootScope = $rootScope;
                that = this;
                that.rootScope = $rootScope;
            }
            LocationEventService.prototype.NotifyNewLocationFetched = function (weather) {
                that.rootScope.$emit('NewLocationFetched', weather);
            };
            LocationEventService.prototype.SubscribeNewLocationFetched = function (scope, callback) {
                var handler = that.rootScope.$on('NewLocationFetched', callback);
                scope.$on('$destroy', handler);
            };
            LocationEventService.prototype.NotifyNewLocationRequested = function (latitude, longitude) {
                that.rootScope.$emit('NewLocationRequested', latitude, longitude);
            };
            LocationEventService.prototype.SubscribeNewLocationRequested = function (scope, callback) {
                var handler = that.rootScope.$on('NewLocationRequested', callback);
                scope.$on('$destroy', handler);
            };
            return LocationEventService;
        })();
        location.LocationEventService = LocationEventService;
        angular.module("CommonComponents").service("LocationEventService", LocationEventService);
    })(location = app.location || (app.location = {}));
})(app || (app = {}));
