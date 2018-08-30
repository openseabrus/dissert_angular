import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule } from '@angular/forms';
import { RuleListComponent } from './rule-list/rule-list.component';
import { OnlyActions } from './rule/entities/only-actions.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MenuRoutingModule
  ],
  declarations: [
    MenuComponent,
    ConfiguratorComponent,
    RuleListComponent,
    OnlyActions
  ]
})
export class MenuModule { }
