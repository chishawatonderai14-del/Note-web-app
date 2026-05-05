import { Component, Input, OnInit } from '@angular/core';
import { NoteContent } from "../note-content/note-content";
import { NoteDelete } from "../note-delete/note-delete";
import { NoteHeading } from "../note-heading/note-heading";
import { NoteType } from '../../models/note_model';
import { NgClass } from "@angular/common";
import { NoteService } from '../../services/note-service';
import { not } from 'rxjs/internal/util/not';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DisplayMsg } from '../display-msg/display-msg';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [NoteContent, NoteHeading, NgClass],
  templateUrl: './note.html',
  styleUrl: './note.css',
})
export class Note implements OnInit{
  constructor(private noteService: NoteService, private overlay: Overlay) {}
  ngOnInit(): void {
    this.content = this.noteService.formatContent(this.note.content);
    this.time = this.formatTime(this.note.updatedAt);
  }
  @Input() note!: NoteType;
  color!: string;
  time!: string;
  content!: string;
  formatTime(date: string){
    return this.noteService.formatNoteTime(date);
  }
  pin(){
    this.note.pinned = !this.note.pinned;
    if (this.note.pinned){
      this.sendMessage('Note unpinned Successfully');
    }else {
      this.sendMessage("Note pinned Successfully");
    }
    this.noteService.pinNote({noteId: parseInt(this.note.id), pinned: !this.note.pinned});
  }
  sendMessage(message: string){
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
      .global()
      .top('20px')
      .centerHorizontally()
    });
    const componentRef = overlayRef.attach(new ComponentPortal(DisplayMsg));
    componentRef.instance.getMsg(message);
    componentRef.instance.close$.subscribe((res) => {
      console.log(res);
      overlayRef.dispose();
    });
  }
}
