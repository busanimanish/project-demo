import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MovieService } from '../movie.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tollywood',
  templateUrl: './tollywood.component.html',
  styleUrls: ['./tollywood.component.css']
})
export class TollywoodComponent implements OnInit {

  tollywoodMovies=[]
  nomovies=false
  userType;
  constructor(private ms:MovieService,private router:Router,private us:UserService,private ls:LoginService) { }

  ngOnInit(): void {
    this.userType=this.us.userType
    this.ms.getMovies("tollywood").subscribe(
      res=>{
        if(res.message==='No movies')
          this.nomovies=true
        else{
          this.tollywoodMovies=res.message
        }
      },
      err=>{
        console.log(err)
        alert('Something went wrong...')
      }
    )
  }

  getMovieDetails(movie){
    if (this.ls.userLoginStatus()==true){
      this.router.navigateByUrl(`movies/${movie.language}/moviedetails/${movie.title}`)
    }
    else{
      alert("Please login to continue...")
      this.router.navigateByUrl('login')
    }
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

  edit(movieName){
    this.router.navigateByUrl(`admin/movies/tollywood/editmovie/${movieName}`)
  }

}
