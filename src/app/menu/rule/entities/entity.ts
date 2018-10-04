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
    }
}
