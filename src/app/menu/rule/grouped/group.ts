import { Attribute } from './attribute/attribute';

export class Group {

	_id?: string;
	entity: string;
	attributes: Attribute[];

	constructor(entity?: string, attributes?: any[]) {
		this.entity = entity;

		if (attributes) {
			this.attributes = attributes;
		} else {
			this.attributes = [new Attribute()];
		}
	}
}
