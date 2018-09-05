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
        this.changeEntity(this.TRIGGER_AND_ACTION);
      }
    });
    this.trigger = new Trigger();
    this.action = new Action();
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

    if (this.trigger.attribute.type !== 'number') {
      delete this.trigger.operator;
    }

    // this.config.createRule(r).then((res) => { console.log(res); }).catch((err) => { console.log(err); });
    this.config.createRule(new Rule(this.trigger, this.action)).subscribe((res) => console.log(res));
  }

  private isFormValid() {
    return this.action.attribute && this.action.entity && this.action.value &&
    this.trigger.attribute && this.trigger.entity && this.trigger.value &&
    (this.trigger.attribute.type === 'number' ? this.trigger.operator : true);
  }

}
