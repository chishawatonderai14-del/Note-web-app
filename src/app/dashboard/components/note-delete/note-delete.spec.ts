import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDelete } from './note-delete';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NoteDelete', () => {
  let component: NoteDelete;
  let fixture: ComponentFixture<NoteDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDelete],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
