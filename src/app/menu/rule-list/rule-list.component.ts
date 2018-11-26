import { Component, OnInit } from '@angular/core';
import { Rule } from '../rule/rule';
import { RuleService } from '../rule/rule-service.service';
import { EntityService } from '../rule/entities/entity-service.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

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

  rules: Rule[];
  ruleStates: boolean[];

  constructor(private ruleService: RuleService, private entityService: EntityService) { }

  ngOnInit() {
	this.ruleService.getRules().subscribe(resp => {
		console.log(resp);
		this.rules = resp;
		this.ruleStates = new Array(this.rules.length);
		this.ruleStates.fill(true);
	});
  }

  deleteRule(index: number) {
	if (index >= 0 && index < this.rules.length) {
		this.ruleService.deleteRule(this.rules[index]._id).subscribe(
		success => { this.rules.splice(index, 1);
			this.ruleStates[index] = false;
			console.log('Success');
		},
		error => console.log('errooor'));
	}
  }

}
