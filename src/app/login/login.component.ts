import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private us:UserService) { }

  ngOnInit(): void {
  }

  register(){
    this.router.navigateByUrl('/register')
  }
  userLogin(userLoginObj){
    this.us.Login(userLoginObj).subscribe(
      res=>{
        if(res.message==="Login success"){
          localStorage.setItem('username',res.username)
          localStorage.setItem('token',res.token)
          localStorage.setItem('userObj',JSON.stringify(res.userObj))
          if(userLoginObj.type==='user'){
            this.us.userType='user'
            this.router.navigateByUrl(`movies`)
          }
          else if(userLoginObj.type==='admin'){
            this.us.userType='admin'
            this.router.navigateByUrl(`admin/movies`)
          }
        }
        else{
          alert(res['message'])
        }
      },
      err=>{
        alert('Something went wrong...')
      }
    )
  }
}
