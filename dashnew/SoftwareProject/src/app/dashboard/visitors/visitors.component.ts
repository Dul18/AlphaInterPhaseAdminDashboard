import { Component, OnInit } from '@angular/core';

import { ClientService } from '../services/client.service';
import { FunctionService } from '../services/function.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  clients:any;
  consultantList:any={};
  consultants:any;
  key=''
  name=''
  email=''
  currentEmail=''
  currentName=''
  currentCategory=''
  currentMobile:any=''
  ConLen:any=0


  constructor(private funcSer:FunctionService,private clientSer:ClientService) { }

  ngOnInit(): void {

    this.getAllClients();
    this.getConsultants();

  }

  back(){
    this.getConsultants();
  }

  getConsultants(){

    this.funcSer.getAllConsult().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key:c.payload.key,
          ...c.payload.val()
        }))
      )
    ).subscribe(data=>{
      this.consultants=data;
      
      
      for(let d in data){
        this.ConLen=this.ConLen+1;
      }
      
      console.log(this.consultants);

    })

  }

  updatetoValid(key:any){
    this.funcSer.updateConsultant(key,{verified:true}).then(()=>{
      this.getConsultants();
    })
   }
   updatetoInvalid(key:any){
     this.funcSer.updateConsultant(key,{verified:false}).then(()=>{
       this.getConsultants();
     })
   }
 
   moreDetails(email:any,firstName:any,field:any,mNu:any){
     this.currentEmail=email
     this.currentName=firstName
     this.currentCategory=field
     this.currentMobile=mNu
   }



  getAllClients(){
    this.clientSer.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key:c.payload.key,
          ...c.payload.val()
        }))
      )
    ).subscribe((data)=>{
      this.clients=data
      this.clientSer.length=this.clients.length
    })
  }

}
