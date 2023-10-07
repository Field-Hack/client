import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/tasks.types';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceApi {

  private tasks: Task[] = [
    {
      id: 'b43edc90-7e0d-4b88-9f77-679d82133f01',
      identifier: 87456321,
      title: 'Tarefa 1',
      service: 500,
      lat: -23.550520,
      long: -46.633208,
    },
    {
      id: '6f21e8c3-f0c9-4f0c-877a-42e23f1f37d4',
      identifier: 98761234,
      title: 'Tarefa 2',
      service: 500,
      lat: -23.550394,
      long: -46.633361,
    },
    {
      id: 'd90c7eab-2e5d-4b8a-83cc-1f8379a42e90',
      identifier: 23456789,
      title: 'Tarefa 3',
      service: 500,
      lat: -23.550230,
      long: -46.63350,
    },
    {
      id: '0a7f84b9-2dc9-4e32-aa90-7bfae3a9f7e5',
      identifier: 87654321,
      title: 'Tarefa 4',
      service: 500,
      lat: -23.549998,
      long: -46.634014,
    },
    {
      id: 'e6d3db4f-8785-4ab1-951d-c48c760df23e',
      identifier: 12345678,
      title: 'Tarefa 5',
      service: 500,
      lat: -23.549772,
      long: -46.634500,
    },
    {
      id: '5ec18a95-67e1-4b5c-8410-2d78c1f03ec9',
      identifier: 43210987,
      title: 'Tarefa 6',
      service: 500,
      lat: -23.549552,
      long: -46.634998,
    },
    {
      id: 'c8a0e95c-76cd-4d43-93e4-5ea4c65d25c7',
      identifier: 65432109,
      title: 'Tarefa 7',
      service: 500,
      lat: -23.549322,
      long: -46.635503,
    },
    {
      id: 'd36c6479-6064-4b61-b650-4b84b5b33b09',
      identifier: 89012345,
      title: 'Tarefa 8',
      service: 500,
      lat: -23.549095,
      long: -46.636014,
    },
    {
      id: '89d4a157-59eb-4f04-8cb7-1739509ac146',
      identifier: 10987654,
      title: 'Tarefa 9',
      service: 500,
      lat: -23.548862,
      long: -46.636537,
    },
    {
      id: 'de8abdb4-9c6d-495c-bc27-30f7e95c7e92',
      identifier: 76543210,
      title: 'Tarefa 10',
      service: 500,
      lat: -23.548639,
      long: -46.637050,
    },
  ];

  public constructor() {}

  public search(): Task[] {
    return this.tasks;
  }

  public create(params: Task): void {
    this.tasks.push(params);
  }

  public delete(id?: string): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }
}
