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
    return this.http.get<Array<any>>(this.rulesURL).pipe(
      map(obj => obj.map( o => {
        console.log(o);
        const t = o['trigger'];
        const trigger = new Trigger(t['entity'], t['operator'], t['value']);

        const a = o['action'];
        const action = new Action(a['entity'], a['attribute'], a['value']);
        return new Rule(trigger, action, o['createDate'], o['_id']);
      }))
    );
  }

  /*
  map(obj => {
          return obj.
          console.log(obj);
          const t = obj['trigger'];
          const trigger = new Trigger(t['entity'], t['operator'], t['value']);

          const a = obj['action'];
          const action = new Action(a['entity'], a['attribute'], a['value']);
          return new Rule(trigger, action, obj['createDate'], obj['_id']);
        })
  [
    {
        "_id": "5b6daded9df9182414d2c148",
        "trigger": {
            "entity": "map",
            "operator": "eq",
            "value": 20
        },
        "action": {
            "entity": "map",
            "attribute": "zoom",
            "value": 15
        },
        "createDate": "2018-08-10T15:23:25.125Z"
    }
]
  */

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
