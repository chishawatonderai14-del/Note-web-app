import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteRequestType, NoteResponseType, NoteType } from '../../models/note_model';
import { NoteService } from '../../services/note-service';
import { delay, Subject } from 'rxjs';
import { QuillModule } from 'ngx-quill';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Categorydropdown } from '../../components/categorydropdown/categorydropdown';
import { S } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-note-model',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './add-note-model.html',
  styleUrl: './add-note-model.css',
})
export class AddNoteModel implements OnInit{
  constructor(private noteService: NoteService, private router: Router, private route: ActivatedRoute, private overlay : Overlay) {}
  ngOnInit(): void {
    this.justCheck();
    if(parseInt(this.temp) == -1){
      const value = this.route.snapshot.paramMap.get('id');
      const id = parseInt(value || "-1");
      if (String(id) != "-1"){
        this.note = this.noteService.getNote(String(id));
      }
    }
  }
  temp: any;
  overlayRef!: OverlayRef;
  quilleditor = inject(QuillModule);
  saved = false;
  noteR : NoteRequestType = {
    title: '',
    content: '',
    favourite: false,
    pinned: false,
    category: ''
  };
  note : NoteType = {
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    pinned: false,
    favourite: false,
    icon: '',
    category: '', 
    id: "-1",
    trash: false
  }
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{color: []}],
      [{header: [1,2,3, false]}],
      [{list: 'ordered'}, {list: 'bullet'}],
    ]};
  unsaved(){
    this.saved = false;
  }
  reInit(){
    this.note = {
      title: '',
      content: '',
      createdAt: '',
      updatedAt: '',
      pinned: false,
      favourite: false,
      icon: '',
      category: '', 
      id: "-1",
      trash: false
    }
  }
  justCheck(){
    this.noteService.loadId();
    this.noteService.currentId$.subscribe(res => {
      this.temp = res;
    })
  }
  update(){
    this.saved = true;
    console.log(this.note);
    this.noteService.updateNote(this.note);
    this.noteService.loadNotes(); 
  } 
  save(){
    if (this.note.id != "-1") {
      this.update();
      return
    }
    if(this.note.title == '' || this.note.content == ''){
      const msg = "Please enter a note heading and content please";
      this.noteService.sendMessage(msg, "Error");
      return
    }
    this.saved = true;
    if (this.note.category == '' ) this.note.category = 'Personal';
    this.noteService.createNote(this.note).subscribe({ 
      next: (res) => {
        this.noteService.loadNotes();
      },
      error: (err => {
        console.log(err.message);
      })
    });
  }
  delete(id: string){
    if(id != '-1'){
      this.noteService.deleteNote(id).subscribe(res => {
        console.log(res);
      });
      this.noteService.loadNotes();
      this.router.navigate(['/dashboard/home']);
    }else{
      this.router.navigate(['/dashboard/home']);
    }
  }
  close(){
    this.noteService.loadNotes(); 
    this.router.navigate(['/dashboard/home']);
  }
  pin(){
    this.note.pinned = !this.note.pinned;
  }
  favourite(){
    this.note.favourite = !this.note.favourite;
  }
  choosingCategory = false;
  chooseCategory(element: HTMLElement){
    if (this.choosingCategory == true) {
      this.overlayRef.detach();
    }
    this.choosingCategory = true;
    this.overlayRef = this.overlay.create({
      panelClass: 'category-overlay',
      positionStrategy: this.overlay.position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 3
        }
      ])
    });
    const portal = new ComponentPortal(Categorydropdown);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.getCategory(this.note.category);
    componentRef.instance.close$.subscribe(res => {
      this.note.category = res;
      this.overlayRef.detach();
    })
  }
}
