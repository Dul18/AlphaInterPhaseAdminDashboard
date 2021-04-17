import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/dashboard/services/admin.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email:string="";//admin email
  password:string="";//admin password
  emailError:string="";//email validation
  passwordError:string="";//password validation
  error:{name:string,message:string}={name:'',message:''};//firebase error handle
  admins:any;
  constructor(private authSer:AuthService,private router:Router,private adminSer:AdminService) { }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  //admin login
  loginAdmin(){
    if(this.validateForm(this.email,this.password)){
      this.authSer.loginAdminWithEmail(this.email,this.password).then(()=>{
        for(let admin of this.admins){
          if(admin['email']==this.email){
            this.router.navigate(['/dashboard']);
            localStorage.setItem('username',JSON.stringify(admin['username']));
            return;
          }
        }
        
      }).catch(error=>{
        this.error=error;
        this.router.navigate(['']);
      })
    }
  }

  //form validation
  validateForm(email:string,password:string):boolean{
    if(email.length===0){
      this.emailError="please enter email";
      return false;
    }
    if(password.length===0){
      this.passwordError="please enter password";
      return false;
    }

    return true;
  }


  getAllAdmins(){
    this.adminSer.getAllAdmin().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key:c.payload.key,
          ...c.payload.val()
        }))
      )
    ).subscribe((data)=>{
      this.admins=data
      console.log(data)
    })
  }
}
