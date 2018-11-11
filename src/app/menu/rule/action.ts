import { Attribute } from './attribute/attribute';

export class Action {
	_id?: string;
	entity: string;
	attribute: Attribute;

	constructor(entity?: string, attribute?: any) {
		this.entity = entity;
		if (attribute) {
			this.attribute = attribute;
		} else {
			this.attribute = new Attribute();
		}
	}
}
