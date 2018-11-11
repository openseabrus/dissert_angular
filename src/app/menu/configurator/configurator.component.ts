import { Component, OnInit } from '@angular/core';
import { RuleService } from '../rule/rule-service.service';
import { Rule } from '../rule/rule';
import { Trigger } from '../rule/trigger';
import { Action } from '../rule/action';
import { MenuCloserService } from '../menu-closer/menu-closer.service';
import { EntityService } from '../rule/entities/entity-service.service';
import { Entity } from '../rule/entities/entity';
import { DatabaseLinkService } from '../database-link/database-link.service';
import { DatabaseService } from '../database-link/database.service';
import { Poi } from '../database-link/poi';

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
  private entities2: Entity[];
  private triggerEntity: Entity;
  private actionEntity: Entity;

  /**
   * Variables used for rule submission.
   * They get shaped and updated when the user makes changes.
   */
  private trigger: Trigger;
  private action: Action;

  /**
   * Point array fetched on database link.
   * If there is no link, set the option to false;
   */
  private points: Poi[];
  private showPointOption: boolean;

  constructor(
	private config: RuleService,
	private menuCloserService: MenuCloserService,
	private entityService: EntityService,
	private databaseLinkService: DatabaseLinkService,
	private databaseService: DatabaseService
  ) {}

  ngOnInit() {
	this.entityService.getEntities().subscribe(res => {
		this.entities = res;
		this.entities2 = JSON.parse(JSON.stringify(res)); // TODO - change this

		if (this.entities.length > 0) {
		this.triggerEntity = this.entities[0];
		this.actionEntity = this.entities2[0];
		this.changeEntity(this.TRIGGER_AND_ACTION);
		}
  });
  this.databaseLinkService.getDatabase().subscribe(res => {
	this.databaseService.getPoints(res.body).subscribe(pois => {
		this.points = [];
		for (const point of pois) {
			this.points.push(new Poi(point.id, point.name, point.latitude, point.longitude, point.description));
		}
	});
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

	this.config
		.createRule(Rule.buildFromElems(this.trigger, this.action))
		.subscribe();
  }

  private isFormValid() {
	let result: boolean =
		this.action.attribute != null &&
		this.action.entity != null &&
		this.trigger.attribute != null &&
		this.trigger.entity != null;

	for (const field of this.trigger.attribute.fields) {
		if (!result) {
		return result;
		}

		result = result && field.value != null;
	}

	for (const f of this.action.attribute.fields) {
		if (!result) {
		return result;
		}

		result = result && f.value != null;
	}

	return result;
  }
}
