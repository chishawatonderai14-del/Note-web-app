import { Component, inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { AddNoteModel } from '../../pages/addNote/add-note-model';
import { ComponentPortal } from '@angular/cdk/portal';
import { NoteService } from '../../services/note-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [],
  templateUrl: './add-note.html',
  styleUrl: './add-note.css',
})
export class AddNote {
  constructor(private overlay: Overlay){}
  /*addNote(){
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
  */
  private noteService = inject(NoteService);
  private router = inject(Router);
  addNote(){
   //should navigate
   this.router.navigate(['/dashboard/add-note']);
  }
}
