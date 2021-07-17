import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  constructor(private ms:MovieService) { }

  ngOnInit(): void {
  }

  file:File
  selectFile(event){
    this.file=event.target.files[0]
  }

  addMovie(movieObj){
    let formData=new FormData();
    formData.append('poster',this.file,this.file.name)
    formData.append('movieObj',JSON.stringify(movieObj))
    this.ms.postMovie(formData).subscribe(
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
