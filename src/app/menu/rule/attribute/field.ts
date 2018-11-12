import { UUID } from 'angular2-uuid';

export class Field {
	id?: string;
	name?: string;
	type: string;
	unit?: string;
	value?: any;

	constructor(name?: string, type?: string, unit?: string, value?: any) {
		this.name = name;

		if (type) {
			this.type = type;
		} else {
			this.type = 'number';
		}

		if (unit) {
			this.unit = unit;
		} else {
			this.unit = null;
		}

		if (value) {
			this.value = value;
		} else {
			this.value = null;
		}

		this.id = UUID.UUID();
	}
}
