import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyNote } from './empty-note';

describe('EmptyNote', () => {
  let component: EmptyNote;
  let fixture: ComponentFixture<EmptyNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
