import { Trigger } from './members/trigger';
import { Action } from './members/action';

export class Rule {
	_id?: string;
	trigger: Trigger;
	action: Action;
	createDate?: string;
	priority?: number;

	constructor(rule: any) {
		this._id = rule._id;
		this.trigger = rule.trigger;
		this.action = rule.action;
		this.createDate = rule.createDate;

		if (rule.priority == null) {
			this.priority = 0;
		} else {
			this.priority = rule.priority;
		}
	}

	public static buildFromElems(trigger: Trigger, action: Action, priority?: number): Rule {
		const obj = {};
		obj['trigger'] = trigger;
		obj['action'] = action;

		if (priority) {
			obj['priority'] = priority;
		} else {
			obj['priority'] = 0;
		}

		return new Rule(obj);
	}
}
