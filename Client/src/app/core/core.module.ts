import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogInformationComponent } from './components/dialog-information/dialog-information.component';


@NgModule({
  declarations: [
    NavMenuComponent,
    DialogInformationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  exports: [
    NavMenuComponent
  ],
})
/**
 * Module that contains all the application main components
 */
export class CoreModule { }
