import { Component, OnInit } from '@angular/core';
import { Group } from '../rule/grouped/group';
import { GroupService } from 'src/app/services/group/group.service';
import { EntityService } from 'src/app/services/entity/entity-service.service';
import { DatabaseLinkService } from '../../services/database/database-link.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Entity } from '../entities/entity';
import { AttributeSimple } from '../rule/grouped/attribute/rule/action/attribute-simple/attribute-simple';
import { Poi } from '../database-link/poi';
import { EntityAttribute } from '../entities/attribute/entity-attribute';
import { Field } from '../rule/grouped/attribute/rule/action/attribute-simple/field/field';
import { Rule } from '../rule/grouped/attribute/rule/rule';
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-rule',
	templateUrl: './new-rule.component.html',
	styleUrls: ['./new-rule.component.css']
})
export class NewRuleComponent implements OnInit {

	rule: Rule;


	triggerEntities: Entity[];
	chosenTrigger: Entity;
	chosenTriggerAttribute: EntityAttribute;

	actionEntities: Entity[];
	chosenAction: Entity;
	chosenActionAttribute: EntityAttribute;

	points: Poi[];
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

	constructor(private groupService: GroupService,
				private entityService: EntityService,
				private databaseLinkService: DatabaseLinkService,
				private databaseService: DatabaseService,
				private router: Router) { }

	ngOnInit() {
		this.chosenTriggerAttribute = new EntityAttribute;
		this.chosenActionAttribute = new EntityAttribute;
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
		const group: Group = new Group();
		group.entity = this.chosenTrigger.name;
		group.attributes[0].name = this.chosenTriggerAttribute.name;

		group.attributes[0].rules[0].generateUUID();
		group.attributes[0].rules[0].triggerFields = [];
		while (group.attributes[0].rules[0].triggerFields.length < this.chosenTriggerAttribute.fields.length) {
			group.attributes[0].rules[0].triggerFields.push(new Field());
		}
		const fields = group.attributes[0].rules[0].triggerFields;
		this.fillFields(fields, this.chosenTriggerAttribute.fields);


		group.attributes[0].rules[0].action.entity = this.chosenAction.name;
		group.attributes[0].rules[0].action.attribute.name = this.chosenActionAttribute.name;

		group.attributes[0].rules[0].action.attribute.fields = [];
		while (group.attributes[0].rules[0].action.attribute.fields.length < this.chosenActionAttribute.fields.length) {
			group.attributes[0].rules[0].action.attribute.fields.push(new Field());
		}
		const actionFields = group.attributes[0].rules[0].action.attribute.fields;
		this.fillFields(actionFields, this.chosenActionAttribute.fields);

		this.groupService.createRule(group).subscribe((res) => {
			this.router.navigate(['../']);
		});
	}

	private fillFields(array: any[], original: any[]) {
		array.forEach((field, index) => {
			field.id = Number(original[index].id);
			field.name = original[index].name;
			field.type = original[index].type;
			field.unit = original[index].unit;
			field.value = original[index].value;
		});
	}

}
