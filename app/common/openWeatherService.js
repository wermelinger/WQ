var app;
(function (app) {
    var common;
    (function (common) {
        var that;
        var OpenWeatherService = (function () {
            function OpenWeatherService($resource) {
                this.$resource = $resource;
                this.apiKey = "15185ba4fcaa79b6600788874db6ca0a";
                this.kelvinToCelsiusFactor = -272.15;
                that = this;
            }
            OpenWeatherService.prototype.getCurrentWeather = function (locationName, onWeatherFetchedCallback) {
                var weather = new app.domain.CurrentWeather();
                this.$resource("http://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&APPID=" + this.apiKey).get(function (data) {
                    // Update Weather data
                    that.fillWeatherData(weather, data);
                    that.fillWeatherNearby(weather);
                    // Notify callback
                    onWeatherFetchedCallback(weather);
                });
                return weather;
            };
            OpenWeatherService.prototype.fillWeatherNearby = function (weather) {
                that.$resource("http://api.openweathermap.org/data/2.5/find?lat=" + weather.latitude + "&lon=" + weather.longitude + "&cnt=10" + "&APPID=" + this.apiKey).get(function (data) {
                    // Update Weather data
                    data.list.forEach(function (element) {
                        var weatherObj = new app.domain.CurrentWeather();
                        that.fillWeatherData(weatherObj, element);
                        weather.nearbyWeather.push(weatherObj);
                    });
                });
            };
            OpenWeatherService.prototype.fillWeatherData = function (weather, data) {
                weather.name = data.name;
                weather.flagimage = data.sys.country.toLowerCase();
                weather.longitude = data.coord.lon;
                weather.latitude = data.coord.lat;
                weather.weather = new app.domain.Weather(data.main.temp + this.kelvinToCelsiusFactor, data.main.pressure, data.main.humidity, data.main.temp_min + this.kelvinToCelsiusFactor, data.main.temp_max + this.kelvinToCelsiusFactor, data.weather[0].icon);
            };
            OpenWeatherService.$inject = ["$resource"];
            return OpenWeatherService;
        })();
        common.OpenWeatherService = OpenWeatherService;
        angular.module("mycommon").service("openWeatherService", OpenWeatherService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
