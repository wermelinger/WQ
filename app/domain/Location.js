var app;
(function (app) {
    var domain;
    (function (domain) {
        var Location = (function () {
            function Location() {
            }
            return Location;
        })();
        domain.Location = Location;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
