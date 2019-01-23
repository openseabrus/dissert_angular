import { UUID } from 'angular2-uuid';
import { Field } from './field/field';

export class Attribute {
	_id?: string;
	name: string;
	description?: string;
	asAction?: boolean;
	fields?: Field[];

	constructor(name?: string, asAction?: boolean, fields?: Field[], description?: string) {
		this.asAction = false;
		if (arguments.length > 0) {
			this.name = name;
			this.asAction = asAction;
		}

		if (fields) {
			this.fields = fields;
		} else {
			this.fields = [new Field()];
		}

		this.description = description;
		this._id = UUID.UUID();
	}
}
