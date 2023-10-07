import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { google } from "google-maps";
import { MatMiniFabButton } from '@angular/material/button';
import { HomeService } from './home.service';
import australia from './australia.json'

declare const google : google;

import { trigger, transition, style, animate } from '@angular/animations';

export const slideOutAnimation = trigger('slideOutAnimation', [
  transition('* => void', [
    style({ transform: 'translateX(0%)' }),
    animate('300ms', style({ transform: 'translateX(100%)' }))
  ])
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideOutAnimation]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('mouse') public mouse?: MatMiniFabButton;
  @ViewChild('mapContainer') public mapContainer?: ElementRef;
  @ViewChild('tasksContainer') public tasksContainer?: ElementRef;
  @ViewChild('employeesContainer') public employeesContainer?: ElementRef;
  public isAdding = signal(false);

  private mouseX: number = 0;
  private mouseY: number = 0;

  public constructor(
    public readonly taskService: TaskServiceApi,
    public readonly employeeService: EmployeeServiceApi,
    public readonly homeService: HomeService
  ) { }

  public ngOnInit(): void {
    this.homeService.map.set(new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 14,
        center: { lat: -20.81368726737007, lng: -49.37250245722454 },
      }
    ));

    this.homeService.map()?.addListener('click', (event: any) => {
      if (!this.isAdding()) { return; }

      this.homeService.map()?.setClickableIcons(true);
      this.homeService.map()?.setOptions({ gestureHandling: 'cooperative' })
      this.isAdding.set(false);

      if (!this.homeService.isAddTaskActive() && !this.homeService.isAddTaskActive()) {
        this.homeService.openTaskDialog$.next(undefined);
        this.homeService.openEmployeeDialog$.next(undefined);
      }

      this.homeService.selectedCoords$.next(event.latLng.toJSON());
    });

    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });

    this.homeService.openEmployeeDialog$.subscribe(() => {
      this.homeService.isAddEmployeeActive.set(true);
      this.employeesContainer?.nativeElement.scrollTo(0, 0);
    });

    this.homeService.openTaskDialog$.subscribe(() => {
      this.homeService.isAddTaskActive.set(true);
      this.tasksContainer?.nativeElement.scrollTo(0, 0);
    });

    const animateMouse = () => {
      if (!this.mouse) {
        requestAnimationFrame(animateMouse);
        return;
      }

      this.mouse._elementRef.nativeElement.style.left = `${this.mouseX}px`;
      this.mouse._elementRef.nativeElement.style.top = `${this.mouseY}px`;

      requestAnimationFrame(animateMouse);
    }

    animateMouse();
  }

  public ngAfterViewInit() {
    this.homeService.map()?.data.setStyle((feature: any) => {
      let color = '#' + Math.floor(Math.random()*16777215).toString(16);

      return /** @type {!google.maps.Data.StyleOptions} */ {
        fillColor: color,
        strokeColor: color,
        strokeWeight: 3,
      };
    });

    this.homeService.map()?.data.addGeoJson(australia);
  }

  public add(): void {
    this.homeService.map()?.setClickableIcons(false);
    this.homeService.map()?.setOptions({ gestureHandling: 'none' })
    this.isAdding.set(true);
  }

  public async routing(): Promise<void> {
    await this.homeService.route();
  }
}
