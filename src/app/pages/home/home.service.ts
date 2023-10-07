import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import { GeoJSONFeature } from 'src/app/core/api/routing/routins.type';
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

  public selectedCoords$ = new Subject<{ lat: number, lng: number }>();
  public openTaskDialog$ = new Subject<Task | undefined>();
  public openEmployeeDialog$ = new Subject<Employee | undefined>();

  public constructor(
    private readonly routingServiceApi: RoutingServiceApi,
    private readonly taskService: TaskServiceApi,
    private readonly employeeService: EmployeeServiceApi
  ) { }

  public async route(): Promise<void> {
    const route = await this.routingServiceApi.route({
      tasks: this.taskService.tasks(),
      employees: this.employeeService.employees()!,
    });

    const geoJSONDatas = await Promise.all(route.routes.map(async (route) => {
      return await this.routingServiceApi.geoJson(route);
    }));

    for (const geoJSONData of geoJSONDatas) {
      this.map()?.data.addGeoJson(geoJSONData)

      const content = this.formatMessageRoute(geoJSONData.features);

      const infowindow = new google.maps.InfoWindow({
        content,
        maxWidth: 300,
        minWidth: 100
      });

      this.map()?.data.addListener('mouseover',(event: any) => {
        infowindow.setPosition(event.latLng);
        infowindow.open(this.map());
      })

      this.map()?.data.addListener('mouseout', () => {
        infowindow.close();
      });

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
    }

    for (const employee of this.employeeService.employees()!) {
      const employeeLocationStart = new google.maps.LatLng(employee.start[1], employee.start[0]);
      const employeeLocationEnd = new google.maps.LatLng(employee.end[1], employee.end[0]);

      new google.maps.Marker({
        position: employeeLocationStart,
        map: this.map(),
        icon: '/assets/house_pin.svg',
        clickable: true,
        cursor: 'pointer',
      });

      new google.maps.Marker({
        position: employeeLocationEnd,
        map: this.map(),
        icon: '/assets/house_pin.svg',
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

  private formatMessageRoute(features: GeoJSONFeature[]): string {
    const messages = features.map((feature) => {
      const { properties } = feature;
      return `
        <div>
          <p>
            <strong>Distance:</strong> ${properties.summary.distance}
          </p>
          <p>
            <strong>Duration:</strong> ${properties.summary.duration}
          </p>
        </div>
      `
    });

    return messages.join('');
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
}
