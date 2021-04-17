import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL=environment.API_URL;
  authState:any;

  constructor(private http:HttpClient) { }

  addConsultantDetails(payload:any){
    console.log(payload);
    return this.http.post(this.API_URL+'/consultant/create',payload);
  }

  registerUser(payload:any){
    this.authState=payload;
    console.log(payload);
    return this.http.post(this.API_URL+'/user',payload).subscribe((user)=>{
      this.authState=user
    });
  }

  saveImg(payload:any){
    console.log(payload);
    return this.http.post(this.API_URL+'/save',payload);
  }
  get currentUserId():string{
    return (this.authState !==null) ? this.authState.uid:''
  }
}
