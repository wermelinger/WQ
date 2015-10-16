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
            /**
             * Gets the current weather by location name.
             */
            OpenWeatherService.prototype.ByLocationName = function (locationName, onWeatherFetchedCallback) {
                return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&APPID=" + this.apiKey, onWeatherFetchedCallback);
            };
            /**
             * Gets the current weather by coordinates.
             */
            OpenWeatherService.prototype.ByCoordinates = function (latitude, longitude, onWeatherFetchedCallback) {
                return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + this.apiKey, onWeatherFetchedCallback);
            };
            /**
             * Gets the current weather by specific id.
             */
            OpenWeatherService.prototype.ById = function (id, onWeatherFetchedCallback) {
                return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?id=" + id + "&APPID=" + this.apiKey, onWeatherFetchedCallback);
            };
            OpenWeatherService.prototype.getCurrentWeather = function (resourceUri, onWeatherFetchedCallback) {
                var weather = new app.domain.CurrentWeather();
                this.$resource(resourceUri).get(function (data) {
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
                weather.id = data.id;
                weather.flagimage = data.sys.country.toLowerCase();
                weather.longitude = data.coord.lon;
                weather.latitude = data.coord.lat;
                weather.weather = new app.domain.Weather(data.main.temp + this.kelvinToCelsiusFactor, data.main.pressure, data.main.humidity, data.main.temp_min + this.kelvinToCelsiusFactor, data.main.temp_max + this.kelvinToCelsiusFactor, data.weather[0].icon);
            };
            OpenWeatherService.$inject = ["$resource"];
            return OpenWeatherService;
        })();
        common.OpenWeatherService = OpenWeatherService;
        angular.module("weatherQuery").service("openWeatherService", OpenWeatherService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
