import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule } from '@angular/forms';
import { RuleListComponent } from './rule-list/rule-list.component';
import { OnlyActions, OnlyActionAttributes } from './entities/only-actions.pipe';
import { EntitiesComponent } from './entities/entities/entities.component';
import { NewEntityComponent } from './entities/new-entity/new-entity.component';
import { DatabaseLinkComponent } from './database-link/database-link.component';
import { NewRuleComponent } from './new-rule/new-rule.component';

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
	EntitiesComponent,
	NewEntityComponent,
	DatabaseLinkComponent,
	NewRuleComponent
  ]
})
export class MenuModule { }
