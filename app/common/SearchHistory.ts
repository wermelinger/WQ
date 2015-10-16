module app.common {
	interface ISearchHistory {
		AddSearch(name : string);
		Delete(name : string);
		SearchNames : Array<string>;
	}
	
	export class SearchHistory implements ISearchHistory {
		
		constructor() {
			this.SearchNames = new Array<string>();
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
	}
	
	angular.module("CommonComponents").service("searchHistory", SearchHistory);
}