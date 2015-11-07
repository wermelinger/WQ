var app;
(function (app) {
    var common;
    (function (common) {
        /**
         * Reverse filter for lookups.
         */
        function ReverseFilter() {
            return function (items) {
                var reversed = new Array();
                for (var i = items.length - 1; i >= 0; i--) {
                    reversed.push(items[i]);
                }
                return reversed;
            };
        }
        common.ReverseFilter = ReverseFilter;
        angular.module("CommonComponents", ["ngResource"]);
        angular.module("CommonComponents").filter("reverse", ReverseFilter);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
