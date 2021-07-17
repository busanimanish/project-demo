import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userType;
  constructor(private hc:HttpClient) { }

  Registration(userRegisterObj):Observable<any>{
    return this.hc.post('user/register',userRegisterObj)
  }

  Login(userLoginObj):Observable<any>{
    if (userLoginObj.type==='user')
      return this.hc.post('/user/login',userLoginObj)
    else
      return this.hc.post('/admin/login',userLoginObj)
  }

  moviesFromWatchlater(username):Observable<any>{
    return this.hc.get(`user/watchlater/${username}`)
  }

  removeMovieFromWatchlater(username,movieIdx):Observable<any>{
    return this.hc.delete(`user/deletemovie/${username}/${movieIdx}`)
  }
}
