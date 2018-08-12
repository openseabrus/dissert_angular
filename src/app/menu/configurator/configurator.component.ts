import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfiguratorService } from './configurator.service';
import { Rule } from '../rules/rule';
import { Trigger } from '../rules/trigger';
import { Action } from '../rules/action';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
  providers: [ConfiguratorService]
})
export class ConfiguratorComponent implements OnInit {

  @Output() closeMenu = new EventEmitter<boolean>();
  private menuOpened: boolean;
  private tEntity: string;
  private tValue: number;

  private aEntity: string;
  private aAttribute: string;
  private aValue: number;

  constructor(private config: ConfiguratorService) { }

  ngOnInit() {
    this.menuOpened = false;
    this.tEntity = '';
    this.tValue = 0;

    this.aEntity = '';
    this.aAttribute = '';
    this.aValue = 0;
  }

  public setMenu() {
    this.closeMenu.next();
  }

  public appSetMenu(state: boolean) {
    this.menuOpened = state;
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
