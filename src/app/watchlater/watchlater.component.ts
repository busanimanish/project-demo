import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-watchlater',
  templateUrl: './watchlater.component.html',
  styleUrls: ['./watchlater.component.css']
})
export class WatchlaterComponent implements OnInit {

  watchlater=[];
  username;
  watchlaterStatus=false;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.us.moviesFromWatchlater(this.username).subscribe(
      res=>{
        if (res['message']!="Watchlater is empty"){
          this.watchlater=res['message']
          this.watchlaterStatus=true
        }
      },
      err=>{
        console.log(err)
        alert("Something went wrong...")
      }
    )
  }

  removeMovie(movieIdx){
    this.us.removeMovieFromWatchlater(this.username,movieIdx).subscribe(
      res=>{
        alert(res['message'])
      },
      err=>{
        console.log(err)
        alert('Something went wrong...')
      }
    )
  }

  getMovieDetails(movie){
    this.router.navigateByUrl(`movies/${movie.language}/moviedetails/${movie.title}`)
  }

}
