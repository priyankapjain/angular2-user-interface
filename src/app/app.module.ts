import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {LoginModule} from "./login/login.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routes";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    LoginModule,
    DashboardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
