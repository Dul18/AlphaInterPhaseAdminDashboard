import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import Admin from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  dbPath='admin'
  adminRef:AngularFireList<Admin>=null;
  constructor(private db:AngularFireDatabase) { 
    this.adminRef=db.list(this.dbPath);
  }

  // getAllConsultant(){
  //   return this.db.collection('Consultants').snapshotChanges();
  // }

  createAdmin(admin:any){
    return this.adminRef.push(admin);
  }

  getAllAdmin():AngularFireList<Admin>{
    return this.adminRef;
  }
}
