import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  userRegister(userRegisterObj){
    this.us.Registration(userRegisterObj).subscribe(
      res=>{
        if (res.message==='User registered'){
          alert('User registered')
          this.router.navigateByUrl('/login')
        }
        else{
          alert('Username exists!')
        }
      },
      err=>{
        console.log(err)
        alert('Something went wrong in registering...')
      }
    )
  }

}
