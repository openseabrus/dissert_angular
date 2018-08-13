import { Component, OnInit, Input } from '@angular/core';
import { Rule } from '../../rule/rule';

@Component({
  selector: 'app-rule-details',
  templateUrl: './rule-details.component.html',
  styleUrls: ['./rule-details.component.css']
})
export class RuleDetailsComponent implements OnInit {
  @Input()
  rule: Rule;

  constructor() { }

  ngOnInit() {
  }

}
