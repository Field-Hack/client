import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import { GeoJSONData, GeoJSONFeature, ORSResponse } from 'src/app/core/api/routing/routins.type';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Employee } from 'src/app/core/interfaces/employees.types';
import { Task } from 'src/app/core/interfaces/tasks.types';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public isAddTaskActive = signal(false);
  public isAddEmployeeActive = signal(false);
  public map = signal<google.maps.Map | undefined>(undefined);
  public ORSResponse = signal<ORSResponse | undefined>(undefined);
  public geoJSONDatas = signal<GeoJSONData[]>([]);

  public selectedCoords$ = new Subject<{ lat: number, lng: number }>();
  public openTaskDialog$ = new Subject<Task | undefined>();
  public openEmployeeDialog$ = new Subject<Employee | undefined>();

  private features: google.maps.Data.Feature[] = [];

  public constructor(
    private readonly routingServiceApi: RoutingServiceApi,
    private readonly taskService: TaskServiceApi,
    private readonly employeeService: EmployeeServiceApi
  ) { }

  public async route(): Promise<void> {
    if (!this.map()) { return; }

    const route = await this.routingServiceApi.route({
      tasks: this.taskService.tasks(),
      employees: this.employeeService.employees()!,
    });
    this.ORSResponse.set(route);

    const geoJSONDatas = await Promise.all(route.routes.map(async (route) => {
      return await this.routingServiceApi.geoJson(route);
    }));
    this.geoJSONDatas.set(geoJSONDatas);

    this.clearMap();

    for (const geoJSONData of geoJSONDatas) {
      const features = this.map()?.data.addGeoJson(geoJSONData)
      if (!features) { continue; }
      const geojson = features[0];
      this.features.push(geojson);
    }
  }

  public async putPins(): Promise<void> {
    const bounds = new google.maps.LatLngBounds();

    for (const task of this.taskService.tasks()) {
      const taskLocation = new google.maps.LatLng(task.location[1], task.location[0]);

      bounds.extend(taskLocation);

      const createdMarker = new google.maps.Marker({
        position: taskLocation,
        map: this.map(),
        icon: '/assets/apartment.svg',
        clickable: true,
        cursor: 'pointer',
      });

      this.attachMessage(createdMarker, task);

      this.map()?.fitBounds(bounds);

      this.map()?.setCenter(bounds.getCenter());
    }

    for (const employee of this.employeeService.employees()!) {
      const employeeLocationStart = new google.maps.LatLng(employee.start[1], employee.start[0]);
      const employeeLocationEnd = new google.maps.LatLng(employee.end[1], employee.end[0]);

      const image = new Image()
      image.src = 'https://i.pravatar.cc/150?u=' + employee.id;
      image.style.width = '30px';
      image.style.height = '30px';
      image.style.borderRadius = '50%';
      image.style.border = 'none';
      image.style.boxShadow = '0 0 3px #000';

      const marker = await google.maps.importLibrary('marker') as any

      new marker.AdvancedMarkerElement({
        position: employeeLocationStart,
        map: this.map(),
        content: image
      });
    }
  }

  private formatMessageTask(task: Task): string {
    return `
      <div>
        <h4>${task.description}</h4>
        <p>
          <strong>Id:</strong> ${task.id}
        </p>
        <p>
          <strong>Service:</strong> ${task.service}
        </p>
        <p>
          <strong>Priority:</strong> ${task.priority}
        </p>
        <p>
          <strong>Setup:</strong> ${task.setup}
        </p>
        <p>
          <strong>Time Windows:</strong> ${task.time_windows}
        </p>
        <p>
          <strong>Location:</strong> ${task.location}
        </p>
      </div>
    `
  }

  private clearMap(): void {
    for (const feature of this.features) {
      this.map()?.data.remove(feature);
    }
  }

  public attachMessage(
    marker: google.maps.Marker,
    task: Task
  ) {

    const message = this.formatMessageTask(task);
    const infowindow = new google.maps.InfoWindow({
      content: message,
      maxWidth: 300,
      minWidth: 100
    });

    marker.addListener("mouseover", () => {
      infowindow.open(marker.get("map"), marker);
    });

    marker.addListener("mouseout", () => {
      infowindow.close();
    });
  }

  public async  createTask(lat: number, long: number): Promise<void> {
    const task = {
      id: this.taskService.tasks().length + 100,
      location: [long, lat] as [number, number],
      priority: 30,
      service: 500,
      setup: 5,
      description: 'Task ' + this.taskService.tasks().length
    }

    this.taskService.create(task);

    await this.putPins();

    await this.route();
  }
}
