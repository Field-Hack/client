import { Injectable, signal } from '@angular/core';
import { Employee } from '../../interfaces/employees.types';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceApi {
  public employees = signal<Employee[]>([
    {
      id: 0,
      start: [ -49.40353258, -20.82373505 ],
      end: [ -49.40353258, -20.82373505 ],
      profile: 'driving-car',
      name: 'teste',
      time_window: [ 28800, 43200 ],
      max_tasks: 4,
      cost: { fixed: 44, per_hour: 15 }
    },
    {
      id: 1,
      start: [ -49.37733358, -20.85055825 ],
      end: [ -49.37733358, -20.85055825 ],
      profile: 'driving-car',
      name: 'teste',
      time_window: [ 50400, 64800 ],
      max_tasks: 5,
      cost: { fixed: 16, per_hour: 8 }
    },
    {
      id: 2,
      start: [ -49.40626473, -20.82674698 ],
      end: [ -49.40626473, -20.82674698 ],
      profile: 'driving-car',
      name: 'teste',
      time_window: [ 50400, 64800 ],
      max_tasks: 5,
      cost: { fixed: 15, per_hour: 19 }
    },
    {
      id: 3,
      start: [ -49.3617337, -20.85185755 ],
      end: [ -49.3617337, -20.85185755 ],
      profile: 'driving-car',
      name: 'teste',
      time_window: [ 28800, 43200 ],
      max_tasks: 5,
      cost: { fixed: 19, per_hour: 14 }
    },
    {
      id: 4,
      start: [ -49.39668282, -20.77984868 ],
      end: [ -49.39668282, -20.77984868 ],
      profile: 'driving-car',
      name: 'teste',
      time_window: [ 50400, 64800 ],
      max_tasks: 3,
      cost: { fixed: 294, per_hour: 10 }
    },
    {
      id: 5,
      start: [ -49.36486397, -20.82374111 ],
      end: [ -49.36486397, -20.82374111 ],
      profile: 'driving-car',
      name: 'teste',
      time_window: [ 28800, 43200 ],
      max_tasks: 4,
      cost: { fixed: 29, per_hour: 3 }
    },
    {
      id: 6,
      start: [ -49.42172103, -20.81322688 ],
      end: [ -49.42172103, -20.81322688 ],
      profile: 'driving-car',
      name: 'teste',
      time_window: [ 28800, 43200 ],
      max_tasks: 1,
      cost: { fixed: 208, per_hour: 5 }
    },
    {
      id: 7,
      start: [ -49.37823326, -20.8555306 ],
      end: [ -49.37823326, -20.8555306 ],
      profile: 'driving-car',
      name: 'teste',
      time_window: [ 50400, 64800 ],
      max_tasks: 3,
      cost: { fixed: 186, per_hour: 9 }
    },
    // {
    //   id: 8,
    //   start: [ -49.37291945, -20.79827337 ],
    //   end: [ -49.37291945, -20.79827337 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 5,
    //   cost: { fixed: 175, per_hour: 4 }
    // },
    // {
    //   id: 9,
    //   start: [ -49.41763056, -20.82179324 ],
    //   end: [ -49.41763056, -20.82179324 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 5,
    //   cost: { fixed: 235, per_hour: 8 }
    // },
    // {
    //   id: 10,
    //   start: [ -49.38461334, -20.82864026 ],
    //   end: [ -49.38461334, -20.82864026 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 5,
    //   cost: { fixed: 12, per_hour: 18 }
    // },
    // {
    //   id: 11,
    //   start: [ -49.40737835, -20.81886814 ],
    //   end: [ -49.40737835, -20.81886814 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 1,
    //   cost: { fixed: 5, per_hour: 19 }
    // },
    // {
    //   id: 12,
    //   start: [ -49.38126532, -20.78645924 ],
    //   end: [ -49.38126532, -20.78645924 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 4,
    //   cost: { fixed: 286, per_hour: 13 }
    // },
    // {
    //   id: 13,
    //   start: [ -49.35936861, -20.82732524 ],
    //   end: [ -49.35936861, -20.82732524 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 1,
    //   cost: { fixed: 64, per_hour: 6 }
    // },
    // {
    //   id: 14,
    //   start: [ -49.39789951, -20.7748813 ],
    //   end: [ -49.39789951, -20.7748813 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 4,
    //   cost: { fixed: 18, per_hour: 18 }
    // },
    // {
    //   id: 15,
    //   start: [ -49.36682058, -20.84539958 ],
    //   end: [ -49.36682058, -20.84539958 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 3,
    //   cost: { fixed: 49, per_hour: 5 }
    // },
    // {
    //   id: 16,
    //   start: [ -49.36321267, -20.81744571 ],
    //   end: [ -49.36321267, -20.81744571 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 3,
    //   cost: { fixed: 232, per_hour: 16 }
    // },
    // {
    //   id: 17,
    //   start: [ -49.40153094, -20.79194197 ],
    //   end: [ -49.40153094, -20.79194197 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 3,
    //   cost: { fixed: 42, per_hour: 6 }
    // },
    // {
    //   id: 18,
    //   start: [ -49.35861361, -20.82356169 ],
    //   end: [ -49.35861361, -20.82356169 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 50400, 64800 ],
    //   max_tasks: 1,
    //   cost: { fixed: 248, per_hour: 2 }
    // },
    // {
    //   id: 19,
    //   start: [ -49.39945628, -20.7814742 ],
    //   end: [ -49.39945628, -20.7814742 ],
    //   profile: 'driving-car',
    //   name: 'teste',
    //   time_window: [ 28800, 43200 ],
    //   max_tasks: 1,
    //   cost: { fixed: 260, per_hour: 0 }
    // }
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
