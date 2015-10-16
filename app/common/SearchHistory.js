var app;
(function (app) {
    var common;
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
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
