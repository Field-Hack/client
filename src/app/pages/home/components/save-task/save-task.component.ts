import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Task } from 'src/app/core/interfaces/tasks.types';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveTaskComponent {
  @Input() public open: boolean = false;
  @Input() public task?: Task;

  public constructor(
    private readonly taskService: TaskServiceApi
  ) { }
}
