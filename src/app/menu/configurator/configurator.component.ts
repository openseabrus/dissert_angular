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

  /**
   * entities[] - All entities in the database.
   * triggerEntity - The entity to be used by variable this.trigger.
   * actionEntity - The entity to be used by variable this.action.
   */
  private entities: Entity[];
  private triggerEntity: Entity;
  private actionEntity: Entity;

  /**
   * Variables used for rule submission.
   * They get shaped and updated when the user makes changes.
   */
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
    if (!this.isFormValid()) {
      return;
    }

    console.log(this.trigger);
    // delete this.trigger['attribute']['asAction'];
    // delete this.action['attribute']['asAction'];
    // delete this.trigger['attribute']['fields'];
    // delete this.action['attribute']['fields'];
    console.log(this.trigger);


    this.config.createRule(Rule.buildFromElems(this.trigger, this.action)).subscribe();
  }

  private isFormValid() {
    let result: boolean = this.action.attribute != null && this.action.entity != null && this.action.value != null &&
    this.trigger.attribute != null && this.trigger.entity != null;

    for (const field of this.trigger.attribute.fields) {
      if (!result) {
        return result;
      }

      result = result && field.value != null;
    }

    return result;
  }

}
