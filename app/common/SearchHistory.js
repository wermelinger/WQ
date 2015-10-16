var app;
(function (app) {
    (function (common) {
        var SearchHistory = (function () {
            function SearchHistory() {
            }
            /**
            * Adds a search-name to the history.
            */
            SearchHistory.prototype.AddSearch = function (name) {
                this.SearchNames.push(name);
            };
            return SearchHistory;
        })();
        common.SearchHistory = SearchHistory;

        angular.module("mycommon").service("searchHistory", SearchHistory);
    })(app.common || (app.common = {}));
    var common = app.common;
})(app || (app = {}));
