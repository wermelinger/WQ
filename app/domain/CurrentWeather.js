var app;
(function (app) {
    var domain;
    (function (domain) {
        var CurrentWeather = (function () {
            function CurrentWeather() {
                this.nearbyWeather = new Array();
            }
            Object.defineProperty(CurrentWeather.prototype, "flag", {
                get: function () {
                    return "https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/75/country-4x3/" + this.flagimage + ".png";
                },
                enumerable: true,
                configurable: true
            });
            return CurrentWeather;
        })();
        domain.CurrentWeather = CurrentWeather;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
