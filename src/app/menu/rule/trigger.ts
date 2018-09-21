import { Attribute } from './attribute/attribute';

export class Trigger {
    _id?: string;
    entity: string;
    attribute: Attribute;
    operator: string;
    value: number;

    constructor(entity?: string, attribute?: any, value?: number, operator?: string) {
        this.entity = entity;
        if (attribute) {
            this.attribute = attribute;
        } else {
            this.attribute = new Attribute;
        }
        this.operator = operator || 'eq';
        this.value = value;
    }
}
