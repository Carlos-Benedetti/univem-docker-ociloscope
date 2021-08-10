import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OciloscopeCanvasComponent } from './ociloscope-canvas.component';



@NgModule({
  declarations: [OciloscopeCanvasComponent],
  imports: [
    CommonModule
  ],
  exports: [OciloscopeCanvasComponent],
})
export class OciloscopeCanvasModule { }
