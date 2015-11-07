module app.location {
	
	interface ILocationEventService {
		NotifyNewLocationFetched(weather : app.domain.CurrentWeather);
		SubscribeNewLocationFetched(scope : ng.IScope, callback : Function);
		
		NotifyNewLocationRequested(latitude : number, longitude : number);
		SubscribeNewLocationRequested(scope : ng.IScope, callback : Function);	
	}
	
	var that : LocationEventService;
	
	export class LocationEventService implements ILocationEventService {
		rootScope : ng.IScope;
		constructor(private $rootScope : ng.IScope) {
			that = this;
			that.rootScope = $rootScope;
		}
		
		NotifyNewLocationFetched(weather : app.domain.CurrentWeather) {
			that.rootScope.$emit('NewLocationFetched', weather);
		}
		
		SubscribeNewLocationFetched(scope, callback) {
			var handler = that.rootScope.$on('NewLocationFetched', callback);
            scope.$on('$destroy', handler); 
		}
		
		NotifyNewLocationRequested(latitude : number, longitude : number) {
			that.rootScope.$emit('NewLocationRequested', latitude, longitude);
		}
		
		SubscribeNewLocationRequested(scope, callback) {
			var handler = that.rootScope.$on('NewLocationRequested', callback);
            scope.$on('$destroy', handler); 
		}
	}
	
	angular.module("CommonComponents").service("LocationEventService", LocationEventService);
}