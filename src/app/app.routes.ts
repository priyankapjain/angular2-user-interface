import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  { path: '',                   component: LoginComponent},
  { path: 'login',              component: LoginComponent },
  { path: 'dashboard',              component: DashboardComponent }
];

export const routing = RouterModule.forRoot(routes);
