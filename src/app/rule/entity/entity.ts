import { Attribute } from '../members/attribute/attribute';

export class Entity {
	_id?: string;
	name: string;
	attributes: Attribute[];
	available?: string[];

	constructor(e: any) {
		if (e._id) {
			this._id = e._id;
		}
		this.name = e.name;
		this.attributes = e.attributes;
	}

	public static emptyEntity(): Entity {
		const attr: Attribute = new Attribute();
		const ent = {
			name: null,
			attributes: [attr]
		};

		return new Entity(ent);
	}
}
