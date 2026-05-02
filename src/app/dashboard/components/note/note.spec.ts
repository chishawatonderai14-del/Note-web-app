import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Note } from './note';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Note', () => {
  let component: Note;
  let fixture: ComponentFixture<Note>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Note],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Note);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it ('should render the note ', () => {
    component.note = {
      id: 1, 
      heading: 'Test Note',
      note: 'This is a test note.'
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement ; // this is the html plate 
    //test that does the note exist
    expect(compiled.querySelector('.note')).toBeTruthy();
  });
  it ('should render child components', () => {
    component.note = {
      id: 1,
      heading: 'Wassup',
      note: "hey how are you"
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-note-heading')).toBeTruthy();
    expect(compiled.querySelector('app-note-content')).toBeTruthy();
    expect(compiled.querySelector('app-note-delete')).toBeTruthy();
        
  });
});
