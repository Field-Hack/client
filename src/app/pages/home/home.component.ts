import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { google } from 'google-maps';
import { MatMiniFabButton } from '@angular/material/button';
import { HomeService } from './home.service';
import australia from './australia.json';

declare const google: google;

import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { SummaryComponent } from './components/summary/summary.component';

export const slideOutAnimation = trigger('slideOutAnimation', [
  transition('* => void', [
    style({ transform: 'translateX(0%)' }),
    animate('300ms', style({ transform: 'translateX(100%)' })),
  ]),
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideOutAnimation],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('mouse') public mouse?: MatMiniFabButton;
  @ViewChild('mapContainer') public mapContainer?: ElementRef;
  @ViewChild('tasksContainer') public tasksContainer?: ElementRef;
  @ViewChild('employeesContainer') public employeesContainer?: ElementRef;

  public compiledOnce = signal(false);

  private mouseX: number = 0;
  private mouseY: number = 0;

  public constructor(
    public readonly taskService: TaskServiceApi,
    public readonly employeeService: EmployeeServiceApi,
    public readonly homeService: HomeService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.homeService.clearMap();

    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });

    const animateMouse = () => {
      if (!this.mouse) {
        requestAnimationFrame(animateMouse);
        return;
      }

      this.mouse._elementRef.nativeElement.style.left = `${this.mouseX}px`;
      this.mouse._elementRef.nativeElement.style.top = `${this.mouseY}px`;

      requestAnimationFrame(animateMouse);
    };

    animateMouse();
  }

  public ngAfterViewInit() {
    this.homeService.map()?.data.setStyle((feature: any) => {
      return /** @type {!google.maps.Data.StyleOptions} */ {
        strokeWeight: 3,
      };
    });

    this.homeService.putPins();
    const polyline = new google.maps.Polyline({
      strokeColor: '#0055ff',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: this.homeService.map(),
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
            strokeColor: '#0055ff',
            strokeWeight: 2,
          },
          offset: '100%',
          repeat: '100px',
        },
      ],
    });

    // polyline.setPath(
    //   geoJSONData.features[0].geometry.coordinates.map(
    //     (coord: number[]) => new google.maps.LatLng(coord[1], coord[0])
    //   )
    // );
  }

  public add(): void {
    this.homeService.map()?.setClickableIcons(false);
    this.homeService.map()?.setOptions({ gestureHandling: 'none' });
    this.homeService.isAdding.set(true);
    this.compiledOnce.set(true);
  }

  public async routing(): Promise<void> {
    this.homeService.isLoading.set(true);

    await this.homeService.route();

    this.homeService.isLoading.set(false);
    this.compiledOnce.set(true);
  }

  public async summary(): Promise<void> {
    this.matDialog.open(SummaryComponent, {
      width: '800px',
      panelClass: 'employee',
    });
  }

  public async changeUseCase(useCase: string): Promise<void> {
    this.homeService.clearMap();
    this.employeeService.changeUseCase(useCase);
    this.homeService.putPins();
  }
}
