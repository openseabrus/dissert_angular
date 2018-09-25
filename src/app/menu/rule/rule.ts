import { Trigger } from './trigger';
import { Action } from './action';

export class Rule {
    _id?: string;
    trigger: Trigger;
    action: Action;
    createDate?: string;

    constructor(rule: any) {
        this._id = rule._id;
        this.trigger = rule.trigger;
        this.action = rule.action;
        this.createDate = rule.createDate;
    }

    public static buildFromElems(trigger: Trigger, action: Action): Rule {
        const obj = {};
        obj['trigger'] = trigger;
        obj['action'] = action;

        return new Rule(obj);
    }
}
