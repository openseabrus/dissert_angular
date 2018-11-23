import { Action } from './action/action';
import { Field } from './action/attribute-simple/field/field';
import { UUID } from 'angular2-uuid';

export class Rule {

	triggerFields: Field[];
	action: Action;
	createDate: string;
	id: string;

	constructor(triggerFields?: any[], action?: Action, createDate?: string) {
		if (triggerFields) {
			this.triggerFields = triggerFields;
		} else {
			this.triggerFields = [new Field()];
		}

		if (this.action) {
			this.action = action;
		} else {
			this.action = new Action();
		}
		this.createDate = createDate;
		this.generateUUID();
	}

	generateUUID() {
		this.id = UUID.UUID();
	}
}
