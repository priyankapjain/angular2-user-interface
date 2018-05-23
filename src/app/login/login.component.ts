import { Component, OnInit } from '@angular/core';
import {userModel} from "./mock-user-list";
import {Router, NavigationExtras} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:userModel={
    username:'',
    password:''
  };
  private invalidUser: string='';

  constructor(private router: Router,private loginService:LoginService) { }

  ngOnInit() {
  }
  login(user){
    this.loginService.username = user.username;
    if(user && user.username ==='Admin' && user.password ==='MojoNetworks' ){
      this.loginService.userRole ='admin';
      this.router.navigate(["dashboard"]);
    } else if(user && user.username ==='user' && user.password ==='user') {
      this.loginService.userRole = 'user';
      this.router.navigate(["dashboard"]);
    } else {
       this.invalidUser = 'Please enter valid credentials';
       setTimeout(()=>{
         this.invalidUser ='';
       },2000);
    }

  }

}
