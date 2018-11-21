export class Field {

	id?: number;
	name?: string;
	type: string;
	unit?: string;
	value: string;

	constructor(id?: number, name?: string, type?: string, unit?: string, value?: string) {
		if (arguments.length > 0) {
			this.id = id;
		} else {
			this.id = -1;
		}

		this.name = name;
		this.type = type;
		this.unit = unit;
		this.value = value;
	}
}
