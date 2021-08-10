import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OciloscopeCanvasComponent } from './ociloscope-canvas.component';

describe('OciloscopeCanvasComponent', () => {
  let component: OciloscopeCanvasComponent;
  let fixture: ComponentFixture<OciloscopeCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OciloscopeCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OciloscopeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
