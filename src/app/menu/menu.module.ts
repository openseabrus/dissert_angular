import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MenuRoutingModule
  ],
  declarations: [
    MenuComponent,
    ConfiguratorComponent
  ]
})
export class MenuModule { }
