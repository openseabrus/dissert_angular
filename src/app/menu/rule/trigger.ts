import { Entity } from './entities/entity';

export class Trigger {
    _id?: string;
    entity: string;
    attribute: {
        name: string;
        type: string;
        unit: string;
        asAction?: boolean;
    };
    operator: string;
    value: number;

    constructor(entity?: string, attribute?: any, value?: number, operator?: string) {
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
        this.operator = operator || 'eq';
        this.value = value;
    }
}
