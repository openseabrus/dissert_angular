import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuComponent]
})
export class AppComponent {

  @ViewChild(MenuComponent) mComp: MenuComponent;
  // @ViewChild(ConfiguratorComponent) cComp: ConfiguratorComponent;
  public menuOpened: boolean;

  constructor() {
    this.menuOpened = false;
  }

  public toggleMenu(pos: boolean) {
    this.menuOpened = pos;
    this.mComp.appToggleMenu(pos);
    // this.cComp.appSetMenu(pos);
  }
}
