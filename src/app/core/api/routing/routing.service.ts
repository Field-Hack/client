import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/tasks.types';
import { Employee } from '../../interfaces/employees.types';
import { HttpClient } from '@angular/common/http';
import { GeoJSONData, ORSResponse, Route } from './routins.type';

@Injectable({
  providedIn: 'root',
})
export class RoutingServiceApi {
  public constructor(
    private readonly http: HttpClient,
  ) {}

  public async route({ tasks, employees}: { tasks: Task[], employees: Employee[]}): Promise<ORSResponse> {
    return firstValueFrom(this.http.post<ORSResponse>('http://150.136.218.106:2053/optimization', {
      jobs: tasks,
      vehicles: employees,
    }));
  }

  public async geoJson(route: Route): Promise<GeoJSONData> {
    return firstValueFrom(this.http.post<GeoJSONData>('http://150.136.218.106:2053/directions', {
      coordinates: route.steps.map(step => step.location),
      radiuses: route.steps.map(step => 5000),
      language: 'pt',
      "extra_info": [
        "steepness",
        "suitability",
        "surface",
        "waytype",
        "tollways",
        "waycategory",
        "shadow",
        "noise",
        "green",
        "countryinfo",
        "roadaccessrestrictions",
        "traildifficulty"
      ],
      "attributes": [
        "avgspeed",
        "detourfactor",
        "percentage"
      ],
    }))
  }
}
