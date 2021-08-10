import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OciloscopePageComponent } from './ociloscope-page.component';

describe('OciloscopePageComponent', () => {
  let component: OciloscopePageComponent;
  let fixture: ComponentFixture<OciloscopePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OciloscopePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OciloscopePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
