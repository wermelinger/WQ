/// <reference path="../app/domain/Weather.ts" />
// import testee = require('../app/domain/Weather');

describe("Weather icon", () => {
        
        var weather : app.domain.Weather;
        
        beforeEach(function() {
                weather = new app.domain.Weather(290, 1, 2, 3, 4, "bla");
        });
        
        it("should concatenate correct url", () => {
                // Act & Assert
                expect(weather.weatherIcon).toBe("http://openweathermap.org/img/w/bla.png")     
        });
});