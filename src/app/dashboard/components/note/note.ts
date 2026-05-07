import { Component, Input, OnInit } from '@angular/core';
import { NoteContent } from "../note-content/note-content";
import { NoteHeading } from "../note-heading/note-heading";
import { NoteType } from '../../models/note_model';
import { NgClass } from "@angular/common";
import { NoteService } from '../../services/note-service';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [NoteContent, NoteHeading, NgClass],
  templateUrl: './note.html',
  styleUrl: './note.css',
})
export class Note implements OnInit{
  constructor(private noteService: NoteService, private overlay: Overlay, private router : Router) {}
  ngOnInit(): void {
    this.content = this.noteService.formatContent(this.note.content);
    this.time = this.formatTime(this.note.updatedAt);
  }
  @Input() note!: NoteType;
  color!: string;
  time!: string;
  content!: string;
  openNote(){
    this.router.navigate([`/dashboard/add-note/${this.note.id}`]);
  }
  formatTime(date: string){
    return this.noteService.formatNoteTime(date);
  }
  favourite(){
    this.note.favourite = !this.note.favourite;
    this.noteService.addFav({noteId: parseInt(this.note.id), favourite: !this.note.favourite}).subscribe({
      next: (res) => {
        this.noteService.sendMessage(res, "Success");
      },
      error: (err) => {
        this.noteService.sendMessage(err, "Error");
      }
    });
  }

}
