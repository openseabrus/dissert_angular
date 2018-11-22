import { EntityAttribute } from './attribute/entity-attribute';

export class Entity {
	_id?: string;
	name: string;
	attributes: EntityAttribute[];

	constructor(e: any) {
		if (e._id) {
			this._id = e._id;
		}
		this.name = e.name;
		this.attributes = e.attributes;
	}

	public static emptyEntity(): Entity {
		const attr: EntityAttribute = new EntityAttribute();
		const ent = {
			name: null,
			attributes: [attr]
		};

		return new Entity(ent);
	}
}
