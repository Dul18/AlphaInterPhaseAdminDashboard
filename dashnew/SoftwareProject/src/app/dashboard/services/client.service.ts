import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Client from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  dbPath='general_user';

  clientRef:AngularFireList<Client>=null
  length:number=null

  constructor(private db:AngularFireDatabase) {
    this.clientRef=db.list(this.dbPath);
   }

   create(client:Client):any{
     return this.clientRef.push(client);
   }

   getAll():AngularFireList<Client>{
     return this.clientRef;
     
   }
}
