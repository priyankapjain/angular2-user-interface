import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  userRole:string;
  images:any=[];
  username:string='';

  constructor() { }

}
