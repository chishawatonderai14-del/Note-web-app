import { Component, inject } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-note.html',
  styleUrl: './empty-note.css',
})
export class EmptyNote {
  constructor(){
    this.message$;
    console.log(this.message$);
  }
  noteService = inject(NoteService);
  message$ = this.noteService.currentStateMsg$;
}
