import { Injectable } from '@angular/core';
import { Subject } from '../../../../node_modules/rxjs';
import { MenuModule } from '../menu.module';

@Injectable()
export class MenuCloserService {

  // Observable string sources
  private contentClickSource = new Subject();


  // Observable string streams
  contentClick$ = this.contentClickSource.asObservable();

  contentClick() {
    this.contentClickSource.next();
  }

  constructor() { }
}
