import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {

  movie;
  constructor(private ar:ActivatedRoute,private ms:MovieService) { }

  ngOnInit(): void {
    let movieName=this.ar.snapshot.params.moviename;
    let language=this.ar.snapshot.params.language;
    this.ms.getMovie(movieName,language).subscribe(
      res=>{
        this.movie=res.message
      },
      err=>{
        console.log(err)
        alert("Something went wrong...")
      }
    )
  }

}
