/// <reference path="../app/domain/Weather.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
var app;
(function (app) {
    var domain;
    (function (domain) {
        describe("Weather icon", function () {
            var weather;
            beforeEach(function () {
                //            () =>  {
                weather = new app.domain.Weather(290, 1, 2, 3, 4, "bla");
                //          }
            });
            it("should concatenate correct url", function () {
                //            () =>  {
                expect(this.weather.weatherIcon()).toBe("aa");
                //expect(true).toBe(false);
                //          }
            });
        });
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
