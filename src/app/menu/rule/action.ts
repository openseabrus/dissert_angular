import { Attribute } from './attribute/attribute';

export class Action {
    _id?: string;
    entity: string;
    attribute: Attribute;
    value: number;

    constructor(entity?: string, attribute?: any, value?: number) {
        this.entity = entity;
        this.attribute = attribute;
        this.value = value;
    }
}
