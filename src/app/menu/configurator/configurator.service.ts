import { Injectable } from '@angular/core';
import { Rule } from '../rules/rule';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  private rulesURL = '/api/rules';

  constructor(private http: HttpClient) { }

  // get("/api/rules")
  /* getRules(): Promise<void | Rule[]> {
    return this.http.get(this.rulesURL)
               .toPromise()
               .then(response => response.json() as Rule[])
               .catch(this.handleError);
  } */

  // post("/api/rules")
  createRule(newRule: Rule): Observable<void | any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(this.rulesURL, newRule, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
        /* return this.http.post(this.rulesURL, newRule)
               .toPromise()
               .then(response => response)
               .catch(this.handleError); */
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
