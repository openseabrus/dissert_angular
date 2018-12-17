import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { DatabaseLinkComponent } from './database-link/database-link.component';
import { NewRuleComponent } from './new-rule/new-rule.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { NewEntityComponent } from './new-entity/new-entity.component';
import { InitialSettingsComponent } from './initial-settings/initial-settings.component';
import { NewRuleArmandaComponent } from './armanda/new-rule-armanda/new-rule-armanda.component';
import { RuleListArmandaComponent } from './armanda/rule-list-armanda/rule-list-armanda.component';
import { InitialSettingsArmandaComponent } from './armanda/initial-settings-armanda/initial-settings-armanda.component';

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
			path: 'settings',
			component: InitialSettingsComponent
		},
		{
		path: 'database',
		component: DatabaseLinkComponent
		},
		{
		path: 'rules/new/armanda',
		component: NewRuleArmandaComponent
		},
		{
		path: 'rules/armanda',
		component: RuleListArmandaComponent
		},
		{
		path: 'settings/armanda',
		component: InitialSettingsArmandaComponent
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
