import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { DatabaseLink } from '../database/database-link';

@Injectable({
  providedIn: 'root'
})
export class DatabaseLinkService {
	private databaseURL = '/api/database';

  constructor(private http: HttpClient) {}

  getDatabase(): Observable<any> {
	return this.http
		.get<DatabaseLink>(this.databaseURL, { observe: 'response' })
		.pipe(catchError(this.handleError));
  }

  setDatabase(db: DatabaseLink): Observable<void | any> {
	const httpOptions = {
		headers: new HttpHeaders({
		'Content-Type': 'application/json'
		})
	};
	return this.http
		.post(this.databaseURL, db, httpOptions)
		.pipe(catchError(this.handleError));
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
	return throwError('Something bad happened; please try again later.');
  }
}
