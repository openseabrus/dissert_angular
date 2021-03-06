import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatabaseLink } from '../database/database-link';
import { Observable, throwError } from 'rxjs';
import { Poi } from '../database/poi';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {

	constructor(private http: HttpClient) { }

	getPoints(db: DatabaseLink): Observable<Poi[]> {
		return this.http.get<Poi[]>(String(db.link)).pipe(
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
		return throwError('Something bad happened; please try again later.');
	}
}
