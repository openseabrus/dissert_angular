import { Injectable } from '@angular/core';
import { Rule } from './rule';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Trigger } from './trigger';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private rulesURL = '/api/rules';

  constructor(private http: HttpClient) { }

  // get("/api/rules")
  getRules(): Observable<Rule[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json'
      })
    };
    return this.http.get<Array<Rule>>(this.rulesURL).pipe(
      map(obj => obj.map( o => new Rule(o)))
    );
  }

  // post("/api/rules")
  createRule(newRule: Rule): Observable<void | any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
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

  deleteRule(_id: string): Observable<{}> {
    const url = `${this.rulesURL}/${_id}`;
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
