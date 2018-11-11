import { Attribute } from '../attribute/attribute';

export class Entity {
	_id?: string;
	name: string;
	attributes: Attribute[];

	constructor(e: any) {
		if (e._id) {
			this._id = e._id;
		}
		this.name = e.name;
		this.attributes = e.attributes;
		for (let i = 0; i < this.attributes.length; i++) {
			this.attributes[i].copySelf();
		}
	}

	public static emptyEntity(): Entity {
		const attr: Attribute = new Attribute();
		const ent = {
			name: null,
			attributes: [attr]
		};

		return new Entity(ent);
	}

	copySelf() {
		for (let i = 0; i < this.attributes.length; i++) {
			this.attributes[i].copySelf();
		}
	}
}
