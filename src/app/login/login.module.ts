import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
import {LoginService} from "./login.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LoginComponent],
  exports:[LoginComponent],
  providers:[LoginService]
})
export class LoginModule { }
