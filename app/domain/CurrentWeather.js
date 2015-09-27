var app;
(function (app) {
    var domain;
    (function (domain) {
        var CurrentWeather = (function () {
            function CurrentWeather() {
            }
            return CurrentWeather;
        })();
        domain.CurrentWeather = CurrentWeather;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
