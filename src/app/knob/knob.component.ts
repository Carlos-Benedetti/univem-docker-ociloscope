import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements AfterViewInit {
  @ViewChild('knob') private knob: ElementRef<HTMLDivElement>
  @ViewChild('panel') private panel: ElementRef<HTMLDivElement>
  @Input() max: number = 0
  @Input() min: number = 1
  @Output() valueChange = new EventEmitter<number>()
  private _angle = 0;

  public get angle() {
    return this._angle;
  }
  public set angle(value) {
    if (value > 180) value = 180
    if (value < -180) value = -180
    this._angle = value;
  }

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    const mHouver = (e) => { this.mouseAngle(e) }
    this.knob.nativeElement.addEventListener("mousedown", () => {
      this.knob.nativeElement.addEventListener('mousemove', mHouver)
    });
    document.addEventListener("mouseup", () => {
      this.knob.nativeElement.removeEventListener('mousemove', mHouver)
    });
  }

  mouseAngle(e: MouseEvent) {
    this.angle += (e.movementX * 2)
    this.knob.nativeElement.style.transform = `rotate(${this.angle}deg)`;
    const NewValue = ((this.angle - 180) * (this.max - this.min)) + this.min
    this.valueChange.emit(NewValue)
  }

}
