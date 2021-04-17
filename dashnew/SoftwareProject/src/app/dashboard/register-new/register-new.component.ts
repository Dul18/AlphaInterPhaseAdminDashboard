import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Admin from 'src/app/dashboard/model/admin';
import { AdminService } from 'src/app/dashboard/services/admin.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-register-new',
  templateUrl: './register-new.component.html',
  styleUrls: ['./register-new.component.css']
})
export class RegisterNewComponent implements OnInit {

  constructor(private authSer:AuthService,private router:Router,private adminSer:AdminService) { }
  isSignedIn=false;
  email:string=''
  password:string=''
  username:string=''
  confirmpassword:any=''
  error:{name:string,message:string}={name:'',message:''};//firebase error handle
  newAdmin:Admin=new Admin();
  admins:any;

  ngOnInit(): void {
    if(localStorage.getItem("user")!==null){
      this.isSignedIn=true;
    }
    else{
      this.isSignedIn=false;
    }
    
  }

  async onSignUp(){
    
    this.authSer.registerAdminWithEmail(this.email,this.password)
    .then(()=>{
      this.newAdmin.email=this.email
      this.newAdmin.username=this.username
      this.adminSer.createAdmin(this.newAdmin).then(()=>{
        this.router.navigate(['']);
      })
      
    }).catch(error=>{
      this.error=error
      this.router.navigate(['/dashboard'])
    })
  }

  

}
