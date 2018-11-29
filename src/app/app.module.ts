import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './menu/menu.module';
import { MenuCloserService } from './services/menu-closer.service';

@NgModule({
  declarations: [
	AppComponent,
	PageNotFoundComponent
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	HttpModule,
	HttpClientModule,
	RouterModule,
	MenuModule,
	AppRoutingModule
  ],
  providers: [MenuCloserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
