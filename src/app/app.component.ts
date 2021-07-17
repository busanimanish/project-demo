import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public ls:LoginService,public us:UserService){}
  ngOnInit(){
  }

}