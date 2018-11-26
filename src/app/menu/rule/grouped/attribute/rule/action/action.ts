import { AttributeSimple } from './attribute-simple/attribute-simple';

export class Action {

	entity: string;
	attribute: AttributeSimple;

	constructor(entity: string, attribute: AttributeSimple) {
		this.entity = entity;
		this.attribute = attribute;
	}
}
