import { Attribute } from './attribute/attribute';

export class Group {

	entity: string;
	attributes: Attribute[];

	constructor(entity?: string, attributes?: any[]) {
		this.entity = entity;
		this.attributes = attributes;
	}
}
