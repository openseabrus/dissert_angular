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
	private armandaURL = '/api/database/armanda';

  constructor(private http: HttpClient) {}

  getDatabase(armanda?: boolean): Observable<any> {
	return this.http
		.get<DatabaseLink>(armanda ? this.armandaURL : this.databaseURL, { observe: 'response' })
		.pipe(catchError(this.handleError));
  }

  setDatabase(db: DatabaseLink, armanda?: boolean): Observable<void | any> {
	const httpOptions = {
		headers: new HttpHeaders({
		'Content-Type': 'application/json'
		})
	};
	return this.http
		.post(armanda ? this.armandaURL : this.databaseURL, db, httpOptions)
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
