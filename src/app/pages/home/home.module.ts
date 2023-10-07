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
import { RouterComponent } from './components/router/route.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    MapComponent,
    HomeTaskComponent,
    HomeEmployeeComponent,
    HomeComponent,
    RouterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HomeRoutingModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class HomeModule { }
