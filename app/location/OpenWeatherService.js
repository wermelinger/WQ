var app;
(function (app) {
    var common;
    (function (common) {
        var that;
        var OpenWeatherService = (function () {
            function OpenWeatherService($resource, locationEventService) {
                this.$resource = $resource;
                this.locationEventService = locationEventService;
                this.apiKey = "15185ba4fcaa79b6600788874db6ca0a";
                this.kelvinToCelsiusFactor = -272.15;
                that = this;
            }
            /**
             * Gets the current weather by location name.
             */
            OpenWeatherService.prototype.ByLocationName = function (locationName) {
                return that.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&APPID=" + that.apiKey);
            };
            /**
             * Gets the current weather by coordinates.
             */
            OpenWeatherService.prototype.ByCoordinates = function (latitude, longitude) {
                return that.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + that.apiKey);
            };
            /**
             * Gets the current weather by specific id.
             */
            OpenWeatherService.prototype.ById = function (id) {
                return that.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?id=" + id + "&APPID=" + that.apiKey);
            };
            OpenWeatherService.prototype.getCurrentWeather = function (resourceUri) {
                var weather = new app.domain.CurrentWeather();
                that.$resource(resourceUri).get(function (data) {
                    // Update Weather data
                    that.fillWeatherData(weather, data);
                    that.fillWeatherNearby(weather);
                    // Notify callback
                    that.locationEventService.NotifyNewLocationFetched(weather);
                });
                return weather;
            };
            OpenWeatherService.prototype.fillWeatherNearby = function (weather) {
                that.$resource("http://api.openweathermap.org/data/2.5/find?lat=" + weather.latitude + "&lon=" + weather.longitude + "&cnt=10" + "&APPID=" + that.apiKey).get(function (data) {
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
                weather.weather = new app.domain.Weather(data.main.temp + that.kelvinToCelsiusFactor, data.main.pressure, data.main.humidity, data.main.temp_min + that.kelvinToCelsiusFactor, data.main.temp_max + that.kelvinToCelsiusFactor, data.weather[0].icon);
            };
            OpenWeatherService.$inject = ["$resource", "LocationEventService"];
            return OpenWeatherService;
        })();
        common.OpenWeatherService = OpenWeatherService;
        angular.module("weatherQuery").service("OpenWeatherService", OpenWeatherService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
