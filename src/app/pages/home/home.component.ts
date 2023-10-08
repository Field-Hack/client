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
import { coords } from './coords';

declare const google: google;

import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

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

  public constructor(
    public readonly taskService: TaskServiceApi,
    public readonly employeeService: EmployeeServiceApi,
    public readonly homeService: HomeService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.homeService.clearMap();
  }

  public ngAfterViewInit() {
    this.homeService.map()?.data.setStyle((feature: any) => {
      return /** @type {!google.maps.Data.StyleOptions} */ {
        strokeWeight: 3,
      };
    });
    this.populateTerritories();
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

  public async changeUseCase(useCase: string): Promise<void> {
    this.homeService.clearMap();
    this.employeeService.changeUseCase(useCase);
    this.homeService.putPins();
    this.homeService.map()?.data.addGeoJson(australia);

    this.homeService.map()?.data.setStyle((feature: any) => {
      return {
        fillColor: '#0055ff',
        strokeWeight: 1,
      };
    });
  }

  private populateTerritories(): void {
    const {
      sjrp,
      sjrpZn,
      sjrpZs,
      mirassol,
      bahia,
      minasGerais,
      rioDeJaneiro,
      saoPaulo,
      invaldSubTerritory,
      validSubTerritory,
      circleTerritorySjrp,
      invalidCircleTerritoryOutSjrp,
      validCircleTerritoryOutSjrp,
    } = coords;

    this.drawPolygon(mirassol);
    this.drawPolygon(sjrp, false, true);
    this.drawPolygon(sjrpZn, false, true, true);
    this.drawPolygon(sjrpZs, false, true, true);
    this.drawPolygon(bahia, false, true);
    this.drawPolygon(minasGerais, false, true);
    this.drawPolygon(rioDeJaneiro, false, true);
    this.drawPolygon(invaldSubTerritory, true, false, true);
    this.drawPolygon(validSubTerritory, false, false, true);

    this.drawCircle(saoPaulo, false, true);
    this.drawCircle(circleTerritorySjrp, false, false, true);
    this.drawCircle(invalidCircleTerritoryOutSjrp, true, false);
    this.drawCircle(validCircleTerritoryOutSjrp);
  }

  private drawPolygon(
    coords: {
      lat: number;
      lng: number;
    }[],
    invalid?: boolean,
    baseTerritory?: boolean,
    isSubTerritory?: boolean
  ): void {
    const color = this.getRandomColor(invalid, baseTerritory, isSubTerritory);

    const polygon = new google.maps.Polygon({
      paths: coords,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
    });

    polygon.setMap(this.homeService.map()!);
  }

  private drawCircle(
    circle: {
      center: {
        lat: number;
        lng: number;
      };
      radius: number;
    },
    invalid?: boolean,
    baseTerritory?: boolean,
    isSubTerritory?: boolean
  ): void {
    const color = this.getRandomColor(invalid, baseTerritory, isSubTerritory);

    const drawedCircle = new google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
      center: circle.center,
      radius: circle.radius,
    });

    drawedCircle.setMap(this.homeService.map()!);
  }

  private getRandomColor(
    invalid?: boolean,
    baseTerritory?: boolean,
    isSubTerritory?: boolean
  ): string {
    if (baseTerritory) {
      return isSubTerritory ? '#004BE0' : '#0055ff';
    }

    if (invalid) {
      return isSubTerritory ? '#FC3868' : '#ff0000';
    }

    return '#12b886';
  }
}
