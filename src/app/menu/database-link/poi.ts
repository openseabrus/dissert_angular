export class Poi {
	id: number;
	name: string;
	description?: string;
	latitude: number;
	longitude: number;

	constructor(id: number, name: string, latitude: number, longitude: number, description?: string) {
		this.id = id;
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.description = description;
	}
}
