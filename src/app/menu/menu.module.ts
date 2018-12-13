import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RuleListComponent } from './rule-list/rule-list.component';
import { OnlyActions, OnlyActionAttributes } from '../pipes/only-actions.pipe';
import { DatabaseLinkComponent } from './database-link/database-link.component';
import { NewRuleComponent } from './new-rule/new-rule.component';
import { NewEntityComponent } from './new-entity/new-entity.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { InitialSettingsComponent } from './initial-settings/initial-settings.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
		TagInputModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
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
	EntityListComponent,
	InitialSettingsComponent
  ]
})
export class MenuModule { }
