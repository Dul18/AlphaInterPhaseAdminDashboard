import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/dashboard/services/function.service';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private funcSer:FunctionService,public api:ApiService, private authSer:AuthService,private router:Router) { }
  email:any;
  password:any;
  lemail:any;
  lpassword:any;

  ngOnInit(): void {
  }

  register(){
    this.authSer.registerAdminWithEmail(this.email,this.password).then(()=>{
      this.email=""
      this.password=""
      this.router.navigate(['/register']);
    }).catch(error=>{
      console.log(error);
    })
  }

  // register(){
  //   let user={}
  //   user['email']=this.email;
  //   user['password']=this.password;
  //   this.api.registerUser(user);
    
  // }

  login(){
    this.authSer.loginAdminWithEmail(this.lemail,this.lpassword).then((user)=>{
      this.router.navigate(['/conform']);
    }).catch(error=>{
      console.log(error);
    })
  }
  



}
