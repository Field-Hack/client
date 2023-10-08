import { ChangeDetectorRef, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import {
  GeoJSONData,
  GeoJSONFeature,
  ORSResponse,
} from 'src/app/core/api/routing/routins.type';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Employee } from 'src/app/core/interfaces/employees.types';
import { Task } from 'src/app/core/interfaces/tasks.types';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public isAddTaskActive = signal(false);
  public isAddEmployeeActive = signal(false);
  public map = signal<google.maps.Map | undefined>(undefined);
  public ORSResponse = signal<ORSResponse | undefined>(undefined);
  public geoJSONDatas = signal<GeoJSONData[]>([]);
  public isLoading = signal(false);
  public isAdding = signal(false);

  public selectedCoords$ = new Subject<{ lat: number; lng: number }>();
  public openTaskDialog$ = new Subject<Task | undefined>();
  public openEmployeeDialog$ = new Subject<Employee | undefined>();

  private currentColor = 0;

  public constructor(
    private readonly routingServiceApi: RoutingServiceApi,
    private readonly taskService: TaskServiceApi,
    private readonly employeeService: EmployeeServiceApi
  ) {}

  public async route(): Promise<void> {
    if (!this.map()) {
      return;
    }

    const route = await this.routingServiceApi.route({
      tasks: this.taskService.tasks(),
      employees: this.employeeService.employees()!,
    });

    this.ORSResponse.set(route);

    const geoJSONDatas = await Promise.all(
      route.routes.map(async (route) => {
        return await this.routingServiceApi.geoJson(route);
      })
    );

    this.geoJSONDatas.set(geoJSONDatas);

    this.clearMap();
    await this.putPins();

    for (const geoJSONData of geoJSONDatas) {
      const color = this.getRandomDarkColor();

      const polyline = new google.maps.Polyline({
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 3,
        map: this.map(),
        icons: [
          {
            icon: {
              path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
              strokeColor: color,
              strokeWeight: 2,
            },
            offset: '100%',
            repeat: '100px',
          },
        ],
      });

      polyline.addListener('mouseover', () => {
        polyline.setOptions({
          strokeColor: this.mostDarkColor(color),
        });
      });

      polyline.addListener('mouseout', () => {
        polyline.setOptions({
          strokeColor: color,
        });
      });

      polyline.setPath(
        geoJSONData.features[0].geometry.coordinates.map(
          (coord: number[]) => new google.maps.LatLng(coord[1], coord[0])
        )
      );
    }
  }

  public async putPins(): Promise<void> {
    const bounds = new google.maps.LatLngBounds();

    for (const task of this.taskService.tasks()) {
      const taskLocation = new google.maps.LatLng(
        task.location[1],
        task.location[0]
      );

      bounds.extend(taskLocation);

      const createdMarker = new google.maps.Marker({
        position: taskLocation,
        map: this.map(),
        icon: '/assets/apartment.svg',
        clickable: true,
        cursor: 'pointer',
      });

      this.attachMessage(createdMarker, task);

      this.map()?.fitBounds(bounds);

      this.map()?.setCenter(bounds.getCenter());
    }

    for (const employee of this.employeeService.employees()!) {
      const employeeLocationStart = new google.maps.LatLng(
        employee.start[1],
        employee.start[0]
      );

      const image = new Image();
      image.src = 'https://i.pravatar.cc/150?u=' + employee.id;
      image.style.width = '30px';
      image.style.height = '30px';
      image.style.borderRadius = '50%';
      image.style.border = 'none';
      image.style.boxShadow = '0 0 3px #000';

      const newMarker = (await google.maps.importLibrary('marker')) as any;

      const marker = new newMarker.AdvancedMarkerElement({
        position: employeeLocationStart,
        map: this.map(),
        content: image,
      });

      const infowindow = new google.maps.InfoWindow({
        content: this.formatMessageEmployee(employee),
        maxWidth: 300,
        minWidth: 100,
      });

      marker.addEventListener('gmp-click', () => {
        infowindow.open(this.map(), marker);
      });
    }
  }

  private formatMessageTask(task: Task): string {
    return `
      <div style="border-radius: 5px; padding: 10px; overflow: hidden;">
        <h4 style="color: #333; font-size: 18px; margin-bottom: 10px;">${
          task.description
        }</h4>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Id:</strong> ${task.id}
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Duração:</strong> ${(task.service / 60).toFixed(2)}min
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Tempo de preparo:</strong> ${(task.setup / 60).toFixed(2)}min
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Prioridade:</strong> ${task.priority}
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 0;">
          <strong>Lat/Long:</strong> ${[...task.location]
            .reverse()
            .map((cord) => cord.toFixed(6))
            .join(', ')}
        </p>
      </div>
    `;
  }

  public clearMap(): void {
    this.map.set(
      new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 14,
        center: { lat: -20.81368726737007, lng: -49.37250245722454 },
        mapId: '4504f8b37365c3d0',
      })
    );

    this.map()?.addListener('click', (event: any) => {
      if (!this.isAdding()) {
        return;
      }

      this.map()?.setClickableIcons(true);
      this.map()?.setOptions({ gestureHandling: 'cooperative' });
      this.isAdding.set(false);

      this.createTask(event.latLng.lat(), event.latLng.lng());
    });
  }

  private formatMessageEmployee(employee: Employee): string {
    return `
      <div style="border-radius: 5px; padding: 10px; overflow: hidden;">
        <h4 style="color: #333; font-size: 18px; margin-bottom: 10px;">${
          employee.name
        }</h4>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Id:</strong> ${employee.id}
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Inicio (Lat/Lng):</strong> ${[...employee.start]
            .reverse()
            .map((cord) => cord.toFixed(6))
            .join(', ')}
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">
          <strong>Fim (Lat/Lng):</strong> ${[...employee.end]
            .reverse()
            .map((cord) => cord.toFixed(6))
            .join(', ')}
        </p>
      </div>
    `;
  }

  public attachMessage(marker: google.maps.Marker, task: Task) {
    const message = this.formatMessageTask(task);
    const infowindow = new google.maps.InfoWindow({
      content: message,
      maxWidth: 300,
      minWidth: 100,
    });

    marker.addListener('mouseover', () => {
      infowindow.open(marker.get('map'), marker);
    });

    marker.addListener('mouseout', () => {
      setTimeout(() => infowindow.close(), 500);
    });
  }

  public async createTask(lat: number, long: number): Promise<void> {
    this.isLoading.set(true);

    const task = {
      id: this.taskService.tasks().length + 100,
      location: [long, lat] as [number, number],
      priority: 30,
      service: 500,
      setup: 5,
      description: 'Atividade ' + this.taskService.tasks().length,
    };

    this.taskService.create(task);

    await this.putPins();

    await this.route();

    this.isLoading.set(false);
  }

  public getRandomDarkColor(): string {
    const baseColor = ['#FF4136', '#2ECC40 ', '#0074D9', '#FF851B'];
    const color = baseColor[this.currentColor];
    this.currentColor =
      this.currentColor === baseColor.length - 1 ? 0 : this.currentColor + 1;
    return color;
  }

  public mostDarkColor(color: string): string {
    const baseColor = ['#FF4136', '#2ECC40 ', '#0074D9', '#FF851B'];

    const baseColorDarker = ['#D90000', '#1E7E34', '#004C8C', '#D15B00'];
    const index = baseColor.indexOf(color);
    return baseColorDarker[index];
  }
}
