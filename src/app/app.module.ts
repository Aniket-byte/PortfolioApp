import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ScrollDirective } from "./scroll.directive";
import { CompanyPipe } from "./company.pipe";


const routes:Routes=[];

@NgModule({
  declarations: [
    AppComponent,
    ScrollDirective,
    CompanyPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
