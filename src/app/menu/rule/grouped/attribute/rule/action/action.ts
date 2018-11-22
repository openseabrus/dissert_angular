import { AttributeSimple } from './attribute-simple/attribute-simple';

export class Action {

	entity: string;
	attribute: AttributeSimple;

	constructor(entity?: string, attribute?: AttributeSimple) {
		this.entity = entity;

		if (attribute) {
			this.attribute = attribute;
		} else {
			this.attribute = new AttributeSimple();
		}
	}
}
