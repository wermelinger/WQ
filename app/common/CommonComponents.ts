module app.common {
	/**
	 * Reverse filter for lookups.
	 */
	export function ReverseFilter()
    {
		return function(items : Array<string>) {
			var reversed = new Array<string>();
			for(var i = items.length - 1; i >= 0; i--) {
				reversed.push(items[i]);
			}
			return reversed;
		};
    }
	
	angular.module("CommonComponents", ["ngResource"]);
	angular.module("CommonComponents").filter("reverse", ReverseFilter);
}