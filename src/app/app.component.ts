import { Component, OnInit } from '@angular/core';
import { Display } from './Display/Display';
import { Paths } from './Display/Paths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  private display: Display;
  private paths: Paths;
  private floorCount = 3;
  private currentFloor = 1;
  private currentPeopleCount = 2;
  private xCoord: number;
  private yCoord: number;

  ngOnInit() {
    this.display = new Display(this.floorCount);
    this.paths = new Paths();
    this.display.beginTrack(1, 1, this.paths.path_1_1);
    this.display.beginTrack(1, 2, this.paths.path_1_2);
    this.display.beginTrack(2, 1, this.paths.path_2_1);
    this.display.beginTrack(2, 2, this.paths.path_2_2);
    this.display.beginTrack(2, 3, this.paths.path_2_3);
    this.display.beginTrack(3, 1, this.paths.path_3_1);
  }

  public switchFloor (floor: number): void {
    this.display.switchFloor(floor);
    this.currentFloor = floor;
    switch (floor) {
      case 1: {
        this.currentPeopleCount = 2;
        break;
      }
      case 2: {
        this.currentPeopleCount = 3;
        break;
      }
      case 3: {
        this.currentPeopleCount = 1;
        break;
      }
    }
  }

  public onMousemove (evt: Event | any, canvasId: String): void {
    let coords = this.display.getCoords(evt, canvasId);
    this.xCoord = coords.xCoord;
    this.yCoord = coords.yCoord;
  }

  public onClick (evt: Event | any, canvasId: String): void {
    let coords = this.display.getCoords(evt, canvasId);
    // console.log(coords);
    console.log('[' + Math.round(coords.xCoord) + ', ' + Math.round(coords.yCoord) + '],');
  }
}
