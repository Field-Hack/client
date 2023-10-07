import { Injectable } from '@angular/core';
import { Employee } from '../../interfaces/employees.types';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceApi {

  private employees: Employee[] = [
    {
        "id": "d0b93d2a-2bf1-4b27-91d9-9cbbcc88e3af",
        "name": "Funcionário 1",
        "avatar_url": "https://example.com/avatar1.jpg",
        "lat": -23.550520,
        "long": -46.633308
    },
    {
        "id": "0a172165-4f1e-4d36-9bc4-9d2a32c9a601",
        "name": "Funcionário 2",
        "avatar_url": "https://example.com/avatar2.jpg",
        "lat": -23.550394,
        "long": -46.633361
    },
    {
        "id": "523f192a-1490-4a72-8d63-1f8b1a029a8a",
        "name": "Funcionário 3",
        "avatar_url": "https://example.com/avatar3.jpg",
        "lat": -23.550230,
        "long": -46.633550
    // },
    // {
    //     "id": "c2d6bebf-7e01-4ed2-81e1-bbe80a20f196",
    //     "name": "Funcionário 4",
    //     "avatar_url": "https://example.com/avatar4.jpg",
    //     "lat": -23.549998,
    //     "long": -46.634014
    // },
    // {
    //     "id": "e15c7ac9-3f4a-4c5d-8b70-18efb7f6f764",
    //     "name": "Funcionário 5",
    //     "avatar_url": "https://example.com/avatar5.jpg",
    //     "lat": -23.549772,
    //     "long": -46.634500
    // },
    // {
    //     "id": "4f77186f-df7c-421f-9efc-8e71f875b4f3",
    //     "name": "Funcionário 6",
    //     "avatar_url": "https://example.com/avatar6.jpg",
    //     "lat": -23.549552,
    //     "long": -46.634998
    // },
    // {
    //     "id": "97187688-663b-4a8c-91bb-4ca51f2b45b8",
    //     "name": "Funcionário 7",
    //     "avatar_url": "https://example.com/avatar7.jpg",
    //     "lat": -23.549322,
    //     "long": -46.635503
    // },
    // {
    //     "id": "b12d2f5f-335f-4525-8ab7-0d1c60f6d85a",
    //     "name": "Funcionário 8",
    //     "avatar_url": "https://example.com/avatar8.jpg",
    //     "lat": -23.549095,
    //     "long": -46.636014
    // },
    // {
    //     "id": "bfcacdb7-7e6d-49cc-9541-953cfeab75d1",
    //     "name": "Funcionário 9",
    //     "avatar_url": "https://example.com/avatar9.jpg",
    //     "lat": -23.548862,
    //     "long": -46.636537
    // },
    // {
    //     "id": "aeed8ec5-2a84-4b21-8e7a-8d58a12f1da3",
    //     "name": "Funcionário 10",
    //     "avatar_url": "https://example.com/avatar10.jpg",
    //     "lat": -23.548639,
    //     "long": -46.637050
    }
  ];

  public constructor() {}

  public search(): Employee[] {
    return this.employees;
  }

  public create(params: Employee): void {
    this.employees.push(params);
  }

  public delete(id?: string): void {
    this.employees = this.employees.filter((item) => item.id !== id);
  }
}
