import { Component, OnInit } from '@angular/core';
import { Rule } from '../rule/rule';
import { RuleService } from '../rule/rule-service.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css']
})
export class RuleListComponent implements OnInit {

  rules: Rule[];
  selectedRule: Rule;

  constructor(private ruleService: RuleService) { }

  ngOnInit() {
    this.ruleService.getRules().subscribe(resp => this.rules = resp);
    if (this.rules) {
      this.selectedRule = this.rules[0];
    }
  }

}
