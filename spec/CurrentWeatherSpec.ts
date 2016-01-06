/// <reference path="../app/domain/CurrentWeather.ts" />

describe("Current weather flag-icon", () => {
        
        var currentWeather : app.domain.CurrentWeather;

        beforeEach(() => {
                currentWeather = new app.domain.CurrentWeather();
        });
        
        it("should concatenate correct url", () => {
                // Arrange
                currentWeather.flagimage = "bla";
                
                // Act & Assert
                expect(currentWeather.flagIcon).toBe("https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/75/country-4x3/bla.png")     
        });
        
        it("should present unknown image if none is defined", () => {
                // Act & Assert
                expect(currentWeather.flagIcon).toBe("app/location/unknown.png")     
        });
});