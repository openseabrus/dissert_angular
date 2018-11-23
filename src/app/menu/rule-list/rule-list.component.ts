import { Component, OnInit } from '@angular/core';
// import { Rule } from '../rule/rule';
import { EntityService } from '../../services/entity/entity-service.service';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	query,
	stagger
} from '@angular/animations';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from '../rule/grouped/group';

@Component({
	selector: 'app-rule-list',
	templateUrl: './rule-list.component.html',
	styleUrls: ['./rule-list.component.css'],
	animations: [
		trigger('delete', [
			transition(':leave', [
				style({ height: '*' }),
				animate(500, style({ transform: 'scale(0)' }))
			])
		])
	]
})
export class RuleListComponent implements OnInit {

	rules: any[]; // Rule[];
	ruleStates: boolean[];

	groups: Group[];

	constructor(private groupService: GroupService, private entityService: EntityService) { }

	ngOnInit() {
		this.groupService.getRules().subscribe(resp => {
			this.groups = resp;
		});
	}

	deleteRule(groupId: number, attributeName: number, ruleId: number) {
		this.groupService.deleteRule(groupId, attributeName, ruleId).subscribe(
			success => {
				console.log('Success');
			},
			error => console.log('errooor'));
	}

	/**
	 * deleteRule(index: number) {
	if (index >= 0 && index < this.rules.length) {
		this.ruleService.deleteRule(this.rules[index]._id).subscribe(
		success => { this.rules.splice(index, 1);
			this.ruleStates[index] = false;
			console.log('Success');
		},
		error => console.log('errooor'));
	}
  }
	 */

}
