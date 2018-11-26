import { Rule } from './rule/rule';

export class Attribute {

	name: string;
	rules: Rule[];

	constructor(name?: string, rules?: any[]) {
		this.name = name;
		this.rules = rules;
	}
}
