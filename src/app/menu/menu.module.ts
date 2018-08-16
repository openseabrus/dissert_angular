import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule } from '@angular/forms';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleDetailsComponent } from './rule-list/rule-details/rule-details.component';

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
    RuleDetailsComponent
  ]
})
export class MenuModule { }