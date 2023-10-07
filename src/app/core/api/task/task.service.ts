import { Injectable, signal } from '@angular/core';
import { Task } from '../../interfaces/tasks.types';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceApi {
  public tasks = signal<Task[]>([
    {
      id: 0,
      description: 'Albuquerque, Nogueira e Nogueira',
      service: 233,
      // time_windows: [ [ 50400, 64800 ] ],
      setup: 13,
      priority: 1,
      location: [ -49.377889520146475,-20.841384601771686 ]
    },
    {
      id: 5,
      description: 'Souza, Costa e Macedo',
      service: 329,
      // time_windows: [ [ 50400, 64800 ] ],
      setup: 11,
      priority: 0,
      location: [ -49.368619805791006,-20.858549567454784 ]
    },
    {
      id: 22,
      description: 'Moreira, Albuquerque e Carvalho',
      service: 293,
      // time_windows: [ [ 28800, 43200 ] ],
      setup: 7,
      priority: 1,
      location: [ -49.39450781, -20.85117604 ]
    },
    {
      id: 6,
      description: 'Silva-Moreira',
      service: 262,
      // time_windows: [ [ 28800, 43200 ] ],
      setup: 6,
      priority: 0,
      location: [ -49.371881371953116,-20.81606776441591 ]
    },
    {
      id: 13,
      description: 'Moreira-Batista',
      service: 261,
      // time_windows: [ [ 50400, 64800 ] ],
      setup: 27,
      priority: 0,
      location: [ -49.364213, -20.82779416 ]
    },
    {
      id: 20,
      description: 'Saraiva-Costa',
      service: 79,
      // time_windows: [ [ 28800, 43200 ] ],
      setup: 30,
      priority: 0,
      location: [ -49.36738985, -20.77514144 ]
    },
    {
      id: 21,
      description: 'Souza, Moreira e Melo',
      service: 483,
      // time_windows: [ [ 50400, 64800 ] ],
      setup: 12,
      priority: 0,
      location: [ -49.34685647, -20.78959014 ]
    },
    {
      id: 23,
      description: 'Moraes-Reis',
      service: 209,
      // time_windows: [ [ 50400, 64800 ] ],
      setup: 28,
      priority: 0,
      location: [ -49.41450969, -20.82230192 ]
    },
    {
      id: 27,
      description: 'Nogueira, Albuquerque e Saraiva',
      service: 485,
      // time_windows: [ [ 28800, 43200 ] ],
      setup: 1,
      priority: 0,
      location: [ -49.39224843, -20.76997104 ]
    },
    {
      id: 28,
      description: 'Santos-Saraiva',
      service: 6,
      // time_windows: [ [ 50400, 64800 ] ],
      setup: 6,
      priority: 0,
      location: [ -49.39363885458983, -20.79138702645884 ]
    },
    {
      id: 29,
      description: 'Carvalho-Oliveira',
      service: 441,
      // time_windows: [ [ 28800, 43200 ] ],
      setup: 29,
      priority: 0,
      location: [ -49.40315006, -20.83835861 ]
    },
    {
      id: 38,
      description: 'Oliveira-Silva',
      service: 234,
      // time_windows: [ [ 50400, 64800 ] ],
      setup: 25,
      priority: 0,
      location: [ -49.40945766, -20.83493619 ]
    },
    {
      id: 39,
      description: 'tasasadsasdas',
      service: 340,
      // time_windows: [ [ 50400, 64800 ] ],
      setup: 25,
      priority: 0,
      location: [ -49.41707529191406, -20.792282424094214 ]
    }
  ])

  public constructor() {}

  public search(): Task[] {
    return this.tasks();
  }

  public create(task: Task): void {
    this.tasks.mutate((tasks) => tasks.push(task));
  }

  public edit(task: Task): void {
    const tasks = this.tasks();
    this.tasks.set(tasks.map((item) => {
      return item.id === task.id ? task : item;
    }));
  }

  public delete(id?: number): void {
    const tasks = this.tasks();
    this.tasks.set(tasks.filter((item) => item.id !== id));
  }
}
