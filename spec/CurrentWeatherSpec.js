/// <reference path="../app/domain/CurrentWeather.ts" />
// import M = require('../app/domain/CurrentWeather');
describe("Current weather flag-icon", function () {
    var currentWeather;
    beforeEach(function (angular) {
        currentWeather = new app.domain.CurrentWeather();
    });
    it("should concatenate correct url", function () {
        // Arrange
        currentWeather.flagimage = "bla";
        // Act & Assert
        expect(currentWeather.flagIcon).toBe("https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/75/country-4x3/bla.png");
    });
    it("should present unknown image if none is defined", function () {
        // Act & Assert
        expect(currentWeather.flagIcon).toBe("unknown.png");
    });
});
