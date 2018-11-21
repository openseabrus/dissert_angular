import { Field } from './field/field';

export class AttributeSimple {

	fields: Field[];
	name: string;

	constructor(fields?: any[], name?: string) {
		this.fields = fields;
		this.name = name;
	}
}
