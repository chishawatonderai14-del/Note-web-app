import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heading } from './heading';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Heading', () => {
  let component: Heading;
  let fixture: ComponentFixture<Heading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heading],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Heading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
