/// <reference path="../app/domain/Weather.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />
module app.domain {
    
    
    
    describe("Weather icon", function() {
    
        var weather: app.domain.Weather;
        
        beforeEach(function() {
//            () =>  {
                weather = new app.domain.Weather(290, 1, 2, 3, 4, "bla");
  //          }
        });
    
        it("should concatenate correct url", function() {
//            () =>  {
                
                expect(this.weather.weatherIcon()).toBe("aa");
                //expect(true).toBe(false);
  //          }
        });
    });
}
