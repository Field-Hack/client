import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Task } from 'src/app/core/interfaces/tasks.types';
import { google } from "google-maps";
import { trigger, transition, style, animate } from '@angular/animations';
import { MatMiniFabButton } from '@angular/material/button';
import { HomeService } from './home.service';
import { Employee } from 'src/app/core/interfaces/employees.types';

declare const google : google;

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
  public map = signal<google.maps.Map | undefined>(undefined);
  public isInsideMap = signal(false);
  public isAdding = signal(false);

  private mouseX: number = 0;
  private mouseY: number = 0;

  public constructor(
    public readonly taskService: TaskServiceApi,
    public readonly employeeService: EmployeeServiceApi,
    public readonly homeService: HomeService,
    private readonly routingServiceApi: RoutingServiceApi,
  ) { }

  public ngOnInit(): void {
    this.map.set(new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 13,
        center: { lat: -23.550394, lng: -46.633361 },
      }
    ));

    this.map()?.addListener('click', (event: any) => {
      if (!this.isAdding()) { return; }

      this.map()?.setClickableIcons(true);
      this.map()?.setOptions({ gestureHandling: 'cooperative' })
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

  public ngAfterViewInit(){
    this.mapContainer?.nativeElement.addEventListener('mouseenter', () => {
      this.isInsideMap.set(true);
    });

    this.mapContainer?.nativeElement.addEventListener('mouseleave', () => {
      this.isInsideMap.set(false);
    });
  }

  public async routing(): Promise<void> {
    const routes = await this.routingServiceApi.route({
      tasks: this.taskService.tasks()!,
      employees: this.employeeService.employees()!,
    });

    for (const route of routes) {
      console.log(route);
      const res = this.map()?.data.addGeoJson(route)
      const markers = this.taskService.tasks()?.map((task: Task) => {
        return { lat: task.location[1], lng: task.location[0] }
      });

      const bounds = new google.maps.LatLngBounds();
      for (const marker of markers!) {
        bounds.extend(marker);

        new google.maps.Marker({
          position: marker,
          map: this.map()
        });

        this.map()?.fitBounds(bounds);

        this.map()?.setCenter(bounds.getCenter());
      }

      if (!res) { return; }

      for (const feature of res) {
        feature.setProperty('strokeColor', '#' + Math.floor(Math.random()*16777215).toString(16));
      }
    }
  }

  public add(): void {
    this.map()?.setClickableIcons(false);
    this.map()?.setOptions({ gestureHandling: 'none' })
    this.isAdding.set(true);
  }

  public trackByFn(index: number, item: Task | Employee): number {
    return item.id;
  }
}
