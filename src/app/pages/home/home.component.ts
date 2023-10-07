import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { EmployeeServiceApi } from 'src/app/core/api/employee/employee.service';
import { RoutingServiceApi } from 'src/app/core/api/routing/routing.service';
import { TaskServiceApi } from 'src/app/core/api/task/task.service';
import { Task } from 'src/app/core/interfaces/tasks.types';
import { google } from "google-maps";
import { MatMiniFabButton } from '@angular/material/button';
import { HomeService } from './home.service';
import { Employee } from 'src/app/core/interfaces/employees.types';

declare const google : google;

import { trigger, transition, style, animate } from '@angular/animations';
import { GeoJSONFeature, Route } from 'src/app/core/api/routing/routins.type';

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

    this.map()?.data.setStyle((feature: any) => {
      let color = '#' + Math.floor(Math.random()*16777215).toString(16);

      return /** @type {!google.maps.Data.StyleOptions} */ {
        fillColor: color,
        strokeColor: color,
        strokeWeight: 3,
      };
    });

    this.map()?.data.addGeoJson(australia);
  }

  public add(): void {
    this.map()?.setClickableIcons(false);
    this.map()?.setOptions({ gestureHandling: 'none' })
    this.isAdding.set(true);
  }

  public trackByFn(index: number, item: Task | Employee): number {
    return item.id;
  }

  public async routing(): Promise<void> {
    const route = await this.routingServiceApi.route({
      tasks: this.taskService.tasks(),
      employees: this.employeeService.employees()!,
    });

    const geoJSONDatas = await Promise.all(route.routes.map(async (route) => {
      return await this.routingServiceApi.geoJson(route);
    }));

    for (const geoJSONData of geoJSONDatas) {
      this.map()?.data.addGeoJson(geoJSONData)

      const content = this.formatMessageRoute(geoJSONData.features);

      const infowindow = new google.maps.InfoWindow({
        content,
        maxWidth: 300,
        minWidth: 100
      });

      this.map()?.data.addListener('mouseover',(event: any) => {
        infowindow.setPosition(event.latLng);
        infowindow.open(this.map());
      })

      this.map()?.data.addListener('mouseout', () => {
        infowindow.close();
      });

      const bounds = new google.maps.LatLngBounds();

      for (const task of this.taskService.tasks()) {
        const taskLocation = new google.maps.LatLng(task.location[1], task.location[0]);

        bounds.extend(taskLocation);

        const createdMarker = new google.maps.Marker({
          position: taskLocation,
          map: this.map(),
          icon: '/assets/apartment.svg',
          clickable: true,
          cursor: 'pointer',
        });

        this.attachSecretMessage(createdMarker, task);

        this.map()?.fitBounds(bounds);

        this.map()?.setCenter(bounds.getCenter());
      }
    }

    for (const employee of this.employeeService.employees()!) {
      const employeeLocationStart = new google.maps.LatLng(employee.start[1], employee.start[0]);
      const employeeLocationEnd = new google.maps.LatLng(employee.end[1], employee.end[0]);

      new google.maps.Marker({
        position: employeeLocationStart,
        map: this.map(),
        icon: '/assets/house_pin.svg',
        clickable: true,
        cursor: 'pointer',
      });

      new google.maps.Marker({
        position: employeeLocationEnd,
        map: this.map(),
        icon: '/assets/house_pin.svg',
      });
    }
  }

  public attachSecretMessage(
    marker: google.maps.Marker,
    task: Task
  ) {

    const message = this.formatMessageTask(task);
    const infowindow = new google.maps.InfoWindow({
      content: message,
      maxWidth: 300,
      minWidth: 100
    });

    marker.addListener("mouseover", () => {
      infowindow.open(marker.get("map"), marker);
    });

    marker.addListener("mouseout", () => {
      infowindow.close();
    });
  }

  public formatMessageTask(task: Task): string {
    return `
      <div>
        <h4>${task.description}</h4>
        <p>
          <strong>Id:</strong> ${task.id}
        </p>
        <p>
          <strong>Service:</strong> ${task.service}
        </p>
        <p>
          <strong>Priority:</strong> ${task.priority}
        </p>
        <p>
          <strong>Setup:</strong> ${task.setup}
        </p>
        <p>
          <strong>Time Windows:</strong> ${task.time_windows}
        </p>
        <p>
          <strong>Location:</strong> ${task.location}
        </p>
      </div>
    `
  }

  public formatMessageRoute(features: GeoJSONFeature[]): string {
    const messages = features.map((feature) => {
      const { properties } = feature;
      return `
        <div>
          <p>
            <strong>Distance:</strong> ${properties.summary.distance}
          </p>
          <p>
            <strong>Duration:</strong> ${properties.summary.duration}
          </p>
        </div>
      `
    });

    return messages.join('');
  }
}

const australia = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            122.28580834442243,
            -23.200892591812902
          ],
          [
            121.74756245982064,
            -29.236132002360186
          ],
          [
            123.31845055487702,
            -29.32278158406742
          ],
          [
            123.534554547928,
            -25.83531643712658
          ],
          [
            126.74010833850389,
            -26.000575241192195
          ],
          [
            126.7770651180931,
            -24.976131996466407
          ],
          [
            123.59665833714217,
            -24.776535293502405
          ],
          [
            123.67226914326557,
            -23.1883795869645
          ],
          [
            126.76951748903309,
            -23.40157809496141
          ],
          [
            126.7944917376281,
            -22.33398688779627
          ],
          [
            122.31155323492317,
            -21.935687359628716
          ],
          [
            122.25609699491042,
            -23.223485436154647
          ]
        ],
        "type": "LineString"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              128.15836488265523,
              -22.391893686523517
            ],
            [
              128.15836488265523,
              -29.666268847255864
            ],
            [
              129.52316649493991,
              -29.666268847255864
            ],
            [
              129.52316649493991,
              -22.391893686523517
            ],
            [
              128.15836488265523,
              -22.391893686523517
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              130.69966946256284,
              -22.45018925796998
            ],
            [
              130.72396594923237,
              -29.677673876082856
            ],
            [
              134.74260437167982,
              -29.6049675695834
            ],
            [
              134.6804055947661,
              -28.53655748032179
            ],
            [
              131.94786764507433,
              -28.588938504846645
            ],
            [
              131.8896510450578,
              -26.533322606762795
            ],
            [
              134.57000646696315,
              -26.454298898033194
            ],
            [
              134.4660203670711,
              -25.38825213075316
            ],
            [
              131.9686503457906,
              -25.418789259286243
            ],
            [
              131.9130858136483,
              -23.76129537173597
            ],
            [
              134.3584953779964,
              -23.803321844814064
            ],
            [
              134.28844733820665,
              -22.49718789985603
            ],
            [
              130.69966946256284,
              -22.45018925796998
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              135.71405337103153,
              -22.514399208516323
            ],
            [
              136.1204422589766,
              -29.71633669120653
            ],
            [
              140.0535714402053,
              -29.409826584057676
            ],
            [
              139.86939333319629,
              -28.390287315393273
            ],
            [
              137.43626576321054,
              -28.548214348728415
            ],
            [
              136.9546821573923,
              -22.567803663783863
            ],
            [
              135.71405337103153,
              -22.514399208516323
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            140.5225771678396,
            -22.27152732655091
          ],
          [
            141.31200090217436,
            -29.428142074238153
          ],
          [
            144.37420513430368,
            -29.064650427269676
          ],
          [
            145.4701145535078,
            -28.15202754191609
          ],
          [
            146.09610174788736,
            -26.76051710149799
          ],
          [
            146.04918044413978,
            -25.562723693867056
          ],
          [
            145.83015629576192,
            -24.164129694037328
          ],
          [
            144.94674124250218,
            -22.937872736386282
          ],
          [
            143.75692983116141,
            -22.6067837253771
          ],
          [
            142.27603310718843,
            -22.329037345023252
          ],
          [
            140.66364250417655,
            -22.23048391978554
          ],
          [
            140.42715845074747,
            -22.213754274957026
          ]
        ],
        "type": "LineString"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            141.7249754174988,
            -23.440576922173292
          ],
          [
            142.41871535719406,
            -28.40081819179902
          ],
          [
            144.08639428413926,
            -28.24950711618044
          ],
          [
            144.58835415664453,
            -27.474629632808956
          ],
          [
            144.7451062955189,
            -26.423030371428467
          ],
          [
            144.67478498970007,
            -25.42227289533747
          ],
          [
            144.2781764277944,
            -24.375233589405
          ],
          [
            143.56740686457795,
            -23.623982291807593
          ],
          [
            143.2311235662703,
            -23.581842873945604
          ],
          [
            141.74280155144072,
            -23.399118282045393
          ]
        ],
        "type": "LineString"
      }
    }
  ]
}
