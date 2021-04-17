import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { finalize, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { FunctionService } from 'src/app/dashboard/services/function.service';
import Consultant from 'src/app/dashboard/model/consultant';
import Client from 'src/app/dashboard/model/client';
import { ClientService } from 'src/app/dashboard/services/client.service';
import Category from 'src/app/dashboard/model/category';
import { CategoryService } from 'src/app/dashboard/services/category.service';


@Component({
  selector: 'admin-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.css']
})
export class ConsultantFormComponent implements OnInit {

  id:any;
  fname:string=null;
 
  category:string=null;
  selectedFile:any=null
  url:any;

  //client
  cname:string=null;
  cphoneNumber:string=null;

  client:Client=new Client();
  consultant:Consultant=new Consultant();
  newCategory:Category=new Category();

  constructor(public cateSer:CategoryService,public clientSer:ClientService, public apiSer:ApiService,private authSer:AuthService,private router:Router,private api:ApiService,
    private storage:AngularFireStorage,public funcSer:FunctionService,
    @Inject(AngularFirestore) private db:AngularFirestore) { }

  ngOnInit(): void {
  }

  
  //consultant to start
  showPreview(event){
    this.selectedFile=event.target.files[0];
  }

  // save(){
  //   this.funcSer.create(this.consultant).then(()=>{
  //     console.log("Create new Item success");
  //     // this.submitted=true;
  //   })
  // }

 

  save(){
    this.id=this.authSer.currentUserId;
    const path=`consultantFile/${Date.now()}_${this.selectedFile.name}`;
    const ref=this.storage.ref(path);

    this.storage.upload(path,this.selectedFile).snapshotChanges().pipe(
      finalize(()=>{
        ref.getDownloadURL().subscribe((url)=>{
          // this.url=url;
          // let consultant={}
          // consultant['id']=this.id,
          // consultant['category']=this.category,
          // consultant['name']=this.fname+this.lname,
          // consultant['url']=url,
          // consultant['isValid']="invalid"

          this.consultant.downloadUrl=url;
          this.consultant.email=this.authSer.currentUserName;
          this.consultant.category=this.category;
          this.funcSer.create(this.consultant).then(()=>{
            console.log("Create new Item success");
            // this.submitted=true;
            this.newCategory.categoryName=this.category
            this.newCategory.noOfConsultant=1
            this.cateSer.createCategory(this.newCategory).then(()=>{
              this.fname=""
              this.category=""
            })
          })

          
          




          // this.funcSer.addConsultData(consultant);
          //   alert('uploaded');
          //   this.fname="";
          //   this.lname=""
          //   this.category="";
          

          // this.db.collection('Consultants').add({
          //   user_id:this.id,
          //   first_name:this.fname,
          //   last_name:this.lname,
          //   category:this.category,
          //   downloadurl:url
          // }).then(()=>{
          //   alert('uploaded');
          //   this.fname="";
          //   this.lname=""
          //   this.category="";
          // });
         
        })
      })
    ).subscribe();
  }

  saveClient(){
    this.client.cemail=this.authSer.currentUserName;
    this.clientSer.create(this.client).then(()=>{
      console.log('create client success');
      this.cname="";
      this.cphoneNumber="";
    })
  }


}
