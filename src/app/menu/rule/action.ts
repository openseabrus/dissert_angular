import { EntityAttribute } from '../entities/attribute/entity-attribute';

export class Action {
	_id?: string;
	entity: string;
	attribute: EntityAttribute;

	constructor(entity?: string, attribute?: any) {
		this.entity = entity;
		if (attribute) {
			this.attribute = attribute;
		} else {
			this.attribute = new EntityAttribute();
		}
	}
}
