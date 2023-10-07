import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MapComponent } from './components/map/map.component';
import { HomeEmployeeComponent } from './components/employee/employee.component';
import { HomeTaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    MapComponent,
    HomeTaskComponent,
    HomeEmployeeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HomeRoutingModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class HomeModule { }
