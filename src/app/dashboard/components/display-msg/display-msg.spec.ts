import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMsg } from './display-msg';

describe('DisplayMsg', () => {
  let component: DisplayMsg;
  let fixture: ComponentFixture<DisplayMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayMsg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayMsg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
