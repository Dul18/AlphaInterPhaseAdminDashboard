import { Component, OnInit } from '@angular/core';
import { AllrecordsComponent } from '../allrecords/allrecords.component';
import { ClientService } from '../services/client.service';
import { FunctionService } from '../services/function.service';
import {map} from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { CategoryService } from '../services/category.service';



@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})



export class DefaultComponent implements OnInit {

  Highcharts=Highcharts
  chartOptions={};

  ConLen:any=0
  ClienLen:any=0
  CatLen:any=0
  consultants:any;
  clients:any;
  TotVisitors:any=0;
  category:any;

  constructor(private funcSer:FunctionService,private clientSer:ClientService, private categorySer:CategoryService) { }

  async ngOnInit(): Promise<void>{
    
   let xcon=this.getConsultants();
   console.log('xcon '+xcon);
   this.getAllClients();

   //pie chart 
   this.chartOptions= {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    exporting:{
      enabled:true
    },
    credits:{
      enabled:true
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Users',
        colorByPoint: true,
        data: [{
          name: 'Client',
          y: xcon,
          sliced: true,
          selected: true
      }, {
          name: 'Consultant',
          y: 10
      }]
    }]
}
HC_exporting(Highcharts);

setTimeout(()=>{
  window.dispatchEvent(
    new Event('resize')
  );
}, 300);


   //pie chart
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
      
      console.log(this.ConLen);
      return this.ConLen;

    })
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

      for(let d in data){
        this.ClienLen=this.ClienLen+1;
      }
    })
  }


  getAllCategories(){
    this.categorySer.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key:c.payload.key,
          ...c.payload.val()
        }))
      )
    ).subscribe((data)=>{
      this.category=data
      this.categorySer.length=this.category.length

      for(let d in data){
        this.CatLen=this.CatLen+1;
      }
    })
  }


  onChangeEvent(event){
    console.log(event);
    console.log(event.value);
  }

}
