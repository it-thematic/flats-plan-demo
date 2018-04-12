import { Component, OnInit } from '@angular/core';
import { Display } from './Display/Display';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  private display: Display;
  private floorCount = 3;
  private currentFloor = 1;
  private xCoord: number;
  private yCoord: number

  ngOnInit() {
    this.display = new Display(this.floorCount);
  }

  public switchFloor (floor: number): void {
    this.display.switchFloor(floor);
    this.currentFloor = floor;
  }

  public onMousemove (evt: Event | any, canvasId: number): void {
    let coords = this.display.getCoords(evt, canvasId);
    this.xCoord = coords.xCoord;
    this.yCoord = coords.yCoord;
  }
}
