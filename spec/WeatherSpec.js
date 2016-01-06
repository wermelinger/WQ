/// <reference path="../app/domain/Weather.ts" />
/// <reference path="../app/domain/CurrentWeather.ts" />
var _this = this;
describe("Weather icon", function () {
    var weather;
    beforeEach(function () {
        _this.weather = new app.domain.Weather(290, 1, 2, 3, 4, "bla");
    });
    it("should concatenate correct url", function () {
        // Act & Assert
        expect(_this.weather.weatherIcon).toBe("http://openweathermap.org/img/w/bla.png");
    });
});
