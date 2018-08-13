export class Action {
    _id?: string;
    entity: string;
    attribute: string;
    value: number;

    constructor(entity?: string, attribute?: string, value?: number) {
        this.entity = entity;
        this.attribute = attribute;
        this.value = value;
    }
}
