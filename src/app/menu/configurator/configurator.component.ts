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

  private tEntity: string;
  private tValue: number;

  private aEntity: string;
  private aAttribute: string;
  private aValue: number;
  private entities: Entity[];
  private selectedEntity: Entity;
  private trigger: Trigger;
  private action: Action;

  constructor(private config: RuleService, private menuCloserService: MenuCloserService, private entityService: EntityService) { }

  ngOnInit() {
    this.entityService.getEntities().subscribe(res => {
      this.entities = res;
      if (this.entities.length > 0) {
        this.selectedEntity = this.entities[0];
        this.trigger = new Trigger();
        this.action = new Action();
        this.changeEntity();
      }
    });
    this.selectedEntity = null;
    this.tEntity = '';
    this.tValue = 0;

    this.aEntity = '';
    this.aAttribute = '';
    this.aValue = 0;
  }

  public setMenu() {
    this.menuCloserService.contentClick();
  }

  public changeEntity(e?: Event) {
    console.log(this.trigger);
    console.log('^ trigger || selectedEntity v');
    console.log(this.selectedEntity);
    this.trigger.entity = this.selectedEntity.name;
    this.trigger.attribute = this.selectedEntity.attributes[0];
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
