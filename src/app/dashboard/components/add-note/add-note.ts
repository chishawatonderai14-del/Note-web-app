import { Component, inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-note.html',
  styleUrl: './add-note.css',
})
export class AddNote{
  isNotProfile!: any;
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
  private router = inject(Router);
  addNote(){
   //should navigate
   this.router.navigate(['/dashboard/add-note/-1']);
  }
}
