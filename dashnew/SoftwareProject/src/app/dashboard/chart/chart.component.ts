import { getLocaleDayNames } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { map } from 'rxjs/operators';
import { FunctionService } from '../services/function.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  Highcharts=Highcharts
  chartOptions={};
  value=[1,2,3,4,5];
  constructor(private funcSer:FunctionService) { }
  
  @Input() noCon;

  consultants:any;
  ConLen:any=0;

  ngOnInit(): void {
    this.getConsultants();
    this.chartOptions= {
      chart: {
          type: 'area'
      },
      title: {
          text: 'Summary of Users'
      },
      subtitle: {
          text: 'Users'
      },
     
      tooltip: {
          split: true,
          valueSuffix: ' ten'
      },
      yAxis:{
        labels:{
          formatter:function(){
            return this.value;
          },
          
        },
        title:{
          text:'no of users',
        }
      },
     /* xAxis:{
        title:{
          text:'Date',
        },
        type:'datetime',
        labels:{
          formatter:function(){
            return Highcharts.dateFormat('%H:%M %d %b %Y',this.value);
          }
        }
        
      },*/

      xAxis:{
        title:{
          text: 'Day'
        },

        categories:["Sun", "Mon","Tue","Wed","Thu","Fri", "Sat"]

      },
      credits:{
        enabled:false
      },
      exporting:{
        enabled:true
      },
      responsive:{
        rules:[{
          condition:{
            maxWidth:500
          },
          chartOptions:{
            legend:{
              enabled:false
            }
          }
        }]
      },
      series: [
        {
          name: 'Consultant',
          data: [0,2,4,7,8,9,11,13],
          
      },
        {
          name: 'Client',
          data: [0,3,4,5,6,8,10,12]
      },]
  };
  HC_exporting(Highcharts);

  setTimeout(()=>{
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
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
      
      console.log('chart component '+this.ConLen);

    })
  }

}
