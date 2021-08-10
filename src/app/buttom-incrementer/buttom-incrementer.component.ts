import { AfterViewInit, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttom-incrementer',
  templateUrl: './buttom-incrementer.component.html',
  styleUrls: ['./buttom-incrementer.component.scss']
})
export class ButtomIncrementerComponent implements AfterViewInit {
  @ViewChild('valueField') private valueField: ElementRef<HTMLInputElement>
  @Input() max: number = 1;
  @Input() min: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  private _value: number = this.min;
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    if(value >= this.max) {value = this.max}
    if(value <= this.min) {value = this.min}
    console.log(value)
    this._value = value;
  }
  constructor() { }

  ngAfterViewInit(): void {
    this.valueField.nativeElement.addEventListener('change',()=>{
      this.value = +this.valueField.nativeElement.value
      this.updateValue();
    })
  }
  private updateValue() {
    this.valueField.nativeElement.value = "" + (this.value);
    this.valueChange.emit(+this.valueField.nativeElement.value);
  }

  decrement() {
    --this.value
    this.updateValue();
  }
  increment() {
    ++this.value
    this.updateValue();
  }
}
