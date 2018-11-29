import { Component, OnInit } from '@angular/core';
import { EntityService } from 'src/app/services/entity-service.service';
import { Entity } from 'src/app/rule/entity/entity';
import { Attribute } from 'src/app/rule/members/attribute/attribute';
import { Field } from 'src/app/rule/members/attribute/field/field';

@Component({
	selector: 'app-new-entity',
	templateUrl: './new-entity.component.html',
	styleUrls: ['./new-entity.component.css']
})
export class NewEntityComponent implements OnInit {

	private entity: Entity;
	private valueTypes = [
		{
			name: 'Integer',
			value: 'number'
		},
		{
			name: 'String',
			value: 'string'
		},
		{
			name: 'Double',
			value: 'double'
		},
		{
			name: 'Boolean',
			value: 'boolean'
		},
		{
			name: 'Points from Database',
			value: '$database'
		}];

	constructor(private entityService: EntityService) { }

	ngOnInit() {
		this.entity = Entity.emptyEntity();
	}

	private addAttribute() {
		this.entity.attributes.push(new Attribute());
	}

	private removeAttribute(index: number) {
		this.entity.attributes.splice(index, 1);
	}

	private addField(attr: Attribute) {
		attr.fields.push(new Field());
	}

	private removeField(attr: Attribute, index: number) {
		attr.fields.splice(index, 1);
	}

	private checkIsFormValid() {
		let validity = true;

		validity = this.entity.name && validity;
		for (const attr of this.entity.attributes) {
			if (!validity || attr === null || attr === undefined || attr.name === undefined || attr.name === null) {
				return false;
			}

			validity = validity && attr.name.length > 0;
		}

		return validity;
	}

	private submitEntity() {
		if (!this.checkIsFormValid()) {
			return;
		}

		this.entityService.createEntity(this.entity).subscribe();
	}

}
