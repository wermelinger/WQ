module app.domain {
	export class Location {
		login : string;
		location: string;
		avatar_url : string;
		repos : Repo[];
		
		constructor() {
			
		}
	}
}