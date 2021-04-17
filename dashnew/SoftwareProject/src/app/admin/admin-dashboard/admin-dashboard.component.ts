import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize, tap } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  constructor(private authSer:AuthService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  logoutAdmin(){
    this.authSer.signOut();
  }

  showTable(){
    this.router.navigate(['consultant'],{relativeTo:this.route});
  }
  registerAdmin(){
    this.router.navigate(['register'],{relativeTo:this.route});
  }
  
}
