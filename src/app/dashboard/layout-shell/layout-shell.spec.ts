import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutShell } from './layout-shell';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LayoutShell', () => {
  let component: LayoutShell;
  let fixture: ComponentFixture<LayoutShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutShell],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
