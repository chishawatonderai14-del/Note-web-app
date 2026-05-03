import { Component, Input } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BottomNav } from '../bottom-nav/bottom-nav';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [],
  templateUrl: './heading.html',
  styleUrl: './heading.css',
})
export class Heading {
  constructor(private overlay: Overlay){}
  @Input() heading!: string;
  openMenu() {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
      .global()
      .top('20px')
    });
    const portal = new ComponentPortal(BottomNav);
    const componentRef = overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(res => {
      overlayRef.dispose()
    });
  }
}
