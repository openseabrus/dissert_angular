import { Action } from './action/action';
import { Field } from './action/attribute-simple/field/field';

export class Rule {

	triggerFields: Field[];
	action: Action;
	createDate: string;

	constructor(triggerFields?: any[], action?: Action, createDate?: string) {
		this.triggerFields = triggerFields;
		this.action = action;
		this.createDate = createDate;
	}
}
