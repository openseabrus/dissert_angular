import { Field } from './field';

export class Attribute {
    name: string;
    asAction: boolean;
    fields?: Field[];
    type?: string;

    constructor(name?: string, asAction?: boolean) {
        if (arguments.length > 0) {
            this.name = name;
            this.asAction = asAction;
        }
    }
}
