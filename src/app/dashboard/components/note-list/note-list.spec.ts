import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoteList } from './note-list';

describe('NoteList', () => {
  let component: NoteList;
  let fixture: ComponentFixture<NoteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoteList
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render one note', () => {
    component.notes = [
      {
        id: 1,
        heading: 'shopping',
        note: 'buy milk'
      }
    ]
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const noteListItems = compiled.querySelectorAll('.note-list-item');

    expect(noteListItems.length).toBe(1);
  });
});
