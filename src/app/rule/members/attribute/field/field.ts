import { UUID } from 'angular2-uuid';
import { Operators } from './operators.enum';

export class Field {
	id?: string;
	name?: string;
	type: string;
	unit?: string;
	value?: any;
	operator?: string;
	available?: string[];

	constructor(name?: string, type?: string, unit?: string, value?: any, operator?: string) {
		this.name = name;
		this.type = type ? type : 'number';
		this.unit = unit;
		this.value = value;
		this.operator = operator ? operator : Operators.EQUAL_TO;
		this.available = [];

		this.id = UUID.UUID();
	}
}
