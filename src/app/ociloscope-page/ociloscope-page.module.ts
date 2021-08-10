import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { OciloscopePageComponent } from './ociloscope-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OciloscopeCanvasModule } from '../ociloscope-canvas/ociloscope-canvas.module';
import { RouterModule, Routes } from '@angular/router';
import { KnobModule } from '../knob/knob.module';
import { ButtomIncrementerModule } from '../buttom-incrementer/buttom-incrementer.module';

const route: Routes = [
  {
    path: '',
    component:OciloscopePageComponent
  }
]
@NgModule({
  declarations: [OciloscopePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatSelectModule,
    MatFormFieldModule,
    OciloscopeCanvasModule,
    ButtomIncrementerModule
  ]
})
export class OciloscopePageModule { }
