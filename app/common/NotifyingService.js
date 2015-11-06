var app;
(function (app) {
    var common;
    (function (common) {
        var NotifyingService = (function () {
            function NotifyingService($rootScope) {
                this.$rootScope = $rootScope;
            }
            NotifyingService.prototype.Notify = function () {
                $rootScope.$emit('notifying-service-event');
            };
            NotifyingService.prototype.Subscribe = function (scope, callback) {
                var handler = $rootScope.$on('notifying-service-event', callback);
                scope.$on('$destroy', handler);
            };
            return NotifyingService;
        })();
        common.NotifyingService = NotifyingService;
        angular.module("CommonComponents").factory("NotifyingService", NotifyingService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
