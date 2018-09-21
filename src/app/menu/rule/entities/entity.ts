import { Attribute } from '../attribute/attribute';

export class Entity {
    _id?: string;
    name: string;
    attributes: Attribute[];
}
