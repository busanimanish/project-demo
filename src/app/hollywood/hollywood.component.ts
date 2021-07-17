import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-hollywood',
  templateUrl: './hollywood.component.html',
  styleUrls: ['./hollywood.component.css']
})
export class HollywoodComponent implements OnInit {

  hollywoodMovies=[]
  nomovies=false
  userType;
  constructor(private ms:MovieService,private router:Router,private us:UserService) { }

  ngOnInit(): void {
    this.userType=this.us.userType
    this.ms.getMovies("hollywood").subscribe(
      res=>{
        if(res.message==='No movies')
          this.nomovies=true
        else{
          this.hollywoodMovies=res.message
        }
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

  watchlater(movieObj){
    let username=localStorage.getItem('username')
    if (username!=undefined){
      let watchlaterObj={username,movieObj}
      this.ms.addToWatchlater(watchlaterObj).subscribe(
        res=>{
          alert(res['message'])
        },
        err=>{
          console.log(err)
          alert('Something went wrong...')
        }
      )
    }
    else{
      alert('Login to continue...')
      this.router.navigateByUrl('login')
    }
  }

  delete(movieObj){
    this.ms.deleteMovie(movieObj).subscribe(
      res=>{
        alert(res['message'])
      },
      err=>{
        console.log(err)
        alert('Something went wrong...')
      }
    )
  }

}
