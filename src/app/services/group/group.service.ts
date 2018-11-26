import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Group } from 'src/app/menu/rule/grouped/group';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

	private rulesURL = '/api/rules';

	constructor(private http: HttpClient) { }

	getRules(): Observable<Group[]> {
		return this.http.get<Group[]>(this.rulesURL).pipe(
			catchError(this.handleError)
		);
	}

	createRule(rule: Group): Observable<void | any> {
		const httpOptions = {
			headers: new HttpHeaders({
			'Content-Type':  'application/json'
			})
		};
		return this.http.post(this.rulesURL, rule, httpOptions).pipe(
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
		console.error(error);
		return throwError('Something bad happened; please try again later.');
	}
}
