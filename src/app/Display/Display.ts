export class Display {
  public floorCount: number;
  private displayDiv: HTMLElement;
  private currentFloor: number;
  private cnvsWidth: number;
  private cnvsHeight: number;
  private cnvsScale = {
    xScale: 1,
    yScale: 1
  };

  constructor (floors: number) {
    this.floorCount = floors;
    this.displayDiv = document.getElementById('display');
    this.cnvsWidth = this.displayDiv.clientWidth;
    this.cnvsHeight = this.displayDiv.clientHeight;
    this.cnvsScale.xScale = this.cnvsWidth / 100;
    this.cnvsScale.yScale = this.cnvsHeight / 100;
    this.switchFloor(1);
  }

  public switchFloor (floor: number): void {
    if (floor < 1 || floor > this.floorCount) { return; }
    this.currentFloor = floor;
    for (let i = 0; i < this.floorCount; i++) {
      let _btns = document.getElementsByClassName('switchBtn');
      for (let i = 0; i < _btns.length; i++) {
        _btns[i].setAttribute('style', 'background-color: none');
      }
      _btns[floor - 1].setAttribute('style', 'background-color: #7b1fa2');
    }

    let _allCanvas = <HTMLElement[]> Array.from(document.getElementsByClassName('display_canvas'));
    for (let i = 0; i < _allCanvas.length; i++) {
      this.setCanvasResolution(_allCanvas[i]);
      _allCanvas[i].setAttribute('style', 'z-index: -1');
    }
    let _currentCanvasClass = 'canvas_floor' + floor;
    let _currentFloorCanvas = <HTMLElement[]> Array.from(document.getElementsByClassName(_currentCanvasClass));
    for (let i = 0; i < _currentFloorCanvas.length; i++) {
      _currentFloorCanvas[i].setAttribute('style', 'z-index: 1');
    }

    switch (floor) {
      case 1: {
        let _cnvs_1_1 = document.getElementById('canvas_1_1');
        let _cnvs_1_2 = document.getElementById('canvas_1_2');
        this.setContextParams(_cnvs_1_1, 3);
        this.setContextParams(_cnvs_1_2, 1);
        break;
      }
      case 2: {
        let _cnvs_2_1 = document.getElementById('canvas_2_1');
        let _cnvs_2_2 = document.getElementById('canvas_2_2');
        let _cnvs_2_3 = document.getElementById('canvas_2_3');
        this.setContextParams(_cnvs_2_1, 3);
        this.setContextParams(_cnvs_2_2, 2);
        this.setContextParams(_cnvs_2_3, 1);
        break;
      }
      case 3: {
        let _cnvs_3_1 = document.getElementById('canvas_3_1');
        this.setContextParams(_cnvs_3_1, 2);
      }
    }
    return;
  }

  private setCanvasResolution (cnvs: HTMLElement): void {
    cnvs.setAttribute('width', this.cnvsWidth + 'px');
    cnvs.setAttribute('height', this.cnvsHeight + 'px');
  }

  private setContextParams (cnvs: any, personRole: number): void {
    let ctx = cnvs.getContext('2d');
    ctx.lineWidth = 2;
    ctx.font = '15px FontAwesome';
    switch (personRole) {
      case 1: {
        ctx.strokeStyle = ctx.fillStyle = '#ae52d4';
        break;
      }
      case 2: {
        ctx.strokeStyle = ctx.fillStyle = '#7b1fa2';
        break;
      }
      case 3: {
        ctx.strokeStyle = ctx.fillStyle = '#4a0072';
        break;
      }
    }
  }

  public resetCanvas (cnvs: HTMLCanvasElement): void {
    let _ctx = cnvs.getContext('2d');
    _ctx.clearRect(0, 0, this.cnvsWidth, this.cnvsHeight);
  }

  public getCoords (evt: Event | any, canvasId: string): any {
    let _canvas = document.getElementById(canvasId);
    let _rect = _canvas.getBoundingClientRect();
    let _x = Math.round(evt.clientX - _rect.left);
    let _y = Math.round(evt.clientY - _rect.top);
    return this.translateCoords(_x, _y);
  }

  public translateCoords (xV, yV): Object {
    return {
      xCoord: xV / this.cnvsScale.xScale,
      yCoord: yV / this.cnvsScale.yScale
    };
  }

  public translateCoordsBack (xW, yW): Object {
    return {
      xCoord: xW * this.cnvsScale.xScale,
      yCoord: yW * this.cnvsScale.yScale
    };
  }

  public beginTrack (floorNumber: number, canvasNumber: number, trackCoords: number[][]): void {
    console.log('Floor: ' + floorNumber + ', engineer: ' + canvasNumber + ', length: ' + trackCoords.length);
    let _canvasId = 'canvas_' + floorNumber + '_' + canvasNumber;
    let _canvas = <HTMLCanvasElement> document.getElementById(_canvasId);
    let _ctx = _canvas.getContext('2d');

    let _translatedPath = [];
    for (let i = 0; i < trackCoords.length; i++) {
      let _coords = this.translateCoordsBack(trackCoords[i][0], trackCoords[i][1]);
      _translatedPath[i] = [_coords['xCoord'], _coords['yCoord']];
    }
    for (let i = 0; i < trackCoords.length; i++) {
      let _coords = this.translateCoordsBack(trackCoords[i][0], trackCoords[i][1]);
      let x = _coords['xCoord'];
      let y = _coords['yCoord'];
      let _i = i;
      setTimeout(((xCoord, yCoord, index) => () => {
        this.resetCanvas(_canvas);
        for (let j = 0; j < index; j++) {
          _ctx.beginPath();
          _ctx.moveTo(_translatedPath[j][0], _translatedPath[j][1]);
          _ctx.arc(_translatedPath[j][0], _translatedPath[j][1], 1.5, 0, Math.PI * 2);
          // _ctx.lineTo(_translatedPath[j + 1][0], _translatedPath[j + 1][1]);
          _ctx.stroke();
        }
        _ctx.beginPath();
        _ctx.moveTo(xCoord, yCoord);
        _ctx.fillText('\uf007', xCoord, yCoord);
        _ctx.stroke();
      })(x, y, _i), i * 500);
    }
  }
}
