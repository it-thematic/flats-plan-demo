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
        this.cnvsLayers[i].style.display = 'block';
      } else {
        this.cnvsLayers[i].style.display = 'none';
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
}
