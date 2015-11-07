var app;
(function (app) {
    var location;
    (function (location) {
        var that;
        var SearchHistory = (function () {
            function SearchHistory($rootScope, locationEventService) {
                that = this;
                this.SearchNames = new Array();
                locationEventService.SubscribeNewLocationFetched($rootScope, that.OnWeatherFetched);
            }
            /**
             * Delete the given search-name from history, if present.
             */
            SearchHistory.prototype.Delete = function (name) {
                var existingIndex = this.SearchNames.indexOf(name);
                if (existingIndex > -1) {
                    this.SearchNames.splice(existingIndex, 1);
                }
            };
            /**
             * Adds a search-name to the history.
             */
            SearchHistory.prototype.AddSearch = function (name) {
                this.Delete(name);
                this.SearchNames.push(name);
            };
            SearchHistory.prototype.OnWeatherFetched = function (event, weather) {
                that.AddSearch(weather.name);
            };
            SearchHistory.$inject = ["$rootScope", "LocationEventService"];
            return SearchHistory;
        })();
        location.SearchHistory = SearchHistory;
        angular.module("CommonComponents").service("SearchHistory", SearchHistory);
    })(location = app.location || (app.location = {}));
})(app || (app = {}));
