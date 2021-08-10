import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtomIncrementerComponent } from './buttom-incrementer.component';



@NgModule({
  declarations: [ButtomIncrementerComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtomIncrementerComponent],
})
export class ButtomIncrementerModule { }
