var app;
(function (app) {
    var domain;
    (function (domain) {
        var Weather = (function () {
            function Weather(temp, pressure, humidity, temp_min, temp_max, icon) {
                this.temp = temp;
                this.pressure = pressure;
                this.humidity = humidity;
                this.temp_min = temp_min;
                this.temp_max = temp_max;
                this.icon = icon;
            }
            Object.defineProperty(Weather.prototype, "image", {
                get: function () {
                    return "http://openweathermap.org/img/w/" + this.icon + ".png";
                },
                enumerable: true,
                configurable: true
            });
            return Weather;
        })();
        domain.Weather = Weather;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
