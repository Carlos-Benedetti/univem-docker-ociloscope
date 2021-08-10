import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { UserMedia } from '../user-media';
import { tap } from 'rxjs/operators'
import { OciloscopeCanvasComponent } from '../ociloscope-canvas/ociloscope-canvas.component';
import { AudioAnalyzer } from '../audio-analyzer';

@Component({
  selector: 'app-ociloscope-page',
  templateUrl: './ociloscope-page.component.html',
  styleUrls: ['./ociloscope-page.component.scss']
})
export class OciloscopePageComponent implements AfterViewInit {
  @ViewChild('deviceSelect') private deviceSelect: MatSelect
  @ViewChild('ociloscopeCanvas') private ociloscopeCanvas: OciloscopeCanvasComponent
  devices: MediaDeviceInfo[] = []
  userMedia = new UserMedia()
  mediaStream?: MediaStream;
  audioAnalyzer: AudioAnalyzer;
  playbackAudio: HTMLAudioElement;
  constructor() {
    
  }

  ngAfterViewInit(): void {
    this.updateDevices()
    this.deviceSelect.valueChange.subscribe(async (value) => {
      this.audioAnalyzer = new AudioAnalyzer()
      this.userMedia.audioDevice = value
      await this.updateMediaStream();
    })
  }

  public changeGain(gain){
    this.audioAnalyzer.gainNode.gain.value = gain
    this.audioAnalyzer
  }

  public changePlayback(event){
    event.target.checked?this.playbackAudio.play():this.playbackAudio.pause()
  }

  public changeEcho(event){
    this.audioAnalyzer.activeSource.mediaStream.getAudioTracks()[0].applyConstraints({echoCancellation:event.target.checked})
  }

  public changeNoise(event){
    this.audioAnalyzer.activeSource.mediaStream.getAudioTracks()[0].applyConstraints({noiseSuppression:event.target.checked})
  }
  public changeIntencity(event){
    this.ociloscopeCanvas.waveZoom = event
  }

  private async updateMediaStream() {
    this.mediaStream = await this.userMedia.getStream();
    this.audioAnalyzer.analyzeStream(this.mediaStream);
    this.ociloscopeCanvas.initCanvas(this.audioAnalyzer,50)
    this.playbackAudio = this.audioAnalyzer.getAudioPlayback()
  }

  async updateDevices() {
    this.devices = await this.userMedia.getDevices()
    console.log(this.devices)
  }

}
