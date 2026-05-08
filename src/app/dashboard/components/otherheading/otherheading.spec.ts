import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Otherheading } from './otherheading';

describe('Otherheading', () => {
  let component: Otherheading;
  let fixture: ComponentFixture<Otherheading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Otherheading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Otherheading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
