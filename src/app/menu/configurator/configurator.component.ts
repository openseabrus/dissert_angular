import { Component, OnInit } from '@angular/core';
import { RuleService } from '../rule/rule-service.service';
import { Rule } from '../rule/rule';
import { Trigger } from '../rule/trigger';
import { Action } from '../rule/action';
import { MenuCloserService } from '../menu-closer/menu-closer.service';
import { EntityService } from '../rule/entities/entity-service.service';
import { Entity } from '../rule/entities/entity';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
  providers: [RuleService]
})
export class ConfiguratorComponent implements OnInit {

  private TRIGGER = 0;
  private ACTION = 1;
  private TRIGGER_AND_ACTION = 2;

  private tEntity: string;
  private tValue: number;

  private aEntity: string;
  private aAttribute: string;
  private aValue: number;
  private entities: Entity[];
  private triggerEntity: Entity;
  private actionEntity: Entity;
  private trigger: Trigger;
  private action: Action;

  constructor(private config: RuleService, private menuCloserService: MenuCloserService, private entityService: EntityService) { }

  ngOnInit() {
    this.entityService.getEntities().subscribe(res => {
      this.entities = res;
      if (this.entities.length > 0) {
        this.triggerEntity = this.entities[0];
        this.actionEntity = this.entities[0];
        this.trigger = new Trigger();
        this.action = new Action();
        this.changeEntity(this.TRIGGER_AND_ACTION);
      }
    });
    this.triggerEntity = null;
    this.tEntity = '';
    this.tValue = 0;

    this.aEntity = '';
    this.aAttribute = '';
    this.aValue = 0;
  }

  public setMenu() {
    this.menuCloserService.contentClick();
  }

  public changeEntity(action: number, e?: Event) {
    switch (action) {
      case this.TRIGGER: {
        console.log('triggered');
        this.trigger.entity = this.triggerEntity.name;
        this.trigger.attribute = this.triggerEntity.attributes[0];
        break;
      }
      case this.ACTION: {
        console.log('actioned');
        this.action.entity = this.actionEntity.name;
        this.action.attribute = this.actionEntity.attributes[0];
        break;
      }
      default: {
        this.trigger.entity = this.triggerEntity.name;
        this.trigger.attribute = this.triggerEntity.attributes[0];
        this.action.entity = this.actionEntity.name;
        this.action.attribute = this.actionEntity.attributes[0];
      }
    }
  }

  public submitRule() {
    const r = new Rule();
    const t = new Trigger();
    const a = new Action();

    t.entity = this.tEntity;
    t.operator = 'eq';
    t.value = this.tValue;

    a.entity = this.aEntity;
    // a.attribute = this.aAttribute;
    a.value = this.aValue;

    r.trigger = t;
    r.action = a;

    console.log(r);
    // this.config.createRule(r).then((res) => { console.log(res); }).catch((err) => { console.log(err); });
    this.config.createRule(r).subscribe((res) => console.log(res));
  }

}
