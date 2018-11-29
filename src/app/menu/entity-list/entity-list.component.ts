import { Component, OnInit } from '@angular/core';
import { EntityService } from 'src/app/services/entity-service.service';
import { Entity } from 'src/app/rule/entity/entity';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  entities: Entity[];

  constructor(private entityService: EntityService) { }

  ngOnInit() {
	this.entityService.getEntities().subscribe(resp => {
		this.entities = resp;
	});
  }

  deleteEntity(index: number) {
	if (index >= 0 && index < this.entities.length) {
		this.entityService.deleteEntity(this.entities[index]._id).subscribe(
		success => { this.entities.splice(index, 1); console.log('Sucess'); },
		error => console.log('Error deleting entity.')
		);
	}
  }

}
