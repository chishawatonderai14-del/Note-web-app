import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteType } from '../../models/note_model';
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
  note : NoteType = {
    heading: '',
    note: '',
    id: -1
  }
  addNote(){
    this.note.id = this.noteService.getNextId();
    this.noteService.addNote(this.note);
    this.close();
  }
  close(){
    this.close$.next();
  }
}
