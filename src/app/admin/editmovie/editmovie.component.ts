import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent implements OnInit {

  movieObj;
  genres; directors; stars; available
  constructor(private ar:ActivatedRoute,private ms:MovieService) { }

  ngOnInit(): void {
    let movieName=this.ar.snapshot.params.moviename;
    let language=this.ar.snapshot.params.language;
    this.ms.getMovie(movieName,language).subscribe(
      res=>{
        this.movieObj=res.message
        /*this.language=this.movieObj.language
        this.moviename=this.movieObj.title
        this.yr=this.movieObj.year
        this.trailer=this.movieObj.trailer
        this.runTym=this.movieObj.time*/
        this.genres=this.movieObj.genres.join(" - ")
        this.directors=this.movieObj.directors.join(" - ")
        this.stars=this.movieObj.stars.join(" - ")
        this.available=this.movieObj.available.join(" - ")
      },
      err=>{
        console.log(err)
        alert("Something went wrong...")
      }
    )
  }

  file:File
  selectFile(event){
    //this.file[0]=event.target.files[0]
    this.file=event.target.files[0]
  }

  editMovie(editedMovieObj){
    let formData=new FormData();
    formData.append('poster',this.file,this.file.name)
    formData.append('movieObj',JSON.stringify(editedMovieObj))
    this.ms.updateMovie(formData,this.movieObj.language,this.movieObj.moviename).subscribe(
      res=>{
        //if (res.message=='Movie added'){
          alert(res['message'])
          
        
      },
      err=>{
        console.log(err)
        alert('Something went wrong...')
      }
    )
  }

}
