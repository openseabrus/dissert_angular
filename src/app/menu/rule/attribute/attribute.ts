import { Field } from './field';
import { UUID } from 'angular2-uuid';

export class Attribute {
    _id?: string;
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
        this._id = UUID.UUID();
    }
}
