import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Task } from 'src/app/core/interfaces/tasks.types';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTaskComponent {
  @Input() public task?: Task;

  public constructor() { }
}
