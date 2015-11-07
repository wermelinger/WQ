module app.location {
	interface ISearchHistory {
		AddSearch(name : string);
		Delete(name : string);
		SearchNames : Array<string>;
	}
	
	var that : SearchHistory;
	
	export class SearchHistory implements ISearchHistory {
		
		static $inject = ["$rootScope", "LocationEventService"]
		constructor($rootScope : ng.IScope, locationEventService : app.location.LocationEventService) {
			that = this;
			this.SearchNames = new Array<string>();
			locationEventService.SubscribeNewLocationFetched($rootScope, that.OnWeatherFetched);
		}
		
		/**
		 * Gets the search history.
		 */
		SearchNames : Array<string> 
		
		/**
		 * Delete the given search-name from history, if present.
		 */
		Delete(name : string) {
			var existingIndex = this.SearchNames.indexOf(name);
			if (existingIndex > -1) {
				this.SearchNames.splice(existingIndex, 1);
			}
		}
		
		/**
		 * Adds a search-name to the history.
		 */
		AddSearch(name : string) : void {
			this.Delete(name);
			this.SearchNames.push(name);
		}
		
		private OnWeatherFetched(event, weather : app.domain.CurrentWeather) {
			that.AddSearch(weather.name);
		}
	}
	
	angular.module("CommonComponents").service("SearchHistory", SearchHistory);
}