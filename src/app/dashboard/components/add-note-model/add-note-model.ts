import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteRequestType } from '../../models/note_model';
import { NoteService } from '../../services/note-service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-note-model',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-note-model.html',
  styleUrl: './add-note-model.css',
})
export class AddNoteModel {
  constructor(private noteService: NoteService) {}
  close$ = new Subject<void>();
  note : NoteRequestType = {
    heading: '',
    note: ''
  }
  addNote(){
    this.noteService.createNote(this.note).subscribe({
      next: (res) => {
        this.noteService.loadNotes();
      },
      error: (err => {
        console.log(err.message);
      })
    });
    this.close();
  }
  close(){
    this.close$.next();
  }
}
