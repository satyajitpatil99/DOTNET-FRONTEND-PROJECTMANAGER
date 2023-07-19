import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';


import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LandingComponent } from './landing.component';

import { EmployeesComponent } from './employees/employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { ProjectmodulesComponent } from './projectmodules/projectmodules.component';
import { ProjecttaskComponent } from './projecttask/projecttask.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MytaskComponent } from './mytask/mytask.component';
import { WorkreportComponent } from './workreport/workreport.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LandingComponent,
    EmployeesComponent,
    ProjectComponent,
    ProjectmodulesComponent,
    ProjecttaskComponent,
    MytaskComponent,
    WorkreportComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MomentDateModule
  ]
})
export class AdminModule { }
