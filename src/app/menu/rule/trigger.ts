import { Entity } from './entities/entity';

export class Trigger {
    _id?: string;
    entity: string;
    attribute: {
        name: string;
        type: string;
        unit: string;
    };
    operator: string;
    value: number;

    constructor(entity?: string, attribute?: any, operator?: string, value?: number) {
        this.entity = entity;
        this.attribute = attribute;
        this.operator = operator;
        this.value = value;
    }
}
