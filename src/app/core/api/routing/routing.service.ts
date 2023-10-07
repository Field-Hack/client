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
    const optmiizedRoute = await firstValueFrom(this.http.post('http://150.136.218.106:3000/optimization', {
      jobs: tasks,
      vehicles: employees,
    })) as any

    const routes = optmiizedRoute.routes.map((route: any) => route.steps.map((step: any) => step.location))

    return await Promise.all(routes.map(async (route: any, index: number) => {
      return firstValueFrom(this.http.post('http://150.136.218.106:8080/ors/v2/directions/driving-car/geojson', {
        coordinates: route,
        radiuses: route.map(() => 8000),
        language: 'pt',
        elevation: true
      })) as any
    }))
  }
}
