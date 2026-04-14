import { Component } from '@angular/core';
import { NgClass } from "@angular/common";
import { Overlay } from '@angular/cdk/overlay';
import { AddNoteModel } from '../add-note-model/add-note-model';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [],
  templateUrl: './add-note.html',
  styleUrl: './add-note.css',
})
export class AddNote {
  constructor(private overlay: Overlay){}
  addNote(){
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
    const portal = new ComponentPortal(AddNoteModel);
    const componentRef = overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    // Send Data to the note
    componentRef.instance.close$.subscribe( () => {
      overlayRef.dispose();
    });
  }
}
