import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterComponent implements OnInit {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public route: any) {
  }

  public async ngOnInit(): Promise<void> {
  }
}
