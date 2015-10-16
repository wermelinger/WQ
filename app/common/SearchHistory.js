var app;
(function (app) {
    var common;
    (function (common) {
        var SearchHistory = (function () {
            function SearchHistory() {
                this.SearchNames = new Array();
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
            return SearchHistory;
        })();
        common.SearchHistory = SearchHistory;
        angular.module("CommonComponents").service("searchHistory", SearchHistory);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
