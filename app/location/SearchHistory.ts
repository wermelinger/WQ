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
			locationEventService.SubscribeNewLocationFetched($rootScope, that.OnWeatherFetched);
		}
		
		/**
		 * Gets the search history.
		 */
		get SearchNames() : Array<string> {
			return this.GetSearchHistory();
		} 
		
		/**
		 * Delete the given search-name from history, if present.
		 */
		Delete(name : string) {
			var searchHistory = this.GetSearchHistory();
			this.DeleteItem(name, searchHistory);
			this.SaveSearchHistory(searchHistory);
		}
		
		/**
		 * Adds a search-name to the history.
		 */
		AddSearch(name : string) : void {
			var searchHistory = this.GetSearchHistory();
			this.DeleteItem(name, searchHistory);
			searchHistory.push(name);
			this.SaveSearchHistory(searchHistory);
		}
		
		private DeleteItem(name : string, list : Array<string>) {
			var existingIndex = list.indexOf(name);
			if (existingIndex > -1) {
				list.splice(existingIndex, 1);
			}
		}
		
		private GetSearchHistory() : Array<string> {
			var searchHistory : Array<string>;
			var searchHistoryData = sessionStorage.getItem("searchHistory")
			if (searchHistoryData == null) {
				searchHistory = new Array<string>();
				sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory));
			}
			else {
				searchHistory = JSON.parse(searchHistoryData);
			}
			
			return searchHistory;
		}
		
		private SaveSearchHistory(searchHistory : Array<string>) {
			sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory))
		}
		
		private OnWeatherFetched(event, weather : app.domain.CurrentWeather) {
			that.AddSearch(weather.name);
		}
	}
	
	angular.module("CommonComponents").service("SearchHistory", SearchHistory);
}