import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteContent } from './note-content';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NoteContent', () => {
  let component: NoteContent;
  let fixture: ComponentFixture<NoteContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteContent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain', () => {
    component.data = 'buy milk';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const noteContent = compiled.querySelector('.content');
    expect(noteContent.textContent).toBe('buy milk');
  })
});
