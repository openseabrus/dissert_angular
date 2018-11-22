import { Field } from './field/field';
import { UUID } from 'angular2-uuid';

export class EntityAttribute {
	_id?: string;
	name: string;
	asAction?: boolean;
	fields?: Field[];

	constructor(name?: string, asAction?: boolean, fields?: Field[]) {
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
		this._id = UUID.UUID();
	}
}
