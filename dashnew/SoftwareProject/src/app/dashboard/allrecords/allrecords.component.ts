import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FunctionService } from '../services/function.service';
import {map} from 'rxjs/operators';
import { numberFormat } from 'highcharts';
import { DefaultComponent } from '../default/default.component';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-allrecords',
  templateUrl: './allrecords.component.html',
  styleUrls: ['./allrecords.component.css']
})
export class AllrecordsComponent implements OnInit {

  consultantList:any={};
  consultants:any
  files:any;
  key=''
  name=''
  downloadUrl=''
  email=''
  currentEmail=''
  currentName=''
  currentCategory=''
  currentMobile:any=''
  ConLen:any=0
  isDownload:boolean=false;
  constructor(private adminSer:AdminService,private funcSer:FunctionService) {
    
   }

  ngOnInit(): void {
    this.getConsultants();

  }

  
  back(){
    this.getConsultants();
    this.isDownload=!this.isDownload;
  }

  getFile(key:any){
    this.isDownload=!this.isDownload;
    this.funcSer.getFileList(key).snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key:c.payload.key,
          ...c.payload.val()
        }))
      )
    ).subscribe(data=>{
      this.files=data;
      
      console.log(this.files);

    })
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

   
    
    
    
    
    
    // this.consultants=[]
    // this.funcSer.getAllConsult().subscribe((data)=>{
    //   for(let d in data){
    //     this.consultants.push({
    //       id:d,
    //       data:data[d]
    //     })
    //   }
    //   console.log(this.consultants);
    // })
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
}


