import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import {
  GeoJSONData,
  GeoJSONFeature,
  ORSResponse,
} from 'src/app/core/api/routing/routins.type';
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
  public isLoading = signal(false);

  public selectedCoords$ = new Subject<{ lat: number; lng: number }>();
  public openTaskDialog$ = new Subject<Task | undefined>();
  public openEmployeeDialog$ = new Subject<Employee | undefined>();

  private features: google.maps.Data.Feature[] = [];

  public constructor(
    private readonly routingServiceApi: RoutingServiceApi,
    private readonly taskService: TaskServiceApi,
    private readonly employeeService: EmployeeServiceApi
  ) {}

  public async route(): Promise<void> {
    if (!this.map()) {
      return;
    }

    const route = await this.routingServiceApi.route({
      tasks: this.taskService.tasks(),
      employees: this.employeeService.employees()!,
    });
    this.ORSResponse.set(route);

    const geoJSONDatas = await Promise.all(
      route.routes.map(async (route) => {
        return await this.routingServiceApi.geoJson(route);
      })
    );
    this.geoJSONDatas.set(geoJSONDatas);

    await this.putPins();

    this.clearMap();

    for (const geoJSONData of geoJSONDatas) {
      const features = this.map()?.data.addGeoJson(geoJSONData);
      if (!features) {
        continue;
      }
      const geojson = features[0];
      this.features.push(geojson);
    }
  }

  public async putPins(): Promise<void> {
    const bounds = new google.maps.LatLngBounds();

    for (const task of this.taskService.tasks()) {
      const taskLocation = new google.maps.LatLng(
        task.location[1],
        task.location[0]
      );

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
      const employeeLocationStart = new google.maps.LatLng(
        employee.start[1],
        employee.start[0]
      );

      const image = new Image();
      image.src = 'https://i.pravatar.cc/150?u=' + employee.id;
      image.style.width = '30px';
      image.style.height = '30px';
      image.style.borderRadius = '50%';
      image.style.border = 'none';
      image.style.boxShadow = '0 0 3px #000';

      const marker = (await google.maps.importLibrary('marker')) as any;

      new marker.AdvancedMarkerElement({
        position: employeeLocationStart,
        map: this.map(),
        content: image,
      });
    }
  }

  private formatMessageTask(task: Task): string {
    return `
      <div style="border-radius: 5px; padding: 10px; overflow: hidden;">
        <h4 style="color: #333; font-size: 18px; margin-bottom: 10px;">${
          task.description
        }</h4>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Id:</strong> ${task.id}
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Duração:</strong> ${(task.service / 60).toFixed(2)}min
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Tempo de preparo:</strong> ${(task.setup / 60).toFixed(2)}min
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Prioridade:</strong> ${task.priority}
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 0;">
          <strong>Lat/Long:</strong> ${[...task.location]
            .reverse()
            .map((cord) => cord.toFixed(6))
            .join(', ')}
        </p>
      </div>
    `;
  }

  private clearMap(): void {
    for (const feature of this.features) {
      this.map()?.data.remove(feature);
    }
  }

  public attachMessage(marker: google.maps.Marker, task: Task) {
    const message = this.formatMessageTask(task);
    const infowindow = new google.maps.InfoWindow({
      content: message,
      maxWidth: 300,
      minWidth: 100,
    });

    marker.addListener('mouseover', () => {
      infowindow.open(marker.get('map'), marker);
    });

    marker.addListener('mouseout', () => {
      setTimeout(() => infowindow.close(), 500);
    });
  }

  public async createTask(lat: number, long: number): Promise<void> {
    this.isLoading.set(true);
    const task = {
      id: this.taskService.tasks().length + 100,
      location: [long, lat] as [number, number],
      priority: 30,
      service: 500,
      setup: 5,
      description: 'Atividade ' + this.taskService.tasks().length,
    };

    this.taskService.create(task);

    await this.putPins();

    await this.route();

    this.isLoading.set(false);
  }
}
