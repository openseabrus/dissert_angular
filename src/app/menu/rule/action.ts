export class Action {
    _id?: string;
    entity: string;
    attribute: {
        name: string;
        type: string;
        unit: string;
    };
    value: number;

    constructor(entity?: string, attribute?: any, value?: number) {
        this.entity = entity;
        this.attribute = attribute;
        this.value = value;
    }
}
