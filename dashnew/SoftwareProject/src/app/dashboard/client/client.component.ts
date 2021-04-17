import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients:any;

  constructor(private clientSer:ClientService) { }

  ngOnInit(): void {
    this.getAllClients();
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
