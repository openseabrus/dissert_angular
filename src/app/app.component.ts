import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuComponent]
})
export class AppComponent {

  constructor() {
  }
}
