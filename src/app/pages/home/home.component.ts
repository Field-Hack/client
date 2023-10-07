import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Employee } from 'src/app/core/interfaces/employees.types';
import { Task } from 'src/app/core/interfaces/tasks.types';
import { google } from "google-maps";

declare const google : google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  public tasks = signal<Task[] | undefined>(undefined);
  public employees = signal<Employee[] | undefined>(undefined);
  public map = signal<any>(undefined);

  public constructor(
    private readonly taskServiceApi: TaskServiceApi,
    private readonly employeeServiceApi: EmployeeServiceApi,
    private readonly routingServiceApi: RoutingServiceApi,
  ) { }

  public ngOnInit(): void {
    this.tasks.set(this.taskServiceApi.search());

    this.employees.set(this.employeeServiceApi.search());

    this.map.set(new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 13,
        center: { lat: -23.550394, lng: -46.633361 },
      }
    ));

    this.map()?.addListener('click', (event: any) => {
      console.log(event.latLng.toJSON());
    });
  }

  public async routing(): Promise<void> {
    const routes = await this.routingServiceApi.route({
      tasks: this.tasks()!,
      employees: this.employees()!,
    });

    for (const route of routes) {
      console.log(route);
      const res = this.map()?.data.addGeoJson(route)
      const markers = this.tasks()?.map((task: Task) => {
        return { lat: task.location[1], lng: task.location[0] }
      });

      const bounds = new google.maps.LatLngBounds();
      for (const marker of markers!) {
        bounds.extend(marker);

        new google.maps.Marker({
          position: marker,
          map: this.map()
        });

        this.map()?.fitBounds(bounds);

        this.map()?.setCenter(bounds.getCenter());
      }

      for (const feature of res) {
        feature.setProperty('strokeColor', '#' + Math.floor(Math.random()*16777215).toString(16));
      }
    }
  }
}
