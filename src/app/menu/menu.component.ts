import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() openMenu = new EventEmitter<boolean>();

  selected: number;
  menuItems: string[];
  menuOpened: boolean;

  constructor() { }

  ngOnInit() {
    this.selected = 0;
    this.menuItems = ['Adaptation Rules', 'Triggers', 'Actions'];
    this.menuOpened = false;
  }

  public selectMenu(menuIndex: number) {
    this.selected = menuIndex;
  }

  public getClasses(index: number) {
    return {
      'pure-menu-item': true,
      'pure-menu-selected': this.selected === index
    };
  }

  public toggleMenu(e: Event) {
    e.preventDefault();
    this.openMenu.next(!this.menuOpened);
  }

  public appToggleMenu(state: boolean) {
    this.menuOpened = state;
  }

}
