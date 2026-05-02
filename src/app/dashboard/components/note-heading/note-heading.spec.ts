import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteHeading } from './note-heading';

describe('NoteHeading', () => {
  let component: NoteHeading;
  let fixture: ComponentFixture<NoteHeading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteHeading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteHeading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain', () => {
    component.heading = 'Shopping';
    fixture.detectChanges();
     
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toBe('Shopping');
  });
});
