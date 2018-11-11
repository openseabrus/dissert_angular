import { Component, OnInit } from '@angular/core';
import { Entity } from '../../rule/entities/entity';
import { Attribute } from '../../rule/attribute/attribute';
import { EntityService } from '../../rule/entities/entity-service.service';

@Component({
  selector: 'app-new-entity',
  templateUrl: './new-entity.component.html',
  styleUrls: ['./new-entity.component.css']
})
export class NewEntityComponent implements OnInit {

  private entity: Entity;
  private valueTypes = [{
    name: 'String',
    value: 'string'
  },
  {
    name: 'Integer',
    value: 'number'
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
