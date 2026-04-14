import { Component, Input } from '@angular/core';
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-note-delete',
  imports: [],
  templateUrl: './note-delete.html',
  styleUrl: './note-delete.css',
})
export class NoteDelete {
  constructor(private noteService: NoteService){}
  @Input() noteId!: number;
  
  delete() {
    this.noteService.deleteNote(this.noteId);
  }
}
