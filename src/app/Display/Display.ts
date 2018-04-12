export class Display {
  public floorCount: number;
  private displayDiv: HTMLElement;
  private cnvsLayers: any;
  private currentFloor: number;
  private cnvsWidth: number;
  private cnvsHeight: number;

  constructor (floors: number) {
    this.floorCount = floors;
    this.cnvsLayers = document.getElementsByClassName('display_canvas');
    this.displayDiv = document.getElementById('display');
    this.cnvsWidth = this.displayDiv.clientWidth;
    this.cnvsHeight = this.displayDiv.clientHeight;
    this.switchFloor(1);
  }

  public switchFloor (floor: number): void {
    if (floor < 1 || floor > this.floorCount) return;
    this.currentFloor = floor;
    for (let i = 0; i < this.floorCount; i++) {
      if (i === floor - 1) {
        // this.cnvsLayers[i].style.display = 'block';
        this.cnvsLayers[i].style.zIndex = '1';
      } else {
        // this.cnvsLayers[i].style.display = 'none';
        this.cnvsLayers[i].style.zIndex = '-1';
      }
      let _btns = document.getElementsByClassName('switchBtn');
      for (let i = 0; i < _btns.length; i++) {
        _btns[i].setAttribute('style', 'background-color: none')
      }
      _btns[floor - 1].setAttribute('style', 'background-color: purple');
    }

    console.log('Display switch floor ' + this.currentFloor)
    // this.displayDiv.className = 'floor_' + floor;
    return;
  }

  public resetCanvas (cnvsIndex: number): void {
    let _ctx = this.cnvsLayers[cnvsIndex].getContext('2d');
    _ctx.clearRect(0, 0, this.cnvsWidth, this.cnvsHeight);
  }

  public resetView (): void {
    for (let i = 0; i < this.floorCount; i++) {
      this.resetCanvas(i);
      this.switchFloor(1);
    }
  }

  public getCoords (evt: Event | any, canvasId: number): any {
    let _id = 'canvas_' + canvasId;
    let _canvas = document.getElementById(_id);
    let _rect = _canvas.getBoundingClientRect();
    let _x = Math.round(evt.clientX - _rect.left);
    let _y = Math.round(evt.clientY - _rect.top);
    return {
      xCoord: _x,
      yCoord: _y
    }
  }
}
