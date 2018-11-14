import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Entity } from './entity';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private entitiesURL = '/api/entities';

  constructor(private http: HttpClient) { }

  getEntities(): Observable<Entity[]> {
	const httpOptions = {
		headers: new HttpHeaders({
		'Accept': 'application/json'
		})
	};
	return this.http.get<Entity[]>(this.entitiesURL).pipe(
		catchError(this.handleError)
	);
  }

  // post("/api/entities")
  createEntity(newEntity: Entity): Observable<void | any> {
	const httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json'
		})
	};
	console.log(newEntity);
	return this.http.post(this.entitiesURL, newEntity, httpOptions)
		.pipe(
		catchError(this.handleError)
		);
  }

  deleteEntity(_id: string): Observable<{}> {
	const url = `${this.entitiesURL}/${_id}`;
	return this.http.delete(url).pipe(
		catchError(this.handleError)
	);
  }

  private handleError(error: HttpErrorResponse) {
	if (error.error instanceof ErrorEvent) {
		// A client-side or network error occurred. Handle it accordingly.
		console.error('An error occurred:', error.error.message);
	} else {
		// The backend returned an unsuccessful response code.
		// The response body may contain clues as to what went wrong,
		console.error(error);
	}
	// return an observable with a user-facing error message
	return throwError(
		'Something bad happened; please try again later.');
  }
}
