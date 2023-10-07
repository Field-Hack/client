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
      time_windows: [ [ 50400, 64800 ] ],
      setup: 13,
      priority: 1,
      location: [ -49.40853626, -20.83838476 ]
    },
    {
      id: 1,
      description: 'Costa Comércio',
      service: 206,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 20,
      priority: 0,
      location: [ -49.38571712, -20.77701183 ]
    },
    {
      id: 2,
      description: 'Silva-Martins',
      service: 233,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 4,
      priority: 1,
      location: [ -49.37311149, -20.79792665 ]
    },
    {
      id: 3,
      description: 'Franco, Moraes e Moraes',
      service: 14,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 28,
      priority: 0,
      location: [ -49.38964269, -20.82283881 ]
    },
    {
      id: 4,
      description: 'Carvalho-Melo',
      service: 298,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 8,
      priority: 0,
      location: [ -49.34557866, -20.79801625 ]
    },
    {
      id: 5,
      description: 'Souza, Costa e Macedo',
      service: 329,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 11,
      priority: 0,
      location: [ -49.41283179, -20.80839187 ]
    },
    {
      id: 6,
      description: 'Silva-Moreira',
      service: 262,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 6,
      priority: 0,
      location: [ -49.38158243, -20.79275098 ]
    },
    {
      id: 7,
      description: 'Batista e Associados',
      service: 419,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 23,
      priority: 0,
      location: [ -49.3374928, -20.81046899 ]
    },
    {
      id: 8,
      description: 'Oliveira-Macedo',
      service: 497,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 3,
      priority: 0,
      location: [ -49.34133268, -20.82464138 ]
    },
    {
      id: 9,
      description: 'Nogueira EIRELI',
      service: 194,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 5,
      priority: 0,
      location: [ -49.3551793, -20.82742634 ]
    },
    {
      id: 10,
      description: 'Nogueira-Saraiva',
      service: 2,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 27,
      priority: 0,
      location: [ -49.40168678, -20.82738847 ]
    },
    {
      id: 11,
      description: 'Barros Comércio',
      service: 147,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 9,
      priority: 0,
      location: [ -49.41227808, -20.81458087 ]
    },
    {
      id: 12,
      description: 'Moreira S.A.',
      service: 455,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 21,
      priority: 0,
      location: [ -49.36307363, -20.83784671 ]
    },
    {
      id: 13,
      description: 'Moreira-Batista',
      service: 261,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 27,
      priority: 0,
      location: [ -49.364213, -20.82779416 ]
    },
    {
      id: 14,
      description: 'Macedo S.A.',
      service: 443,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 22,
      priority: 0,
      location: [ -49.34763501, -20.81766732 ]
    },
    {
      id: 15,
      description: 'Silva-Oliveira',
      service: 111,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 20,
      priority: 0,
      location: [ -49.40726535, -20.84272365 ]
    },
    {
      id: 16,
      description: 'Macedo EIRELI',
      service: 373,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 14,
      priority: 0,
      location: [ -49.38903638, -20.81605308 ]
    },
    {
      id: 17,
      description: 'Albuquerque, Braga e Braga',
      service: 290,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 5,
      priority: 0,
      location: [ -49.34076868, -20.80625919 ]
    },
    {
      id: 18,
      description: 'Souza-Braga',
      service: 281,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 6,
      priority: 0,
      location: [ -49.36040311, -20.80271059 ]
    },
    {
      id: 19,
      description: 'Batista, Braga e Saraiva',
      service: 471,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 8,
      priority: 0,
      location: [ -49.40997734, -20.80598457 ]
    },
    {
      id: 20,
      description: 'Saraiva-Costa',
      service: 79,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 30,
      priority: 0,
      location: [ -49.36738985, -20.77514144 ]
    },
    {
      id: 21,
      description: 'Souza, Moreira e Melo',
      service: 483,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 12,
      priority: 0,
      location: [ -49.34685647, -20.78959014 ]
    },
    {
      id: 22,
      description: 'Moreira, Albuquerque e Carvalho',
      service: 293,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 7,
      priority: 1,
      location: [ -49.39450781, -20.85117604 ]
    },
    {
      id: 23,
      description: 'Moraes-Reis',
      service: 209,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 28,
      priority: 0,
      location: [ -49.41450969, -20.82230192 ]
    },
    {
      id: 24,
      description: 'Costa-Moraes',
      service: 43,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 11,
      priority: 0,
      location: [ -49.34425309, -20.83971516 ]
    },
    {
      id: 25,
      description: 'Silva S.A.',
      service: 130,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 16,
      priority: 0,
      location: [ -49.41135164, -20.8218409 ]
    },
    {
      id: 26,
      description: 'Moraes-Oliveira',
      service: 222,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 21,
      priority: 1,
      location: [ -49.33162063, -20.81520001 ]
    },
    {
      id: 27,
      description: 'Nogueira, Albuquerque e Saraiva',
      service: 485,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 1,
      priority: 0,
      location: [ -49.39224843, -20.76997104 ]
    },
    {
      id: 28,
      description: 'Santos-Saraiva',
      service: 6,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 6,
      priority: 0,
      location: [ -49.39889043, -20.77999233 ]
    },
    {
      id: 29,
      description: 'Carvalho-Oliveira',
      service: 441,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 29,
      priority: 0,
      location: [ -49.40315006, -20.83835861 ]
    },
    {
      id: 30,
      description: 'Batista Comércio',
      service: 235,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 21,
      priority: 1,
      location: [ -49.37515822, -20.8464526 ]
    },
    {
      id: 31,
      description: 'Braga, Santos e Saraiva',
      service: 180,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 21,
      priority: 1,
      location: [ -49.38970322, -20.80087393 ]
    },
    {
      id: 32,
      description: 'Moraes, Oliveira e Braga',
      service: 67,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 25,
      priority: 0,
      location: [ -49.39644654, -20.80442428 ]
    },
    {
      id: 33,
      description: 'Saraiva-Macedo',
      service: 466,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 25,
      priority: 1,
      location: [ -49.4087726, -20.78914018 ]
    },
    {
      id: 34,
      description: 'Melo-Xavier',
      service: 157,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 19,
      priority: 1,
      location: [ -49.37554061, -20.79686979 ]
    },
    {
      id: 35,
      description: 'Braga-Oliveira',
      service: 36,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 11,
      priority: 0,
      location: [ -49.37167119, -20.85050402 ]
    },
    {
      id: 36,
      description: 'Souza-Silva',
      service: 243,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 13,
      priority: 0,
      location: [ -49.36352451, -20.82919125 ]
    },
    {
      id: 37,
      description: 'Melo, Souza e Moreira',
      service: 460,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 17,
      priority: 0,
      location: [ -49.41049046, -20.82838258 ]
    },
    {
      id: 38,
      description: 'Oliveira-Silva',
      service: 234,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 25,
      priority: 0,
      location: [ -49.40945766, -20.83493619 ]
    },
    {
      id: 39,
      description: 'Souza S.A.',
      service: 326,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 3,
      priority: 0,
      location: [ -49.37864841, -20.79487804 ]
    }
  ])

  public constructor() {}

  public search(): Task[] {
    return this.tasks();
  }

  public create(task: Task): void {
    const tasks = this.tasks();
    tasks.push(task);
    this.tasks.set(tasks);
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
