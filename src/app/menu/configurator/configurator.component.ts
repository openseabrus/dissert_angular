import { Component, OnInit } from '@angular/core';
import { RuleService } from '../rule/rule-service.service';
import { Rule } from '../rule/rule';
import { Trigger } from '../rule/trigger';
import { Action } from '../rule/action';
import { MenuCloserService } from '../menu-closer/menu-closer.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
  providers: [RuleService]
})
export class ConfiguratorComponent implements OnInit {

  private menuOpened: boolean;
  private tEntity: string;
  private tValue: number;

  private aEntity: string;
  private aAttribute: string;
  private aValue: number;

  constructor(private config: RuleService, private menuCloserService: MenuCloserService) { }

  ngOnInit() {
    this.menuOpened = false;
    this.tEntity = '';
    this.tValue = 0;

    this.aEntity = '';
    this.aAttribute = '';
    this.aValue = 0;
  }

  public setMenu() {
    this.menuCloserService.contentClick();
  }

  public submitRule() {
    const r = new Rule();
    const t = new Trigger();
    const a = new Action();

    t.entity = this.tEntity;
    t.operator = 'eq';
    t.value = this.tValue;

    a.entity = this.aEntity;
    a.attribute = this.aAttribute;
    a.value = this.aValue;

    r.trigger = t;
    r.action = a;

    console.log(r);
    // this.config.createRule(r).then((res) => { console.log(res); }).catch((err) => { console.log(err); });
    this.config.createRule(r).subscribe((res) => console.log(res));
  }

}
