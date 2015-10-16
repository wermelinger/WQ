module app.common {
	interface ISearchHistory {
		AddSearch(name : string);
		SearchNames : Array<string>;
	}
	
	export class SearchHistory implements ISearchHistory {
		
		/**
		 * Gets the search history.
		 */
		SearchNames : Array<string> 
		
		/**
		 * Adds a search-name to the history.
		 */
		AddSearch(name : string) : void {
			this.SearchNames.push(name);
		}
	}
	
	angular.module("mycommon").service("searchHistory", SearchHistory);
}