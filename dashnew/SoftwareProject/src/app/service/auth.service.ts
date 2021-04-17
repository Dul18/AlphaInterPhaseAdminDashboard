import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FunctionService } from '../dashboard/services/function.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn=false;

  authState:any=null;
  API_URL="http://localhost:5001/alphainterface-a8d45/us-central1/app";


  constructor(private funcSer:FunctionService,private afa:AngularFireAuth,private router:Router) { 
    this.afa.authState.subscribe((auth)=>{
      this.authState=auth;
    })
  }

  // super admin login with email and password
  loginAdminWithEmail(email:string,password:string){
    return this.afa.signInWithEmailAndPassword(email,password).then((user)=>{
      this.authState=user;
      this.isLoggedIn=true;
      localStorage.setItem('user',JSON.stringify(user.user));
     
    }).catch((error)=>{
      console.log(error);
      throw error
    }
    )
  }

  // loginAdminWithEmail(email:string,password:string){}


  //Register with email and password
  registerAdminWithEmail(email:string,password:string){
    return this.afa.createUserWithEmailAndPassword(email,password).then((auth)=>{
      this.authState=auth;
    }).catch((error)=>{
      console.log(error);
      throw error
    })
  }

  //Logout
  signOut():void{
    this.afa.signOut();
    this.router.navigate(['/']);
  }

  //getCurrentUserId
  get currentUserId():string{
    return (this.authState !==null) ? this.authState.uid:''
  }

  get currentUserName():string{
    return this.authState["email"]
  }


  

  
}
