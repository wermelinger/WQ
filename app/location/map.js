var app;
(function (app) {
    var directives;
    (function (directives) {
        var that;
        /**
         * Represents a simple map component.
         * Works with the LocationEventService.
         */
        var Map = (function () {
            function Map(locationEventService) {
                this.locationEventService = locationEventService;
                var directive = {};
                directive.restrict = "E";
                directive.replace = true;
                directive.template = "<div id='" + Map.mapId + "' style='height:{{height}}px;'></div>";
                directive.controller = function ($scope) {
                    locationEventService.SubscribeNewLocationFetched($scope, function (event, weather) {
                        var elementForMap = document.getElementById(Map.mapId);
                        var opts = {
                            center: new google.maps.LatLng(weather.latitude, weather.longitude),
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            zoom: 8
                        };
                        var map = new google.maps.Map(elementForMap, opts);
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(weather.latitude, weather.longitude),
                            map: map,
                            draggable: true,
                            title: weather.name
                        });
                        // Enable moving the marker
                        google.maps.event.addListener(marker, 'dragend', that.OnDragged);
                    });
                };
                directive.transclude = false;
                directive.scope = {
                    height: "@"
                };
                that = this;
                return directive;
            }
            Map.prototype.OnDragged = function (mouseEvent) {
                that.locationEventService.NotifyNewLocationRequested(mouseEvent.latLng.lat(), mouseEvent.latLng.lng());
            };
            Map.factory = function () {
                //Create factory function which when invoked with dependencies by
                //angular will return newed up instance passing the timeout argument
                var directive = function (locationEventService) { return new Map(locationEventService); };
                //directive's injection list
                directive.$inject = ["LocationEventService"];
                return directive;
            };
            Map.mapId = "mapElement";
            Map.$inject = ["LocationEventService"];
            return Map;
        })();
        directives.Map = Map;
        angular.module("CommonComponents").directive("map", Map.factory());
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
