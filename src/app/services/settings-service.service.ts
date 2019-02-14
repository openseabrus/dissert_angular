import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Settings } from '../menu/initial-settings/settings';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private settingsURL = '/api/settings';

	constructor(private http: HttpClient) { }

	getSettings(): Observable<Settings> {
		return this.http.get<Settings>(this.settingsURL).pipe(
			catchError(this.handleError)
		);
	}

	newSettings(set: Settings): Observable<void | any> {
		const httpOptions = {
			headers: new HttpHeaders({
			'Content-Type': 'application/json'
			})
		};
		return this.http
			.put(this.settingsURL, set, httpOptions)
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
		return throwError(
			'Something bad happened; please try again later.');
	}
}
