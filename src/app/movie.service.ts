import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private hc:HttpClient) { }

  postMovie(formData):Observable<any>{
      return this.hc.post('/'+JSON.parse(formData.get('movieObj')).language+'/addmovie',formData)
  }

  getMovies(language):Observable<any>{
    return this.hc.get(`/${language}/getmovies`)
  }

  getMovie(movieName,language):Observable<any>{
    return this.hc.get(`/${language}/getmovie/${movieName}`)
  }

  addToWatchlater(watchlaterObj):Observable<any>{
    return this.hc.post("user/watchlater",watchlaterObj)
  }

  deleteMovie(movieObj):Observable<any>{
    return this.hc.delete(`${movieObj.language}/deletemovie/${movieObj.title}`)
  }

  updateMovie(formDataObj,language,movieName):Observable<any>{
    return this.hc.put(`/${language}/updatemovie/${movieName}`,formDataObj)
  }
}
