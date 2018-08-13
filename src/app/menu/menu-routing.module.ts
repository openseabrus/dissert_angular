import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { MenuComponent } from './menu.component';
import { RuleListComponent } from './rule-list/rule-list.component';

const menuRoutes: Routes = [
  { path: '', redirectTo: '/rules', pathMatch: 'full' },
  { path: '',
    component: MenuComponent,
    children: [
      {
        path: 'rules',
        component: RuleListComponent
      },
      {
        path: 'rules/new',
        component: ConfiguratorComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes),
    CommonModule
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class MenuRoutingModule { }
