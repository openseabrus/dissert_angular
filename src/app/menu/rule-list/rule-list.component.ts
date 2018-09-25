import { Component, OnInit } from '@angular/core';
import { Rule } from '../rule/rule';
import { RuleService } from '../rule/rule-service.service';
import { EntityService } from '../rule/entities/entity-service.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css']
})
export class RuleListComponent implements OnInit {

  rules: Rule[];
  selectedRule: Rule;

  constructor(private ruleService: RuleService, private entityService: EntityService) { }

  ngOnInit() {
    this.ruleService.getRules().subscribe(resp => {
      console.log(resp);
      this.rules = resp;
    });
    if (this.rules) {
      this.selectedRule = this.rules[0];
    }
  }

  deleteRule(index: number) {
    if (index >= 0 && index < this.rules.length) {
      this.ruleService.deleteRule(this.rules[index]._id).subscribe(
        success => { this.rules.splice(index, 1); console.log('Success'); },
        error => console.log('errooor'));
    }
  }

}
