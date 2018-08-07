import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent implements OnInit {

  @Output() closeMenu = new EventEmitter<boolean>();
  private menuOpened: boolean;

  constructor() { }

  ngOnInit() {
    this.menuOpened = false;
  }

  public setMenu() {
    this.closeMenu.next();
  }

  public appSetMenu(state: boolean) {
    this.menuOpened = state;
  }

}
