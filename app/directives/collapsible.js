var app;
(function (app) {
    var directives;
    (function (directives) {
        var Collapsible = (function () {
            function Collapsible() {
                var directive = {};
                directive.restrict = "E";
                directive.replace = true;
                directive.template = "<div ><h4>{{title}}</h4><h6 ng-click='toggleVisibility()'>click here to collapse / expand the content</h6><div ng-show='visible' ng-transclude></div></div>";
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
            return Collapsible;
        })();
        directives.Collapsible = Collapsible;
        angular.module("mycommon").directive("collapsible", function () { return new Collapsible(); });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
