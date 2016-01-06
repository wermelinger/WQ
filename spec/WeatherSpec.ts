/// <reference path="../app/domain/Weather.ts" />
/// <reference path="../app/domain/CurrentWeather.ts" />

describe("Weather icon", () => {
        var weather : app.domain.Weather;
        
        beforeEach(() => {
            this.weather = new app.domain.Weather(290, 1, 2, 3, 4, "bla");
        });
        
        it("should concatenate correct url", () => {
                // Act & Assert
                expect(this.weather.weatherIcon).toBe("http://openweathermap.org/img/w/bla.png")
        });
});