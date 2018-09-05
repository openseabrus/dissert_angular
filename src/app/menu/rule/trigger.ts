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
        if (attribute) {
            this.attribute = attribute;
        } else {
            this.attribute = {
                name: null,
                type: null,
                unit: null
            };
        }
        this.operator = operator;
        this.value = value;
    }
}
