import { Injectable, signal } from '@angular/core';
import { Employee } from '../../interfaces/employees.types';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceApi {
  public employees = signal<Employee[]>([
    {
      id: 1,
      start: [ -49.37733358, -20.85055825 ],
      end: [ -49.37733358, -20.85055825 ],
      profile: 'driving-car',
      name: 'Colaborador 1',
      time_window: [ 28800, 43200 ],
      max_tasks: 5,
      cost: { fixed: 16, per_hour: 8 }
    },
    {
      id: 2,
      start: [ -49.40626473, -20.82674698 ],
      end: [ -49.40626473, -20.82674698 ],
      profile: 'driving-car',
      name: 'Colaborador 2',
      time_window: [ 28800, 43200 ],
      max_tasks: 5,
      cost: { fixed: 15, per_hour: 19 }
    },
    {
      id: 4,
      start: [ -49.39668282, -20.77984868 ],
      end: [ -49.39668282, -20.77984868 ],
      profile: 'driving-car',
      name: 'Colaborador 3',
      time_window: [ 28800, 43200 ],
      max_tasks: 3,
      cost: { fixed: 294, per_hour: 10 }
    },
    {
      id: 5,
      start: [ -49.36486397, -20.82374111 ],
      end: [ -49.36486397, -20.82374111 ],
      profile: 'driving-car',
      name: 'Colaborador 4',
      time_window: [ 28800, 43200 ],
      max_tasks: 4,
      cost: { fixed: 29, per_hour: 3 }
    }
  ])

  public constructor() {}

  public search(): Employee[] {
    return this.employees();
  }

  public create(employee: Employee): void {
    const employees = this.employees();
    employees.push(employee);
    this.employees.set(employees);
  }

  public edit(employee: Employee): void {
    const employees = this.employees();
    this.employees.set(employees.map((item) => {
      return item.id === employee.id ? employee : item;
    }));
  }

  public delete(id?: number): void {
    const employees = this.employees();
    this.employees.set(employees.filter((item) => item.id !== id));
  }
}
