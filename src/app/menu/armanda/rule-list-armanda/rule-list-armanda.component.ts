import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { Rule } from 'src/app/rule/rule';
import { RuleService } from 'src/app/services/rule-service.service';
import { EntityService } from 'src/app/services/entity-service.service';

@Component({
  selector: 'app-rule-list-armanda',
  templateUrl: './rule-list-armanda.component.html',
  styleUrls: ['./rule-list-armanda.component.css'],
  animations: [
	trigger('delete', [
		transition(':leave', [
			style({ height: '*' }),
			animate(500, style({ transform: 'scale(0)' }))
		])
	])
  ]
})
export class RuleListArmandaComponent implements OnInit {

  rules: Rule[];
  ruleStates: boolean[];

  constructor(private ruleService: RuleService, private entityService: EntityService) { }

  ngOnInit() {
	this.ruleService.getRules(true).subscribe(resp => {
		console.log(resp);
		this.rules = resp;
		this.ruleStates = new Array(this.rules.length);
		this.ruleStates.fill(true);
	});
  }

  deleteRule(index: number) {
	if (index >= 0 && index < this.rules.length) {
		this.ruleService.deleteRule(this.rules[index]._id, true).subscribe(
		success => { this.rules.splice(index, 1);
			this.ruleStates[index] = false;
			console.log('Success');
		},
		error => console.log('errooor'));
	}
  }

}
