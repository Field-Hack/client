import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { HomeService } from '../../home.service';

interface Summary {
  employees: {
    name: string;
    avatar_url: string | undefined;
    summary: {
      route_duration: string;
      service_duration: string;
      distance: string;
      cost: string;
    },
    tasks: {
      description: string;
      priority: number;
    }[]
  }[]
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  public summary?: Summary;

  public constructor(
    private readonly taskService: TaskServiceApi,
    private readonly employeeService: EmployeeServiceApi,
    private readonly homeService: HomeService
  ) { }

  public ngOnInit(): void {
    const employeesFromList = this.employeeService.employees();
    const tasksFromList = this.taskService.tasks();
    const ORSResponse = this.homeService.ORSResponse();
    const geoJSONDatas = this.homeService.geoJSONDatas();
    if (!ORSResponse) { return; }

    const employees: Summary['employees'] = []
    for (const employee of employeesFromList) {
      const route = ORSResponse.routes.find((route) => route.vehicle === employee.id);
      if (!route) { continue; }

      const direction = geoJSONDatas.find(direction => direction.metadata.id === employee.id)
      if (!direction) { continue; }

      const employeeTasks = route.steps.filter((step) => {
        return tasksFromList.find(task => task.id === step.job)
      }).map((step) => {
        const task = tasksFromList.find(task => task.id === step.job);

        return {
          description: task?.description || 'Sem descrição',
          priority: task?.priority || 0
        }
      });

      employees.push({
        name: employee.name,
        avatar_url: employee.avatar_url,
        summary: {
          route_duration: (direction.metadata.sumary.duration / 60).toFixed(2),
          service_duration: (route.service / 60).toFixed(2),
          distance: (direction.metadata.sumary.distance / 1000).toFixed(1),
          cost: (route.cost / 100).toFixed(2),
        },
        tasks: employeeTasks
      })
    }

    this.summary = { employees }
  }
}
