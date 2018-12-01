import { Component, OnInit } from '@angular/core';
import { Poi } from '../../database/poi';
import { RuleService } from '../../services/rule-service.service';
import { EntityService } from '../../services/entity-service.service';
import { DatabaseLinkService } from '../../services/database-link.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Rule } from 'src/app/rule/rule';
import { Entity } from 'src/app/rule/entity/entity';
import { Attribute } from 'src/app/rule/members/attribute/attribute';
import { Field } from 'src/app/rule/members/attribute/field/field';
import { Trigger } from 'src/app/rule/members/trigger';
import { Action } from 'src/app/rule/members/action';
import { Operators } from 'src/app/rule/members/attribute/field/operators.enum';

@Component({
	selector: 'app-new-rule',
	templateUrl: './new-rule.component.html',
	styleUrls: ['./new-rule.component.css']
})
export class NewRuleComponent implements OnInit {

	private operators;

	private rule: Rule;

	private triggerEntities: Entity[];
	private chosenTrigger: Entity;
	private chosenTriggerAttribute: Attribute;

	private actionEntities: Entity[];
	private chosenAction: Entity;
	private chosenActionAttribute: Attribute;

	private priority: number;

	private points: Poi[];
	private pointer: Poi;
	private nullPoi: Poi = {
		id: -1,
		name: 'Pick a location',
		latitude: -999999999,
		longitude: -9999999
	};
	private abstractPoi: Poi = {
		id: 0,
		name: 'All POIs, individually',
		latitude: null,
		longitude: null,
		abstractPoi: true
	};
	private POINT_ENTITY: Entity = {
		name: '$database',
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

	constructor(private config: RuleService,
				private entityService: EntityService,
				private databaseLinkService: DatabaseLinkService,
				private databaseService: DatabaseService,
				private router: Router) { }

	ngOnInit() {
		this.operators = Operators;
		this.chosenTriggerAttribute = Entity.emptyEntity();
		this.chosenActionAttribute = Entity.emptyEntity();
		this.entityService.getEntities().subscribe(res => {
			this.triggerEntities = res;
			this.chosenTrigger = res[0];
			this.chosenTriggerAttribute = this.chosenTrigger.attributes[0];

			this.actionEntities = JSON.parse(JSON.stringify(res)); // TODO - change this
			this.resetActions();
		});

		this.databaseLinkService.getDatabase().subscribe(db => {
			this.databaseService.getPoints(db.body).subscribe(pois => {
				this.points = [];
				for (const point of pois) {
					this.points.push(new Poi(point.id, point.name, point.latitude, point.longitude, point.description));
				}
			});
		});
		this.pointer = this.nullPoi;
	}

	changeTriggerEntity(event: any) {
		this.chosenTrigger = event;
		this.chosenTriggerAttribute = event.attributes[0];

		this.resetActions();
	}


	changeTriggerAttribute(event: any) {
		this.resetActions();
	}

	resetActions() {
		this.chosenAction = this.actionEntities[0];
		this.chosenActionAttribute = this.chosenAction.attributes[0];
	}

	changeActionEntity(event: any) {
		this.chosenAction = event;
		this.chosenActionAttribute = event.attributes[0];
		console.log(this.chosenAction, this.chosenActionAttribute);
	}

	changePoint(event: any, field: Field) {
		field.id = event.id;
		field.value = event.name;
	}

		/**
	 * Verifies if the trigger attribute contains fields related to database POIs
	 * @returns boolean - true if at least one of the fields' name is '$database'
	 */
	private containsDatabase(): boolean {
		for (const field of this.chosenTriggerAttribute.fields) {
			if (field.type === '$database') {
				return true;
			}
		}
		return false;
	}

	private showMarkerAttributes() {
		const res = this.containsDatabase() && this.chosenAction.name === this.POINT_ENTITY.name &&
		this.chosenAction.name === this.chosenTriggerAttribute.fields[0].value &&
		this.chosenTriggerAttribute.fields[0].type.startsWith('$');
		return res;
	}

	private submitRule() {
		const trigger = new Trigger(this.chosenTrigger.name, this.chosenTriggerAttribute);
		const action = new Action(this.chosenAction.name, this.chosenActionAttribute);

		if (action.entity === '$database') {
			action.attribute.fields[0].id = trigger.attribute.fields[0].id;
		}

		const rule = Rule.buildFromElems(trigger, action, this.priority);
		this.config.createRule(rule).subscribe(res => {
			this.router.navigate(['../']);
		});
	}

}
