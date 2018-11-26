import { Attribute } from './attribute/attribute';

export class Group {

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
