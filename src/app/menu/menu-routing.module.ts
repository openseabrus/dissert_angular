import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { MenuComponent } from './menu.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { EntitiesComponent } from './entities/entities/entities.component';
import { NewEntityComponent } from './entities/new-entity/new-entity.component';
import { DatabaseLinkComponent } from './database-link/database-link.component';
import { NewRuleComponent } from './new-rule/new-rule.component';

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
        component: NewRuleComponent
      },
      {
        path: 'entities',
        component: EntitiesComponent
      },
      {
        path: 'entities/new',
        component: NewEntityComponent
      },
      {
        path: 'database',
        component: DatabaseLinkComponent
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
