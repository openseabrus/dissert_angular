import { Component, OnInit, Input } from '@angular/core';
import { Rule } from '../../rule/rule';
import { RuleService } from '../../rule/rule-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  rule: Rule;

  // @Input()
  // deleteHandler: Function;

  constructor(private ruleService: RuleService) { }

  ngOnInit() {
  }

}
