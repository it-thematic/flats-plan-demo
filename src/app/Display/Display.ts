export class Display {
  public floorCount: number;
  private displayDiv: HTMLElement;
  private cnvsLayers: any;
  private currentFloor: number;
  private cnvsWidth: number;
  private cnvsHeight: number;
  private floor1path: number[][];
  // private floor2path: number[][];
  // private floor3path: number[][];

  constructor (floors: number) {
    this.floorCount = floors;
    this.cnvsLayers = document.getElementsByClassName('display_canvas');
    this.displayDiv = document.getElementById('display');
    this.cnvsWidth = this.displayDiv.clientWidth;
    this.cnvsHeight = this.displayDiv.clientHeight;
    this.switchFloor(1);

    this.floor1path = [
      [420, 250],
      [500, 250],
      [500, 360],
      [600, 360],
      [600, 300],
      [600, 360],
      [500, 360],
      [500, 255],
      [580, 255],
      [340, 255],
      [340, 590],
      [640, 590],
      [640, 710],
      [770, 710],
      [770, 490]
    ];
  }

  public switchFloor (floor: number): void {
    if (floor < 1 || floor > this.floorCount) return;
    this.currentFloor = floor;
    for (let i = 0; i < this.floorCount; i++) {
      this.setCanvasResolution(this.cnvsLayers[i]);
      this.setContextParams(this.cnvsLayers[i]);
      if (i === floor - 1) {
        this.cnvsLayers[i].style.zIndex = '1';
      } else {
        this.cnvsLayers[i].style.zIndex = '-1';
      }
      let _btns = document.getElementsByClassName('switchBtn');
      for (let i = 0; i < _btns.length; i++) {
        _btns[i].setAttribute('style', 'background-color: none')
      }
      _btns[floor - 1].setAttribute('style', 'background-color: purple');
    }
    return;
  }

  private setCanvasResolution (cnvs: HTMLCanvasElement): void {
    cnvs.setAttribute('width', this.cnvsWidth + 'px');
    cnvs.setAttribute('height', this.cnvsHeight + 'px');
  }

  private setContextParams (cnvs: HTMLCanvasElement): void {
    let ctx = cnvs.getContext('2d');
    ctx.strokeStyle = '#7b1fa2';
    ctx.lineWidth = 6;
    ctx.font = '30px FontAwesome';
    ctx.fillStyle = '#7b1fa2';
  }

  public resetCanvas (cnvsIndex: number): void {
    let _ctx = this.cnvsLayers[cnvsIndex].getContext('2d');
    _ctx.clearRect(0, 0, this.cnvsWidth, this.cnvsHeight);
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
    };
  }

  public beginTrack (): void {
    console.log(this.cnvsLayers[0].id);
    let _ctx_1 = this.cnvsLayers[0].getContext('2d');
    // _ctx_1.lineWidth = 6;
    // _ctx_1.strokeStyle = 'purple';
    // _ctx_1.font = '30px FontAwesome';
    // _ctx_1.moveTo(this.floor1path[0][0], this.floor1path[0][1]);
    // _ctx_1.beginPath();
    for (let i = 0; i < this.floor1path.length; i++) {
      let x = this.floor1path[i][0];
      let y = this.floor1path[i][1];
      let _i = i;
      setTimeout(((xCoord, yCoord, index) => () => {
        this.resetCanvas(0);
        for (let j = 0; j < index; j++) {
          _ctx_1.beginPath();
          console.log(j, this.floor1path[j][0], this.floor1path[j][1]);
          _ctx_1.moveTo(this.floor1path[j][0], this.floor1path[j][1]);
          _ctx_1.arc(this.floor1path[j][0], this.floor1path[j][1], 3, 0, Math.PI * 2);
          _ctx_1.stroke();
        }
        _ctx_1.beginPath();
        // _ctx_1.fillStyle = 'purple';
        _ctx_1.moveTo(xCoord, yCoord);
        // _ctx_1.arc(xCoord, yCoord, 3, 0, Math.PI * 2);
        _ctx_1.fillText('\uf007', xCoord, yCoord);
        _ctx_1.stroke();
      })(x, y, _i), i * 500);
    }
  }
}
