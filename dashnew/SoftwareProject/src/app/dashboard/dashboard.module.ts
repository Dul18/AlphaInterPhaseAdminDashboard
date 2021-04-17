import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ChartComponent } from './chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PieComponent } from './pie/pie.component';
import { AdminService } from './services/admin.service';
import { AllrecordsComponent } from './allrecords/allrecords.component';
import { FunctionService } from './services/function.service';
import { ClientComponent } from './client/client.component';
import { ConsultantMoreComponent } from './consultant-more/consultant-more.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { CategoryComponent } from './category/category.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectComponent } from './project/project.component';
import { AddresslistComponent } from './addresslist/addresslist.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ChartComponent,
    PieComponent,
    AllrecordsComponent,
    ClientComponent,
    ConsultantMoreComponent,
    VisitorsComponent,
    CategoryComponent,
    ProjectComponent,
    AddresslistComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    HighchartsChartModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule 
  ],
  providers:[
    AdminService,FunctionService
  ]
})
export class DashboardModule {
  
 }
