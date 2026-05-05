import { Component, inject, OnInit } from '@angular/core';
import { Note } from "../note/note";
import { NoteService } from '../../services/note-service';
import { NoteType} from '../../models/note_model';
import { CommonModule } from '@angular/common';
import { EmptyNote } from "../empty-note/empty-note";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [Note, CommonModule, EmptyNote],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList implements OnInit{
  noteService = inject(NoteService);
  ngOnInit(): void {
    this.noteService.currentNotes$.subscribe((notes) => {
      this.notes = notes;
      console.log(this.notes);
    });
    
  }
  notes!: NoteType[];
  state$ = this.noteService.currentNoteState$ ;
  trackById(index: number, note: any){
    return note.id;
  }
}
