import { Component, OnInit } from '@angular/core';
import { Entity } from '../../rule/entities/entity';
import { EntityService } from '../../rule/entities/entity-service.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

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
