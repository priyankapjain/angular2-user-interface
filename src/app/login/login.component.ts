import { Component, OnInit } from '@angular/core';
import {userModel} from "./mock-user-list";
import {Router} from "@angular/router";

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

  constructor(private router: Router) { }

  ngOnInit() {
  }
  login(user){
    // console.log('*** User',user);
    this.router.navigate(['/dashboard']);
  }

}
