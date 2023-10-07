import { ChangeDetectionStrategy, Component, Input, OnInit, computed, signal } from '@angular/core';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Task } from 'src/app/core/interfaces/tasks.types';
import { HomeService } from '../../home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { Employee } from 'src/app/core/interfaces/employees.types';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveEmployeeComponent implements OnInit {
  @Input() public open: boolean = false;
  public form: FormGroup;
  public employeeId = signal<number | undefined>(undefined);

  public constructor(
    public readonly homeService: HomeService,
    private readonly employeeService: EmployeeServiceApi,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      start_latitude: [-20.81368726737007, Validators.required],
      start_longitude: [-49.37250245722454, Validators.required],
      end_latitude: [-20.81368726737007, Validators.required],
      end_longitude: [-49.37250245722454, Validators.required],
      time_window_start: [null],
      time_window_end: [null]
    });
  }

  public ngOnInit(): void {
    this.homeService.selectedCoords$.subscribe((coords) => {
      this.form.get('start_latitude')?.setValue(coords.lat);
      this.form.get('start_longitude')?.setValue(coords.lng);
    });

    this.homeService.openEmployeeDialog$.subscribe((employee) => {
      this.employeeId.set(employee?.id);

      this.populateForm(employee);
    });
  }

  public close(): void {
    this.homeService.isAddEmployeeActive.set(false);
  }

  public save(): void {
    if (this.employeeId() || this.employeeId() === 0) {
      this.employeeService.edit({
        id: this.employeeId() as number,
        start: [this.form.value.start_latitude, this.form.value.start_longitude],
        end: [this.form.value.end_latitude, this.form.value.end_longitude],
        name: this.form.value.name,
        profile: 'driving-car',
        time_window: [this.form.value.time_window_start * 360, this.form.value.time_window_end * 360],
        avatar_url: 'https://i.pravatar.cc/150?u=' + this.employeeId()
      })

      this.homeService.isAddEmployeeActive.set(false);

      return;
    }

    this.employeeService.create({
      id: this.employeeService.employees().length,
      start: [this.form.value.start_latitude, this.form.value.start_longitude],
      end: [this.form.value.end_latitude, this.form.value.end_longitude],
      name: this.form.value.name,
      profile: 'driving-car',
      time_window: [this.form.value.time_window_start * 360, this.form.value.time_window_end * 360],
      avatar_url: 'https://i.pravatar.cc/150?u=' + this.employeeService.employees().length
    })

    this.homeService.isAddEmployeeActive.set(false);
  }

  private populateForm(employee?: Employee): void {
    if (!employee) {
      this.form.reset();
      this.form.get('end_latitude')?.setValue(-20.81368726737007);
      this.form.get('end_longitude')?.setValue(-49.37250245722454);
      return;
    }

    this.form.get('name')?.setValue(employee.name);
    this.form.get('start_latitude')?.setValue(employee.start[0]);
    this.form.get('start_longitude')?.setValue(employee.start[1]);
    this.form.get('end_latitude')?.setValue(employee.end[0]);
    this.form.get('end_longitude')?.setValue(employee.end[1]);
    this.form.get('time_window_start')?.setValue(employee.time_window[0] / 360);
    this.form.get('time_window_end')?.setValue(employee.time_window[1] / 360);
  }
}
