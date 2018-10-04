import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '../rule/entities/entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntityServiceService {
  private entitiesURL = '/api/entities';

  constructor(private http: HttpClient) { }

  getEntities(): Observable<Entity[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.get<Array<Entity>>(this.entitiesURL).pipe(
      map(obj => obj.map(e => new Entity(e)))
    );
  }
}
