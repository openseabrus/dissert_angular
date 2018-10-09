import { Component, OnInit } from '@angular/core';
import { Entity } from '../../rule/entities/entity';
import { Attribute } from '../../rule/attribute/attribute';

@Component({
  selector: 'app-new-entity',
  templateUrl: './new-entity.component.html',
  styleUrls: ['./new-entity.component.css']
})
export class NewEntityComponent implements OnInit {

  private entity: Entity;

  constructor() { }

  ngOnInit() {
    this.entity = Entity.emptyEntity();
  }

  private addAttribute() {
    this.entity.attributes.push(new Attribute());
  }

  private removeAttribute(index: number) {
    this.entity.attributes.splice(index, 1);
  }

  private submitEntity() {
    
  }

}
