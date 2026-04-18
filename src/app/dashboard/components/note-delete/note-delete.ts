import { Component, Input, resource } from '@angular/core';
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-note-delete',
  imports: [],
  templateUrl: './note-delete.html',
  styleUrl: './note-delete.css',
})
export class NoteDelete {
  constructor(private noteService: NoteService){}
  @Input() noteId!: string;
  
  delete() {
    this.noteService.deleteNote(this.noteId).subscribe({
      next: (res) => {
        console.log(res.message);
        this.noteService.loadNotes();
      },
      error: (err) => {
        console.log(`Failed to delete note. Error: ${err.message}`);
      }
    });
  }
}
