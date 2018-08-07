import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent implements OnInit {

  @Output() closeMenu = new EventEmitter<boolean>();
  private menuOpened: boolean;
  private tEntity: string;
  private tValue: number;

  private aEntity: string;
  private aAttribute: string;
  private aValue: number;

  constructor() { }

  ngOnInit() {
    this.menuOpened = false;
    this.tEntity = '';
    this.tValue = 0;

    this.aEntity = '';
    this.aAttribute = '';
    this.aValue = 0;
  }

  public setMenu() {
    this.closeMenu.next();
  }

  public appSetMenu(state: boolean) {
    this.menuOpened = state;
  }

}
