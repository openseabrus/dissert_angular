import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuCloserService } from './menu-closer/menu-closer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: []
})
export class MenuComponent implements OnInit, OnDestroy {

  selected: number;
  menuItems: any[];
  menuOpened: boolean;
  subscription: Subscription;

  constructor(private menuCloserService: MenuCloserService) {
    this.subscription = menuCloserService.contentClick$.subscribe(
      () => {
        this.toggleMenu(null, false);
      });
  }

  ngOnInit() {
    this.selected = 0;
    this.menuItems = [
      {
        name: 'New Rule',
        route: 'rules/new'
      },
      {
        name: 'Adaptation Rules',
        route: 'rules'
      },
      {
        name: 'Triggers',
        route: 'triggers'
      },
      {
        name: 'Actions',
        route: 'actions'
      }
    ];
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

  public toggleMenu(e: Event, state: boolean) {
    if (e) { e.preventDefault(); }
    if (state != null) {
      this.menuOpened = state;
    } else {
      this.menuOpened = !this.menuOpened;
    }
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
