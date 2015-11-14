/// <reference path="../app/domain/Weather.ts" />
// import testee = require('../app/domain/Weather');
describe("Weather icon", function () {
    var weather;
    beforeEach(function () {
        weather = new app.domain.Weather(290, 1, 2, 3, 4, "bla");
    });
    it("should concatenate correct url", function () {
        // Act & Assert
        expect(weather.weatherIcon).toBe("http://openweathermap.org/img/w/bla.png");
    });
});
