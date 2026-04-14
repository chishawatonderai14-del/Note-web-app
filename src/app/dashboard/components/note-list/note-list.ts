import { Component, OnInit } from '@angular/core';
import { Note } from "../note/note";
import { NoteService } from '../../services/note-service';
import { NoteType } from '../../models/note_model';
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
  constructor(private noteService: NoteService) {}
  ngOnInit(): void {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
    });
  }
  notes!: NoteType[];
}
