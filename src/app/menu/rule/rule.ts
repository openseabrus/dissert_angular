import { Trigger } from './trigger';
import { Action } from './action';

export class Rule {
    _id?: string;
    trigger: Trigger;
    action: Action;
    createDate: string;

    constructor(t?: Trigger, a?: Action, c?: string, _id?: string) {
        this.trigger = t;
        this.action = a;
        this.createDate = c;
        if (_id) {
            this._id = _id;
        }
    }
}
