import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authaSer:AuthService,private router:Router) { }
  username:any;
  userNameLen:any=0;
  ngOnInit(): void {
    this.username= localStorage.getItem('username')
    this.userNameLen=localStorage.getItem('username').length
    this.username= localStorage.getItem('username').slice(1,this.userNameLen-1)
 

    if(this.username==null){
      this.router.navigate(['/all'])
    }
    console.log('username '+this.username);
  }

  logOut(){
    this.authaSer.signOut();
    localStorage.clear();
  }

}
