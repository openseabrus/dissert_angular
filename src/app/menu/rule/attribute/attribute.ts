import { Field } from './field';

export class Attribute {
    name: string;
    asAction: boolean;
    fields: Field[];
    type?: string;
}
