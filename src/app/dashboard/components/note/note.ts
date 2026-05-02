import { Component, Input, OnInit } from '@angular/core';
import { NoteContent } from "../note-content/note-content";
import { NoteDelete } from "../note-delete/note-delete";
import { NoteHeading } from "../note-heading/note-heading";
import { NoteType } from '../../models/note_model';
import { NgClass } from "@angular/common";
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [NoteContent, NoteDelete, NoteHeading, NgClass],
  templateUrl: './note.html',
  styleUrl: './note.css',
})
export class Note implements OnInit{
  constructor(private noteService: NoteService) {}
  ngOnInit(): void {
    this.color = this.noteService.getColor();
  }

  @Input() note!: NoteType;
  color!: string;
}
