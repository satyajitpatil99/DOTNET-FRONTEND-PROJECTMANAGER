import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectComponent } from './project/project.component';
import { ProjectmodulesComponent } from './projectmodules/projectmodules.component';
import { ProjecttaskComponent } from './projecttask/projecttask.component';
import { MytaskComponent } from './mytask/mytask.component';
import { WorkreportComponent } from './workreport/workreport.component';

const routes: Routes = [
  {path:"",component:LandingComponent,children:[
    {path:"dashboard",component:DashboardComponent},
    {path:"employees",component:EmployeesComponent},
    {path:"Project",component:ProjectComponent},
    {path:"Project/projectmodules/:projectid/:managerid",component:ProjectmodulesComponent},
    {path:"Project/projectmodules/:projectid/:managerid/projecttask/:moduleid",component:ProjecttaskComponent},
    {path:"mytask",component:MytaskComponent},
    {path:"workreport",component:WorkreportComponent}
  ]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
