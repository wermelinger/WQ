var testee = require('../app/domain/CurrentWeather');
describe("Current weather flag-icon", function () {
    var currentWeather;
    beforeEach(function () {
        currentWeather = new testee.app.domain.CurrentWeather();
    });
    it("should concatenate correct url", function () {
        currentWeather.flagimage = "bla";
        expect(currentWeather.flagIcon).toBe("https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/75/country-4x3/bla.png");
    });
});
