import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { DatabaseLinkComponent } from './database-link/database-link.component';
import { NewRuleComponent } from './new-rule/new-rule.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { NewEntityComponent } from './new-entity/new-entity.component';

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
		component: EntityListComponent
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
