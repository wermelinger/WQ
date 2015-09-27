var app;
(function (app) {
    var common;
    (function (common) {
        angular.module("mycommon", ["ngResource"]);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
