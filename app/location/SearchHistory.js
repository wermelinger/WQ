var app;
(function (app) {
    var location;
    (function (location) {
        var that;
        var SearchHistory = (function () {
            function SearchHistory($rootScope, locationEventService) {
                that = this;
                locationEventService.SubscribeNewLocationFetched($rootScope, that.OnWeatherFetched);
            }
            Object.defineProperty(SearchHistory.prototype, "SearchNames", {
                /**
                 * Gets the search history.
                 */
                get: function () {
                    return this.GetSearchHistory();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Delete the given search-name from history, if present.
             */
            SearchHistory.prototype.Delete = function (name) {
                var searchHistory = this.GetSearchHistory();
                this.DeleteItem(name, searchHistory);
                this.SaveSearchHistory(searchHistory);
            };
            /**
             * Adds a search-name to the history.
             */
            SearchHistory.prototype.AddSearch = function (name) {
                var searchHistory = this.GetSearchHistory();
                this.DeleteItem(name, searchHistory);
                searchHistory.push(name);
                this.SaveSearchHistory(searchHistory);
            };
            SearchHistory.prototype.DeleteItem = function (name, list) {
                var existingIndex = list.indexOf(name);
                if (existingIndex > -1) {
                    list.splice(existingIndex, 1);
                }
            };
            SearchHistory.prototype.GetSearchHistory = function () {
                var searchHistory;
                var searchHistoryData = sessionStorage.getItem("searchHistory");
                if (searchHistoryData == null) {
                    searchHistory = new Array();
                    sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                }
                else {
                    searchHistory = JSON.parse(searchHistoryData);
                }
                return searchHistory;
            };
            SearchHistory.prototype.SaveSearchHistory = function (searchHistory) {
                sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory));
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
