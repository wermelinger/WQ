var app;
(function (app) {
    var search;
    (function (search) {
        var LocationSearchCtrl = (function () {
            function LocationSearchCtrl($location) {
                this.$location = $location;
            }
            LocationSearchCtrl.prototype.search = function () {
                this.$location.path("/location/" + this.locationName);
            };
            LocationSearchCtrl.$inject = ["$location"];
            return LocationSearchCtrl;
        })();
        angular.module("weatherQuery").controller("LocationSearchCtrl", LocationSearchCtrl);
    })(search = app.search || (app.search = {}));
})(app || (app = {}));
