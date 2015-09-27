module app.directives {
	
	export class Collapsible {
		constructor() {
			var directive : ng.IDirective = {};
			directive.restrict = "E";
			directive.replace = true;
			directive.template = "<div ><h4>{{title}}</h4><h6 ng-click='toggleVisibility()'>click here to collapse / expand the content</h6><div ng-show='visible' ng-transclude></div></div>";
			directive.controller = function($scope) {
				$scope.visible = false;
				$scope.toggleVisibility = function() {
					$scope.visible = !$scope.visible;
				}
			};
			directive.transclude = true;
			directive.scope = {
				title : "@"
			};
			
			return directive;
		}
	}

	angular.module("mycommon").directive("collapsible", () => new Collapsible());
}