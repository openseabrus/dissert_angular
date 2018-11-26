import { EntityAttribute } from '../entities/attribute/entity-attribute';

export class Trigger {
	_id?: string;
	entity: string;
	attribute: EntityAttribute;
	operator?: string;

	constructor(entity?: string, attribute?: any, operator?: string) {
		this.entity = entity;
		if (attribute) {
			this.attribute = attribute;
		} else {
			this.attribute = new EntityAttribute();
		}
		this.operator = operator || 'eq';
	}
}
