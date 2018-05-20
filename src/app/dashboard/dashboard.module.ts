import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../login/login.service";
import {DashboardService} from "./dashboard.service";
import {FullCalendarModule} from "ng-fullcalendar";
import {EventSesrvice} from "./event.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [LoginService, DashboardService,EventSesrvice]
})
export class DashboardModule {
}
