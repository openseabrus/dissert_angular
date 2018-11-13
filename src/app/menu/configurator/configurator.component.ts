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
import { Attribute } from '@angular/compiler';

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


	private POINT_ENTITY: Entity = {
		name: null,
		attributes: [
			{
				asAction: true,
				name: 'Opacity',
				fields: [
					{
						type: 'number',
						unit: '%'
					}
				]
			},
			{
				asAction: true,
				name: 'Rotation',
				fields: [
					{
						type: 'number',
						unit: 'Degrees'
					}
				]
			}
		]
	};

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
	) { }

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

	/**
	 * Changes the value of action and trigger, based on the user's choices, copying temporary values (triggerEntity and actionEntity)
	 * into definitive ones (trigger and action)
	 * @param action number - What to reset. 0 = just the Trigger. 1 = just the Action. 2 = both.
	 * @param e Event - event added by Angular - new action or trigger to be made definitive.
	 */
	public changeEntity(action: number, e?: Event) {
		switch (action) {
			case this.TRIGGER: {
				console.log('triggered');
				const t = e ? e : this.triggerEntity;
				this.trigger.entity = (t as Entity).name;
				this.trigger.attribute = (t as Entity).attributes[0];
				console.log(this.trigger);
				break;
			}
			case this.ACTION: {
				console.log('actioned');
				const a = e ? e : this.actionEntity;
				this.action.entity = (a as Entity).name;
				this.action.attribute = (a as Entity).attributes[0];
				break;
			}
			default: {
				const t = e ? e : this.triggerEntity;
				const a = e ? e : this.actionEntity;
				this.trigger.entity = (t as Entity).name;
				this.trigger.attribute = (t as Entity).attributes[0];
				this.action.entity = (a as Entity).name;
				this.action.attribute = (a as Entity).attributes[0];
			}
		}
	}

	public submitRule() {
		if (!this.isFormValid()) {
			// return;
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

	/**
	 * Verifies if all data is valid, and therefore if the request may be submitted
	 */
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

	/**
	 * Verifies if the trigger attribute contains fields related to database POIs
	 * @returns boolean - true if at least one of the fields' name is '$database'
	 */
	private containsDatabase(): boolean {
		for (const field of this.trigger.attribute.fields) {
			if (field.type === '$database') {
				return true;
			}
		}
		return false;
	}
}
