var app;
(function (app) {
    var common;
    (function (common) {
        var OpenWeatherService = (function () {
            function OpenWeatherService($resource) {
                this.$resource = $resource;
                this.apiKey = "15185ba4fcaa79b6600788874db6ca0a";
                this.kelvinToCelsiusFactor = -272.15;
            }
            OpenWeatherService.prototype.getUser = function (locationName) {
                var _this = this;
                var location = new app.domain.Location();
                this.$resource("https://api.github.com/users/" + locationName + "&APPID=" + this.apiKey).get(function (data) {
                    location.login = data.login;
                    location.location = data.location;
                    location.avatar_url = data.avatar_url;
                    location.repos = _this.getRepos(data.repos_url);
                });
                return location;
            };
            OpenWeatherService.prototype.getCurrentWeather = function (locationName, onWeatherFetchedCallback) {
                var _this = this;
                var weather = new app.domain.CurrentWeather();
                this.$resource("http://api.openweathermap.org/data/2.5/weather?q=" + locationName).get(function (data) {
                    // Update Weather data
                    weather.name = data.name;
                    weather.longitude = data.coord.lon;
                    weather.latitude = data.coord.lat;
                    weather.weather = new app.domain.Weather(data.main.temp + _this.kelvinToCelsiusFactor, data.main.pressure, data.main.humidity, data.main.temp_min + _this.kelvinToCelsiusFactor, data.main.temp_max + _this.kelvinToCelsiusFactor, data.weather[0].icon);
                    // Notify callback
                    onWeatherFetchedCallback(weather);
                });
                return weather;
            };
            OpenWeatherService.prototype.getRepos = function (url) {
                var repos = new Array();
                this.$resource(url).query(function (data) {
                    data.forEach(function (element) {
                        var repo = new app.domain.Repo();
                        repos.push(repo);
                        repo.name = element.name;
                        repo.description = element.description;
                    });
                });
                return repos;
            };
            OpenWeatherService.$inject = ["$resource"];
            return OpenWeatherService;
        })();
        common.OpenWeatherService = OpenWeatherService;
        angular.module("mycommon").service("openWeatherService", OpenWeatherService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
