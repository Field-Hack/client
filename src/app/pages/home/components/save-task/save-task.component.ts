import { ChangeDetectionStrategy, Component, Input, OnInit, computed, signal } from '@angular/core';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Task } from 'src/app/core/interfaces/tasks.types';
import { HomeService } from '../../home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveTaskComponent implements OnInit {
  @Input() public open: boolean = false;
  public form: FormGroup;
  public taskId = signal<number | undefined>(undefined);

  public constructor(
    public readonly homeService: HomeService,
    private readonly taskService: TaskServiceApi,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      description: [null, Validators.required],
      service: [null, Validators.required],
      // time_windows: [number, number][];
      setup: [null],
      priority: [null],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.homeService.selectedCoords$.subscribe((coords) => {
      this.form.get('latitude')?.setValue(coords.lat);
      this.form.get('longitude')?.setValue(coords.lng);
    });

    this.homeService.openTaskDialog$.subscribe((task) => {
      this.taskId.set(task?.id);

      this.populateForm(task);
    });
  }

  public close(): void {
    this.homeService.isAddTaskActive.set(false);
  }

  public save(): void {
    if (this.taskId() || this.taskId() === 0) {
      this.taskService.edit({
        id: this.taskId() as number,
        location: [this.form.value.latitude, this.form.value.longitude],
        priority: this.form.value.priority,
        service: this.form.value.service,
        setup: this.form.value.setup,
        time_windows: null,
        description: this.form.value.description
      })

      this.homeService.isAddTaskActive.set(false);

      return;
    }

    this.taskService.create({
      id: this.taskService.tasks().length,
      location: [this.form.value.latitude, this.form.value.longitude],
      priority: this.form.value.priority,
      service: this.form.value.service,
      setup: this.form.value.setup,
      time_windows: null,
      description: this.form.value.description
    })

    this.homeService.isAddTaskActive.set(false);
  }

  private populateForm(task?: Task): void {
    if (!task) {
      this.form.reset();
      return;
    }

    this.form.get('description')?.setValue(task.description);
    this.form.get('service')?.setValue(task.service);
    this.form.get('setup')?.setValue(task.setup);
    this.form.get('priority')?.setValue(task.priority);
    this.form.get('latitude')?.setValue(task.location[0]);
    this.form.get('longitude')?.setValue(task.location[1]);
  }
}
