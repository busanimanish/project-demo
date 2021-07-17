import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username;
  constructor() { }
  userLoginStatus():boolean{
    let un=localStorage.getItem("username")
    if(un==null)
      return false
    else{
      this.username=un
      return true
    }
  }

  userLogout(){
    localStorage.clear()
  }
}
