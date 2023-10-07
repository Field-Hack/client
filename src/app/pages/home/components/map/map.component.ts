import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  public apiLoaded: Observable<boolean>;

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyD5FAI1x37rZdyclFyoAxvvY_EsoBRfCz0', 'callback').pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  public async ngOnInit(): Promise<void> {
    
  }
}
