import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from 'src/app/core/interfaces/employees.types';
import { Task } from 'src/app/core/interfaces/tasks.types';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public isAddTaskActive = signal(false);
  public isAddEmployeeActive = signal(false);

  public selectedCoords$ = new Subject<{ lat: number, lng: number }>();
  public openTaskDialog$ = new Subject<Task | undefined>();
  public openEmployeeDialog$ = new Subject<Employee | undefined>();

  public constructor() { }
}
