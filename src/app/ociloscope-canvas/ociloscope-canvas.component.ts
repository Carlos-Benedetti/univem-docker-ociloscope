import { Component, Input, OnInit, ViewChild,ElementRef } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AudioAnalyzer } from '../audio-analyzer';

@Component({
  selector: 'app-ociloscope-canvas',
  templateUrl: './ociloscope-canvas.component.html',
  styleUrls: ['./ociloscope-canvas.component.scss']
})
export class OciloscopeCanvasComponent implements OnInit {
  @ViewChild('ociloscopeCanvas') public canvas: ElementRef<HTMLCanvasElement>
  @Input() public audioAnalyzer?: AudioAnalyzer
  public canvasCtx: CanvasRenderingContext2D;

  public backgroundColor = '#151515';
  private $interval = new Subject<number>()
  public waveZoom = 0;

  get width() { return this.canvas.nativeElement.width; }
  get height() { return this.canvas.nativeElement.height; }
  get sliceWidth() { return (this.width * 1.0 / this.audioAnalyzer.bufferLength) }

  constructor() {

  }

  initCanvas(audioAnalyzer: AudioAnalyzer, ms: number = 1000) {
    this.audioAnalyzer = audioAnalyzer
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight / 2;
    this.canvasCtx = this.canvas.nativeElement.getContext('2d');
    this.canvasCtx.clearRect(0, 0, this.width, this.height);
    this.canvasCtx.fillStyle = this.backgroundColor;

    this.setLineStyle()

    this.$interval.pipe(switchMap(period => interval(period))).subscribe(i=>this.draw())
    this.$interval.next(ms)
  }
  draw() {
    this.audioAnalyzer.analyser.getByteTimeDomainData(this.audioAnalyzer.dataArray);
    // console.log(new Set(this.audioAnalyzer.dataArray))
    this.canvasCtx.fillRect(0, 0, this.width, this.height);
    this.canvasCtx.beginPath();
    let x = 0;
    for (let i = 0; i < this.audioAnalyzer.bufferLength; i++) {
      const value = this.audioAnalyzer.dataArray[i]
      const pow = (value-this.audioAnalyzer.dataMean)*this.waveZoom
      let v = (( value + pow ) * 2) / (this.audioAnalyzer.dataMean);

      let y = (v) * (this.height / 4);
      if (i === 0) {
        this.canvasCtx.moveTo(x, y);
      } else {
        this.canvasCtx.lineTo(x, y);
        x-128
      }
      x += this.sliceWidth;
    }
    // MANDA A LINHA PARA O CENTRO DO CANVAS 
    this.canvasCtx.lineTo(this.width, this.height / 2);
    this.canvasCtx.stroke();
  }
  setLineStyle() {
    
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = 'rgb(249, 251, 250)';
    this.canvasCtx.shadowOffsetX = 1;
    this.canvasCtx.shadowOffsetY = 1;
    this.canvasCtx.shadowBlur = 10;
    this.canvasCtx.shadowColor = "rgb(28, 213, 254)";
    this.canvasCtx.lineCap = 'round';
    this.canvasCtx.imageSmoothingEnabled = true;
    this.canvasCtx.translate(0.5, 0.5);
  }
  setRefreshTimes(ms: number) {
    this.$interval.next(ms)
  }
  ngOnInit(): void {
  }

}
