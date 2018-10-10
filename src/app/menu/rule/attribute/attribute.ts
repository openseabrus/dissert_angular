import { Field } from './field';

export class Attribute {
    name: string;
    asAction: boolean;
    fields?: Field[];

    constructor(name?: string, asAction?: boolean) {
        this.asAction = false;
        if (arguments.length > 0) {
            this.name = name;
            this.asAction = asAction;
        }
        this.fields = [new Field()];
    }
}
