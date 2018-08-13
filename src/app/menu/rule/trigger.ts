export class Trigger {
    _id?: string;
    entity: string;
    operator: string;
    value: number;

    constructor(entity?: string, operator?: string, value?: number) {
        this.entity = entity;
        this.operator = operator;
        this.value = value;
    }
}
