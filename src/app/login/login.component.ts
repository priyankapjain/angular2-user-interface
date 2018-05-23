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

  constructor(private router: Router,private loginService:LoginService) { }

  ngOnInit() {
  }
  login(user){
    this.loginService.username = user.username;
    if(user && user.username ==='Admin' && user.password ==='admin' ){
      this.loginService.userRole ='admin';


    } else {
      this.loginService.userRole = 'user';
    }
    this.router.navigate(["dashboard"]);
  }

}
