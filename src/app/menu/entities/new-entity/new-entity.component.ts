import { Component, OnInit } from '@angular/core';
import { Entity } from '../../rule/entities/entity';

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

}
