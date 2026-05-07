import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categorydropdown } from './categorydropdown';

describe('Categorydropdown', () => {
  let component: Categorydropdown;
  let fixture: ComponentFixture<Categorydropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categorydropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categorydropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
