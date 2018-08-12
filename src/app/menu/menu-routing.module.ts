import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '../../../node_modules/@angular/router';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { MenuComponent } from './menu.component';

const menuRoutes: Routes = [
  { path: '', redirectTo: '/rules/new', pathMatch: 'full' },
  { path: 'rules/new',
    component: MenuComponent,
    children: [
      {
        path: '',
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
