import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import Consultant from '../model/consultant';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  dbPath='Consultants';
  lengths:number=null;
  consultantsRef:AngularFireList<Consultant>=null

  // API_URL="http://localhost:5001/alphainterface-a8d45/us-central1/app";

  constructor(private storage:AngularFireStorage, private http:HttpClient,public db:AngularFireDatabase) { 
    this.consultantsRef=db.list(this.dbPath);
  }

  addConsultData(payload:any){
    // console.log(payload);
    // return this.http.post(this.API_URL+'/consultant/add',payload).subscribe((data)=>{
    //   console.log(data);
    // })
    
  }
  create(consultant:Consultant):any{
    return this.consultantsRef.push(consultant);
  }

  getAllConsult():AngularFireList<Consultant>{
    return this.consultantsRef;
  }
  getFileList(key:any){
    this.consultantsRef=this.db.list(this.dbPath+'/'+key+'/files');
    // console.log(this.consultantsRef);
    return this.consultantsRef;
  }

  updateConsultant(key:any,value:any){
    return this.consultantsRef.update(key,value);
  }

  online(id:any,payload:any){
    // console.log(payload)
    // this.http.post(this.API_URL+'/consultant/online/'+id,payload);
  }


}
