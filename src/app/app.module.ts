import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OciloscopeCanvasComponent } from './ociloscope-canvas/ociloscope-canvas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OciloscopePageComponent } from './ociloscope-page/ociloscope-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KnobComponent } from './knob/knob.component';
import { ButtomIncrementerComponent } from './buttom-incrementer/buttom-incrementer.component';
import { ButtomIncrementerModule } from './buttom-incrementer/buttom-incrementer.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
