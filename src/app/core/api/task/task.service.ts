import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/tasks.types';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceApi {

  private tasks: Task[] = [
    {
      id: 0,
      description: 'Carvalho Comércio',
      service: 396,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 23,
      priority: 0,
      location: [ -49.42056002, -21.21271589 ]
    },
    {
      id: 1,
      description: 'Moreira, Melo e Moraes',
      service: 133,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 20,
      priority: 1,
      location: [ -49.11541161, -20.63582833 ]
    },
    {
      id: 2,
      description: 'Reis e Associados',
      service: 166,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 16,
      priority: 0,
      location: [ -49.42015788, -20.97140153 ]
    },
    {
      id: 3,
      description: 'Xavier S.A.',
      service: 477,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 15,
      priority: 0,
      location: [ -49.2809832, -20.90070881 ]
    },
    {
      id: 4,
      description: 'Saraiva, Oliveira e Batista',
      service: 459,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 4,
      priority: 0,
      location: [ -49.44430955, -20.7056116 ]
    },
    {
      id: 5,
      description: 'Xavier-Carvalho',
      service: 321,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 29,
      priority: 1,
      location: [ -49.70320791, -20.5438103 ]
    },
    {
      id: 6,
      description: 'Barros, Nogueira e Braga',
      service: 263,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 1,
      priority: 0,
      location: [ -49.2434985, -20.53934371 ]
    },
    {
      id: 7,
      description: 'Santos S.A.',
      service: 480,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 4,
      priority: 0,
      location: [ -49.82447677, -20.74567784 ]
    },
    {
      id: 8,
      description: 'Martins, Pereira e Silva',
      service: 331,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 19,
      priority: 0,
      location: [ -49.58576354, -21.20278832 ]
    },
    {
      id: 9,
      description: 'Nogueira, Martins e Reis',
      service: 448,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 19,
      priority: 0,
      location: [ -49.00450077, -20.90208428 ]
    },
    {
      id: 10,
      description: 'Costa-Reis',
      service: 145,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 28,
      priority: 0,
      location: [ -49.29074878, -20.68199985 ]
    },
    {
      id: 11,
      description: 'Barros e Associados',
      service: 128,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 22,
      priority: 1,
      location: [ -49.27617686, -20.94742232 ]
    },
    {
      id: 12,
      description: 'Moraes, Saraiva e Batista',
      service: 41,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 10,
      priority: 0,
      location: [ -49.25410616, -20.80595898 ]
    },
    {
      id: 13,
      description: 'Santos-Moraes',
      service: 176,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 7,
      priority: 0,
      location: [ -49.36751187, -20.7119061 ]
    },
    {
      id: 14,
      description: 'Souza, Souza e Moreira',
      service: 270,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 23,
      priority: 0,
      location: [ -49.76252903, -20.78248663 ]
    },
    {
      id: 15,
      description: 'Moreira, Albuquerque e Silva',
      service: 469,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 25,
      priority: 0,
      location: [ -49.17187058, -21.16685552 ]
    },
    {
      id: 16,
      description: 'Silva-Nogueira',
      service: 71,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 26,
      priority: 0,
      location: [ -49.4798571, -20.54341253 ]
    },
    {
      id: 17,
      description: 'Melo, Moreira e Oliveira',
      service: 47,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 9,
      priority: 0,
      location: [ -49.05551346, -20.65769958 ]
    },
    {
      id: 18,
      description: 'Albuquerque-Souza',
      service: 468,
      time_windows: [ [ 50400, 64800 ] ],
      setup: 7,
      priority: 0,
      location: [ -49.62317775, -20.43650223 ]
    },
    {
      id: 19,
      description: 'Braga, Saraiva e Franco',
      service: 473,
      time_windows: [ [ 28800, 43200 ] ],
      setup: 18,
      priority: 0,
      location: [ -49.65129402, -21.08047888 ]
    },
    // {
    //   id: 20,
    //   description: 'Batista, Costa e Moraes',
    //   service: 276,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 13,
    //   priority: 1,
    //   location: [ -49.06485953, -20.87738712 ]
    // },
    // {
    //   id: 21,
    //   description: 'Oliveira e Associados',
    //   service: 189,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 5,
    //   priority: 0,
    //   location: [ -49.21234814, -20.9777607 ]
    // },
    // {
    //   id: 22,
    //   description: 'Barros EIRELI',
    //   service: 70,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 23,
    //   priority: 0,
    //   location: [ -49.57680685, -20.56569581 ]
    // },
    // {
    //   id: 23,
    //   description: 'Moreira, Franco e Melo',
    //   service: 29,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 8,
    //   priority: 0,
    //   location: [ -49.05460684, -21.11524441 ]
    // },
    // {
    //   id: 24,
    //   description: 'Albuquerque-Souza',
    //   service: 322,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 3,
    //   priority: 0,
    //   location: [ -49.72571306, -21.08629946 ]
    // },
    // {
    //   id: 25,
    //   description: 'Macedo-Moraes',
    //   service: 375,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 5,
    //   priority: 0,
    //   location: [ -49.59686906, -21.1615369 ]
    // },
    // {
    //   id: 26,
    //   description: 'Costa S.A.',
    //   service: 448,
    //   time_windows: [ [ 28800, 43200 ] ],
    //   setup: 12,
    //   priority: 0,
    //   location: [ -49.32182594, -20.39013741 ]
    // },
    // {
    //   id: 27,
    //   description: 'Carvalho, Costa e Costa',
    //   service: 243,
    //   time_windows: [ [ 28800, 43200 ] ],
    //   setup: 15,
    //   priority: 1,
    //   location: [ -49.22017201, -21.15039524 ]
    // },
    // {
    //   id: 28,
    //   description: 'Moraes-Martins',
    //   service: 3,
    //   time_windows: [ [ 28800, 43200 ] ],
    //   setup: 29,
    //   priority: 0,
    //   location: [ -49.13083894, -20.95550568 ]
    // },
    // {
    //   id: 29,
    //   description: 'Saraiva, Barros e Nogueira',
    //   service: 457,
    //   time_windows: [ [ 28800, 43200 ] ],
    //   setup: 12,
    //   priority: 0,
    //   location: [ -49.78462818, -20.77900982 ]
    // },
    // {
    //   id: 30,
    //   description: 'Carvalho-Martins',
    //   service: 225,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 3,
    //   priority: 0,
    //   location: [ -49.39644829, -20.82132739 ]
    // },
    // {
    //   id: 31,
    //   description: 'Costa EIRELI',
    //   service: 117,
    //   time_windows: [ [ 28800, 43200 ] ],
    //   setup: 30,
    //   priority: 0,
    //   location: [ -49.57983178, -21.00353501 ]
    // },
    // {
    //   id: 32,
    //   description: 'Melo-Carvalho',
    //   service: 378,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 25,
    //   priority: 0,
    //   location: [ -49.52564803, -21.18196035 ]
    // },
    // {
    //   id: 33,
    //   description: 'Costa LTDA',
    //   service: 193,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 17,
    //   priority: 1,
    //   location: [ -49.59802741, -20.72445826 ]
    // },
    // {
    //   id: 34,
    //   description: 'Albuquerque EIRELI',
    //   service: 76,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 18,
    //   priority: 0,
    //   location: [ -49.15758081, -21.16516036 ]
    // },
    // {
    //   id: 35,
    //   description: 'Franco, Carvalho e Costa',
    //   service: 148,
    //   time_windows: [ [ 28800, 43200 ] ],
    //   setup: 15,
    //   priority: 0,
    //   location: [ -49.62716577, -20.66173133 ]
    // },
    // {
    //   id: 36,
    //   description: 'Martins, Albuquerque e Moreira',
    //   service: 459,
    //   time_windows: [ [ 28800, 43200 ] ],
    //   setup: 16,
    //   priority: 0,
    //   location: [ -49.55667273, -20.41402288 ]
    // },
    // {
    //   id: 37,
    //   description: 'Moreira-Costa',
    //   service: 462,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 29,
    //   priority: 0,
    //   location: [ -49.17756133, -20.65218754 ]
    // },
    // {
    //   id: 38,
    //   description: 'Moreira LTDA',
    //   service: 315,
    //   time_windows: [ [ 28800, 43200 ] ],
    //   setup: 13,
    //   priority: 0,
    //   location: [ -49.24854845, -20.8542537 ]
    // },
    // {
    //   id: 39,
    //   description: 'Macedo-Franco',
    //   service: 267,
    //   time_windows: [ [ 50400, 64800 ] ],
    //   setup: 18,
    //   priority: 0,
    //   location: [ -49.74588124, -20.70589437 ]
    // }
  ]


  public constructor() {}

  public search(): Task[] {
    return this.tasks;
  }

  public create(params: Task): void {
    this.tasks.push(params);
  }

  public delete(id?: number): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }
}
