/// <reference path="Weather.ts" />
var app;
(function (app) {
    var domain;
    (function (domain) {
        var CurrentWeather = (function () {
            function CurrentWeather() {
                this.nearbyWeather = new Array();
            }
            Object.defineProperty(CurrentWeather.prototype, "flagIcon", {
                get: function () {
                    if (this.flagimage == null) {
                        return "app/location/unknown.png";
                    }
                    else {
                        return "https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/75/country-4x3/" + this.flagimage + ".png";
                    }
                },
                enumerable: true,
                configurable: true
            });
            return CurrentWeather;
        })();
        domain.CurrentWeather = CurrentWeather;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
