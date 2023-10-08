import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MapComponent } from './components/map/map.component';
import { HomeEmployeeComponent } from './components/employee/employee.component';
import { HomeTaskComponent } from './components/task/task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SaveTaskComponent } from './components/save-task/save-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveEmployeeComponent } from './components/save-employee/save-employee.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    MapComponent,
    HomeTaskComponent,
    HomeEmployeeComponent,
    HomeComponent,
    SaveTaskComponent,
    SaveEmployeeComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HomeRoutingModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule
  ]
})
export class HomeModule { }
