var app;
(function (app) {
    var domain;
    (function (domain) {
        var Repo = (function () {
            function Repo() {
            }
            return Repo;
        })();
        domain.Repo = Repo;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
