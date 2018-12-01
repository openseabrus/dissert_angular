import { UUID } from 'angular2-uuid';

export class Field {
	id?: string;
	name?: string;
	type: string;
	unit?: string;
	value?: any;
	operator?: string;

	constructor(name?: string, type?: string, unit?: string, value?: any, operator?: string) {
		this.name = name;
		this.type = type ? type : 'number';
		this.unit = unit;
		this.value = value;
		this.operator = operator ? operator : 'eq';

		this.id = UUID.UUID();
	}
}
