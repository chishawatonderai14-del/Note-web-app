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
    this.note.content = this.noteService.formatContent(this.note.content);
  }
  @Input() note!: NoteType;
  color!: string;
  pin(){
    this.note.pinned = !this.note.pinned;
    this.noteService.pinNote({noteId: parseInt(this.note.id), pinned: !this.note.pinned}).subscribe({
      next: (res) => {
        console.log(res);
        this.sendMessage(res);
      },
      error: (err) => {
        this.note.pinned = !this.note.pinned;
        console.log(err.message);
      }
    });
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
