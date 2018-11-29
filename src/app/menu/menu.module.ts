import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule } from '@angular/forms';
import { RuleListComponent } from './rule-list/rule-list.component';
import { OnlyActions, OnlyActionAttributes } from '../pipes/only-actions.pipe';
import { DatabaseLinkComponent } from './database-link/database-link.component';
import { NewRuleComponent } from './new-rule/new-rule.component';
import { NewEntityComponent } from './new-entity/new-entity.component';
import { EntityListComponent } from './entity-list/entity-list.component';

@NgModule({
  imports: [
	CommonModule,
	FormsModule,
	MenuRoutingModule
  ],
  declarations: [
	MenuComponent,
	RuleListComponent,
	OnlyActions,
	OnlyActionAttributes,
	EntityListComponent,
	NewEntityComponent,
	DatabaseLinkComponent,
	NewRuleComponent,
	EntityListComponent
  ]
})
export class MenuModule { }
