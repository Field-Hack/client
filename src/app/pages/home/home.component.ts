import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Employee } from 'src/app/core/interfaces/employees.types';
import { Task } from 'src/app/core/interfaces/tasks.types';

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
    // @ts-expect-error: fds
    this.map.set(new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 13,
        center: { lat: -23.550394, lng: -46.633361 },
      }
    ));


    this.map()?.data.setStyle({
      strokeColor: 'blue',
      strokeWeight: 3,
    });

    // this.map()?.data.addGeoJson(json);

    // this.map()?.data.addGeoJson(json2);
  }

  public async routing(): Promise<void> {
    const routes = await this.routingServiceApi.route({
      tasks: this.tasks()!,
      employees: this.employees()!,
    });

    for (const route of routes) {
      this.map()?.data.addGeoJson(route);
    }
  }
}
