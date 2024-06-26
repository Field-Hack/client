import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { Employee } from 'src/app/core/interfaces/employees.types';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeEmployeeComponent {
  @Input() public employee?: Employee;

  public constructor(
    private readonly employeeService: EmployeeServiceApi,
    private readonly homeService: HomeService
  ) { }

  public edit(): void {
    this.homeService.openEmployeeDialog$.next(this.employee);
  }

  public delete(): void {
    this.employeeService.delete(this.employee?.id);
  }
}
