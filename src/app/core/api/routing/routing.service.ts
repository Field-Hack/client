import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/tasks.types';
import { Employee } from '../../interfaces/employees.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoutingServiceApi {
  public constructor(
    private readonly http: HttpClient,
  ) {}

  public async route({ tasks, employees}: { tasks: Task[], employees: Employee[]}): Promise<any[]> {
    const jobs = tasks.map((task, index) => ({
      id: index,
      location: [ Number(task.long), Number(task.lat) ],
    }))

    const vehicles = employees.map((employee, index) => ({
      id: index,
      profile: 'driving-car',
      start: [ Number(employee.long), Number(employee.lat) ],
      end: [ Number(employee.long), Number(employee.lat) ],
    }))


    const optmiizedRoute = await firstValueFrom(this.http.post('http://150.136.218.106:3000/optimization', {
      jobs,
      vehicles,
    })) as any

    const routes = optmiizedRoute.routes.map((route: any) => route.steps.map((step: any) => step.location))
    console.log('optmiizedRoute', optmiizedRoute)

    return await Promise.all(routes.map(async (route: any, index: number) => {
      return firstValueFrom(this.http.post('http://150.136.218.106:8080/ors/v2/directions/driving-car/geojson', {
        coordinates: route,
        language: 'pt',
      })) as any
    }))
  }
}
