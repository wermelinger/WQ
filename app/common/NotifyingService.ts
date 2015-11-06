module app.common {
	interface INotifyingService {
		Notify();
		Subscribe(scope : any, callback : Function); // TODO SW: Explicit types
	}
	
	export class NotifyingService implements INotifyingService {
		
		constructor(private $rootScope : WorkerGlobalScope) { // TODO SW: Correct types?
			
		}
		
		Notify() {
			$rootScope.$emit('notifying-service-event');
		}
		
		Subscribe(scope, callback) {
			var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler); 
		}
	}
	
	angular.module("CommonComponents").factory("NotifyingService", NotifyingService);
}