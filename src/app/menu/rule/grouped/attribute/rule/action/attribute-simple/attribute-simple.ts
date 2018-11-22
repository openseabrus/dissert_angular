import { Field } from './field/field';

export class AttributeSimple {

	fields: Field[];
	name: string;

	constructor(fields?: any[], name?: string) {
		if (fields) {
			this.fields = fields;
		} else {
			this.fields = [new Field()];
		}
		this.name = name;
	}
}
