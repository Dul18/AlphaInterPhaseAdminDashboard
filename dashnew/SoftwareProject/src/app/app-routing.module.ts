import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { RegisterNewComponent } from './dashboard/register-new/register-new.component';

import { ConsultantFormComponent } from './consultant/consultant-form/consultant-form.component';
import { LoginComponent } from './consultant/login/login.component';
import { AllrecordsComponent } from './dashboard/allrecords/allrecords.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { ClientComponent } from './dashboard/client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultComponent } from './dashboard/default/default.component';
import { PieComponent } from './dashboard/pie/pie.component';
import { VisitorsComponent } from './dashboard/visitors/visitors.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { ProjectComponent } from './dashboard/project/project.component';
import { AddresslistComponent } from './dashboard/addresslist/addresslist.component';


const routes: Routes = [
  {path:'',component:AdminLoginComponent},
  {path:'register',component:LoginComponent},
  {path:'conform',component:ConsultantFormComponent},
  {path:'dashboard',component:DashboardComponent,
  children:[
    {path:'',component:DefaultComponent,
    children:[
      {path:'',component:PieComponent} 
    ]
  },
    {path:'all',component:AllrecordsComponent},
    {path:'clients',component:ClientComponent},
    {path:'addadmin',component:RegisterNewComponent},
    {path: 'visitors', component: VisitorsComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'project' , component: ProjectComponent},
    {path:'addresslist', component:AddresslistComponent}
    
  ]
},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
