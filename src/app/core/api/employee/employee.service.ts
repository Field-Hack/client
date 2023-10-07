import { Injectable } from '@angular/core';
import { Employee } from '../../interfaces/employees.types';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceApi {

  private employees: Employee[] = [
    {
      id: 0,
      start: [ -49.23396325, -21.15064697 ],
      name: 'teste',
      end: [ -49.23396325, -21.15064697 ],
      profile: 'driving-car',
      time_window: [ 28800, 43200 ],
      max_tasks: 5,
      cost: { fixed: 265, per_hour: 13 }
    },
    {
      id: 1,
      start: [ -49.80970691, -20.9447359 ],
      name: 'teste',
      end: [ -49.80970691, -20.9447359 ],
      profile: 'driving-car',
      time_window: [ 50400, 64800 ],
      max_tasks: 3,
      cost: { fixed: 56, per_hour: 14 }
    },
    {
      id: 2,
      start: [ -49.72762956, -20.8755393 ],
      name: 'teste',
      end: [ -49.72762956, -20.8755393 ],
      profile: 'driving-car',
      time_window: [ 28800, 43200 ],
      max_tasks: 2,
      cost: { fixed: 134, per_hour: 9 }
    },
    // {
    //   id: 3,
    //   start: [ -49.36455419, -21.11081565 ],
    //   name: 'teste',
    //   end: [ -49.36455419, -21.11081565 ],
    //   profile: 'driving-car',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 1,
    //   cost: { fixed: 252, per_hour: 15 }
    // },
    // {
    //   id: 4,
    //   start: [ -49.1464725, -21.0375692 ],
    //   name: 'teste',
    //   end: [ -49.1464725, -21.0375692 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 1,
    //   cost: { fixed: 10, per_hour: 17 }
    // },
    // {
    //   id: 5,
    //   start: [ -49.18402266, -21.01533808 ],
    //   name: 'teste',
    //   end: [ -49.18402266, -21.01533808 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 2,
    //   cost: { fixed: 31, per_hour: 3 }
    // },
    // {
    //   id: 6,
    //   start: [ -49.03634, -20.69766954 ],
    //   name: 'teste',
    //   end: [ -49.03634, -20.69766954 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 1,
    //   cost: { fixed: 69, per_hour: 11 }
    // },
    // {
    //   id: 7,
    //   start: [ -49.56870382, -20.59902642 ],
    //   name: 'teste',
    //   end: [ -49.56870382, -20.59902642 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 3,
    //   cost: { fixed: 175, per_hour: 6 }
    // },
    // {
    //   id: 8,
    //   start: [ -49.06105472, -21.14877307 ],
    //   name: 'teste',
    //   end: [ -49.06105472, -21.14877307 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 4,
    //   cost: { fixed: 231, per_hour: 9 }
    // },
    // {
    //   id: 9,
    //   start: [ -49.4084759, -21.24972097 ],
    //   name: 'teste',
    //   end: [ -49.4084759, -21.24972097 ],
    //   profile: 'driving-car',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 2,
    //   cost: { fixed: 156, per_hour: 8 }
    // },
    // {
    //   id: 10,
    //   start: [ -49.32499388, -20.62599093 ],
    //   name: 'teste',
    //   end: [ -49.32499388, -20.62599093 ],
    //   profile: 'driving-car',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 2,
    //   cost: { fixed: 222, per_hour: 10 }
    // },
    // {
    //   id: 11,
    //   start: [ -49.52471462, -20.4474612 ],
    //   name: 'teste',
    //   end: [ -49.52471462, -20.4474612 ],
    //   profile: 'driving-car',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 2,
    //   cost: { fixed: 122, per_hour: 6 }
    // },
    // {
    //   id: 12,
    //   start: [ -49.22156571, -20.7500471 ],
    //   name: 'teste',
    //   end: [ -49.22156571, -20.7500471 ],
    //   profile: 'driving-car',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 1,
    //   cost: { fixed: 101, per_hour: 3 }
    // },
    // {
    //   id: 13,
    //   start: [ -49.46509824, -20.73309792 ],
    //   name: 'teste',
    //   end: [ -49.46509824, -20.73309792 ],
    //   profile: 'driving-car',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 5,
    //   cost: { fixed: 240, per_hour: 18 }
    // },
    // {
    //   id: 14,
    //   start: [ -49.2048271, -20.75410181 ],
    //   name: 'teste',
    //   end: [ -49.2048271, -20.75410181 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 3,
    //   cost: { fixed: 239, per_hour: 10 }
    // },
    // {
    //   id: 15,
    //   start: [ -49.5063857, -21.08107244 ],
    //   name: 'teste',
    //   end: [ -49.5063857, -21.08107244 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 1,
    //   cost: { fixed: 238, per_hour: 2 }
    // },
    // {
    //   id: 16,
    //   start: [ -49.2658023, -21.03352405 ],
    //   name: 'teste',
    //   end: [ -49.2658023, -21.03352405 ],
    //   profile: 'driving-car',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 5,
    //   cost: { fixed: 260, per_hour: 11 }
    // },
    // {
    //   id: 17,
    //   start: [ -49.31533408, -21.11191631 ],
    //   name: 'teste',
    //   end: [ -49.31533408, -21.11191631 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 4,
    //   cost: { fixed: 23, per_hour: 3 }
    // },
    // {
    //   id: 18,
    //   start: [ -49.06903578, -20.84610082 ],
    //   name: 'teste',
    //   end: [ -49.06903578, -20.84610082 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 5,
    //   cost: { fixed: 40, per_hour: 16 }
    // },
    // {
    //   id: 19,
    //   start: [ -49.07768921, -20.85795189 ],
    //   name: 'teste',
    //   end: [ -49.07768921, -20.85795189 ],
    //   profile: 'driving-car',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 2,
    //   cost: { fixed: 233, per_hour: 6 }
    // }
  ]

  public constructor() {}

  public search(): Employee[] {
    return this.employees;
  }

  public create(params: Employee): void {
    this.employees.push(params);
  }

  public delete(id?: number): void {
    this.employees = this.employees.filter((item) => item.id !== id);
  }
}
