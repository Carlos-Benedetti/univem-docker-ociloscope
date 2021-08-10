import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomIncrementerComponent } from './buttom-incrementer.component';

describe('ButtomIncrementerComponent', () => {
  let component: ButtomIncrementerComponent;
  let fixture: ComponentFixture<ButtomIncrementerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtomIncrementerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtomIncrementerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
