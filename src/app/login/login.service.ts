import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  userRole:string='user';
  images:any=[];
  username:string='';
  constructor() { }

}
