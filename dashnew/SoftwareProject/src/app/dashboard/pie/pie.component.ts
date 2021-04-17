import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { map } from 'rxjs/operators';
import { DefaultComponent } from '../default/default.component';
import { FunctionService } from '../services/function.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  Highcharts=Highcharts
  chartOptions={};
  ConLen:any=0;
  consultants:any;

  constructor(private funcSer:FunctionService) { }

   ngOnInit(): void {
    this.getConsultants();
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
            y: 2.00,
            sliced: true,
            selected: true
        }, {
            name: 'Consultant',
            y: 3.00
        }]
      }]
  }
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
      
      console.log('pie chart '+this.ConLen);

    })
  }

}
