import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteModel } from './add-note-model';

describe('AddNoteModel', () => {
  let component: AddNoteModel;
  let fixture: ComponentFixture<AddNoteModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoteModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoteModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
