var app;
(function (app) {
    var directives;
    (function (directives) {
        var Collapsible = (function () {
            function Collapsible() {
                var directive = {};
                directive.restrict = "E";
                directive.replace = true;
                directive.template = "<div style='border:1px solid #E6E6FA;border-radius: 5px;'><h4 style='margin:4px;'>{{title}}</h4><h5 ng-click='toggleVisibility()'  style='background:#E6E6FA;text-align:center;'>click here to collapse / expand the content</h5><div ng-show='visible' ng-transclude></div></div>";
                directive.controller = function ($scope) {
                    $scope.visible = false;
                    $scope.toggleVisibility = function () {
                        $scope.visible = !$scope.visible;
                    };
                };
                directive.transclude = true;
                directive.scope = {
                    title: "@"
                };
                return directive;
            }
            Collapsible.factory = function () {
                //Create factory function which when invoked with dependencies by
                //angular will return newed up instance passing the timeout argument
                var directive = function () { return new Collapsible(); };
                return directive;
            };
            return Collapsible;
        })();
        directives.Collapsible = Collapsible;
        angular.module("CommonComponents").directive("collapsible", Collapsible.factory());
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
