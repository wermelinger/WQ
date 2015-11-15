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
            Object.defineProperty(Weather.prototype, "weatherIcon", {
                get: function () {
                    return "http://openweathermap.org/img/w/" + this.icon + ".png";
                },
                enumerable: true,
                configurable: true
            });
            Weather.parse = function (data) {
                return new app.domain.Weather(data.main.temp + Weather.kelvinToCelsiusFactor, data.main.pressure, data.main.humidity, data.main.temp_min + Weather.kelvinToCelsiusFactor, data.main.temp_max + Weather.kelvinToCelsiusFactor, data.weather[0].icon);
            };
            Weather.kelvinToCelsiusFactor = -272.15;
            return Weather;
        })();
        domain.Weather = Weather;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
