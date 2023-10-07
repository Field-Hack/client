import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Task } from 'src/app/core/interfaces/tasks.types';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTaskComponent {
  @Input() public task?: Task;

  public constructor(
    private readonly taskService: TaskServiceApi,
    private readonly homeService: HomeService
  ) { }

  public edit(): void {
    this.homeService.openTaskDialog$.next(this.task);
  }

  public delete(): void {
    this.taskService.delete(this.task?.id);
  }
}
